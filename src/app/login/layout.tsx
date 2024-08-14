import { FC, ReactNode } from "react";
import AuthenticationLayout from "@app/layout/Authentication";
import AuthPageLayout from "@app/layout/AuthPage";

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <AuthenticationLayout>
    <AuthPageLayout>{children}</AuthPageLayout>
  </AuthenticationLayout>
);

export default Layout;
