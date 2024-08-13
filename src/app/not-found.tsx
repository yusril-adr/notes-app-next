"use client";

import { ReactNode } from "react";
import { Box, Flex, Heading, SkipNavContent } from "@chakra-ui/react";
import Lottie from "lottie-react";

import notFoundLottie from "@utils/libs/lottie/404.json";
import CONFIG from "@utils/contants/config";

export default function NotFound(): ReactNode {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH={CONFIG.MIN_BODY_HEIGHT}
    >
      <SkipNavContent />

      <Box
        as={Lottie}
        maxW={{
          base: "100%",
          md: "760px",
          "2xl": "75%",
        }}
        animationData={notFoundLottie}
        loop
      />
      <Heading>Page not found</Heading>
    </Flex>
  );
}
