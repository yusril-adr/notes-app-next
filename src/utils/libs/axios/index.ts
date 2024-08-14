import axios, { AxiosInstance } from "axios";

import TokenService from "@services/localstorage/TokenService";
import AuthenticationError from "@errors/AuthenticationError";

export type GetAxiosInstanceParams = {
  baseURL: string;
  accessTokenKey: string;
  refreshTokenKey: string;
  renewTokenPath: string;
};

const getAxiosInstance = ({
  baseURL,
  accessTokenKey,
  refreshTokenKey,
  renewTokenPath,
}: GetAxiosInstanceParams): {
  axiosInstance: AxiosInstance;
  axiosInstanceWithBearer: AxiosInstance;
} => {
  const axiosInstance = axios.create({
    baseURL,
  });

  const axiosInstanceWithBearer = axios.create({
    baseURL,
  });

  axiosInstanceWithBearer.interceptors.request.use(
    (request) => {
      const accessToken = TokenService.getToken(accessTokenKey);
      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstanceWithBearer.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const refreshToken = TokenService.getToken(refreshTokenKey); // Retrieve the stored refresh token.
          // Make a request to your auth server to refresh the token.
          const response = await axios.get(`${baseURL}/${renewTokenPath}`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (response.status === 401) {
            return Promise.reject(
              new AuthenticationError(response.data.message, response.status),
            );
          }

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;
          // Store the new access and refresh tokens.
          TokenService.saveToken(accessTokenKey, accessToken);
          TokenService.saveToken(refreshTokenKey, newRefreshToken);
          // Update the authorization header with the new access token.
          axiosInstanceWithBearer.defaults.headers.common["Authorization"] =
            `Bearer ${accessToken}`;
          return axiosInstanceWithBearer(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          TokenService.removeToken(accessTokenKey);
          TokenService.removeToken(refreshTokenKey);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    },
  );

  return { axiosInstance, axiosInstanceWithBearer };
};

export default getAxiosInstance;
