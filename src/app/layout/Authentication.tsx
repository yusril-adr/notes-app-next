"use client";

import { useAppSelector } from "@hooks/redux";
import { StateStatus } from "@utils/contants/enums";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

const Layout: FC<{
  authenticated?: boolean;
  children: ReactNode;
}> = ({ authenticated = false, children }) => {
  const authUser = useAppSelector((state) => state.authUser);
  const router = useRouter();

  if (
    !authenticated &&
    authUser.status === StateStatus.SUCCESS &&
    !!authUser.value
  ) {
    router.push("/");
  }

  if (
    authenticated &&
    authUser.status === StateStatus.SUCCESS &&
    !authUser.value
  ) {
    router.push("/login");
  }

  return <>{children}</>;
};

export default Layout;
