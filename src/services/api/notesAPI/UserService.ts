import getAxiosInstance from "@utils/libs/axios";
import CONFIG from "@utils/contants/config";
import TokenService from "@services/localstorage/TokenService";

const { axiosInstance, axiosInstanceWithBearer } = getAxiosInstance({
  baseURL: CONFIG.NOTES_API_BASE_URL,
  accessTokenKey: CONFIG.NOTES_API_ACCESS_KEY,
  refreshTokenKey: CONFIG.NOTES_API_REFRESH_KEY,
  renewTokenPath: "api/v1/auths/renew-token",
});

export type LoginType = {
  id: string;
  email: string;
  username: string | null;
  profile_img: string | null;
  access_token: string;
  refresh_token: string;
};

export type LoginByTokenType = {
  id: string;
  email: string;
  username: string | null;
  profile_img: string | null;
};

const UserService = {
  async login(identifier: string, password: string): Promise<LoginType> {
    const response = await axiosInstance.post("/api/v1/auths/login", {
      identifier,
      password,
    });

    const responseData = response.data.data as LoginType;

    TokenService.saveToken(
      CONFIG.NOTES_API_ACCESS_KEY,
      responseData.access_token,
    );
    TokenService.saveToken(
      CONFIG.NOTES_API_REFRESH_KEY,
      responseData.refresh_token,
    );

    return responseData;
  },

  async loginByToken(): Promise<LoginByTokenType> {
    const response = await axiosInstanceWithBearer.get(
      "/api/v1/auths/login/token",
    );

    const responseData = response.data.data as LoginByTokenType;

    return responseData;
  },

  async logout(): Promise<void> {
    const refreshToken = TokenService.getToken(CONFIG.NOTES_API_REFRESH_KEY);
    try {
      await axiosInstance.delete("/api/v1/auths/logout", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    } finally {
      TokenService.removeToken(CONFIG.NOTES_API_REFRESH_KEY);
      TokenService.removeToken(CONFIG.NOTES_API_ACCESS_KEY);
    }
  },
};

export default UserService;
