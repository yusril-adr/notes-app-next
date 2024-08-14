"use client";

import {
  Box,
  Container,
  Hide,
  Show,
  SkipNavLink,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC, ReactNode, useMemo } from "react";

import AppBar from "@components/AppBar";
import Footer from "@components/Footer";

import CONFIG from "@utils/contants/config";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const bgColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <SkipNavLink />
      <Container
        as="main"
        pos="relative"
        maxW="8xl"
        minH={CONFIG.MIN_BODY_HEIGHT}
      >
        <Show above="md">
          <Box
            position="absolute"
            top="0"
            right="0"
            bgColor={bgColor}
            w="50%"
            h="100%"
          />
        </Show>

        <AppBar transparent styles={{ maxW: "8xl", bgColor: "transparent" }} />
        {children}
      </Container>

      <Hide above="md">
        <Footer styles={{ my: "8" }} />
      </Hide>
    </>
  );
};

export default Layout;
