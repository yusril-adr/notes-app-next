"use client";
import { FC, ReactNode } from "react";
import { Container, SkipNavLink } from "@chakra-ui/react";

import AppBar from "@components/AppBar";
import Footer from "@components/Footer";

import CONFIG from "@utils/contants/config";

const DefaultLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
      <AppBar styles={{ maxW: "8xl" }} />

      <Container as="main" maxW="8xl" minH={CONFIG.MIN_BODY_HEIGHT}>
        {children}
      </Container>

      <Footer styles={{ my: "8" }} />
    </>
  );
};

export default DefaultLayout;
