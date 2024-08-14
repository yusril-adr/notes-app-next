"use client";

import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        {children}
      </ChakraProvider>
    </>
  );
}
