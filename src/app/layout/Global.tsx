"use client";
import { ReactNode } from "react";
import { Container, SkipNavLink } from "@chakra-ui/react";

import { CONFIG } from "@utils/contants/config";
import AppBar from "@components/AppBar";
import Footer from "@components/Footer";
import { usePathname } from "next/navigation";
import { Else, If, Then, When } from "react-if";

export default function GlobalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const pathname = usePathname();
  return (
    <>
      <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
      <When condition={pathname !== "/login" && pathname !== "/register"}>
        <AppBar styles={{ maxW: "8xl" }} />
      </When>

      <If condition={pathname !== "/login" && pathname !== "/register"}>
        <Then>
          <Container as="main" maxW="8xl" minH={CONFIG.MIN_BODY_HEIGHT}>
            {children}
          </Container>
        </Then>
        <Else>{children}</Else>
      </If>

      <When condition={pathname !== "/login" && pathname !== "/register"}>
        <Footer styles={{ my: "8" }} />
      </When>
    </>
  );
}
