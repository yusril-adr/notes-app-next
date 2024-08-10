"use client";

import { ReactNode } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Lottie from "lottie-react";

import notFoundLottie from "@utils/libs/lottie/404.json";

export default function NotFound(): ReactNode {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Box
        maxW={{
          base: "100%",
          xl: "75%",
        }}
      >
        <Lottie animationData={notFoundLottie} loop />
      </Box>
      <Heading>Page not found</Heading>
    </Flex>
  );
}
