"use client";

import AuthenticationError from "@errors/AuthenticationError";
import { useAlert } from "@hooks/alert";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import TokenService from "@services/localstorage/TokenService";
import { loginByToken } from "@states/auth";
import CONFIG from "@utils/contants/config";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

const GlobalLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { showAlertError } = useAlert();
  const pathname = usePathname();
  const router = useRouter();

  const loginHandler = async () => {
    const resultAction = await dispatch(loginByToken());

    if (!loginByToken.fulfilled.match(resultAction)) {
      const payload = resultAction.payload;
      if (payload instanceof AxiosError) {
        let error = resultAction.payload;

        if (payload.response?.status === 401) {
          error = new AuthenticationError("Log In session expired.");
        }

        showAlertError(error);
      } else {
        throw resultAction.error;
      }
    }
  };

  useEffect(() => {
    if (
      TokenService.getToken(CONFIG.NOTES_API_ACCESS_KEY) &&
      TokenService.getToken(CONFIG.NOTES_API_REFRESH_KEY)
    ) {
      loginHandler();
    }
  }, []);

  return <>{children}</>;
};

export default GlobalLayout;
