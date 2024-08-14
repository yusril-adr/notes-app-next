import { useAppDispatch } from "./redux";
import { logout } from "@states/auth";

export type UseLogoutType = {
  logout: () => Promise<void>;
};

const useLogout = (): UseLogoutType => {
  const dispatch = useAppDispatch();
  const logoutHandler = async () => {
    await dispatch(logout());
  };

  return { logout: logoutHandler };
};

export default useLogout;
