import AuthLayout from "@app/layout/Auth";
import { FC, ReactNode } from "react";

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => <AuthLayout>{children}</AuthLayout>;

export default Layout;
