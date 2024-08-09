"use client";

import React from "react";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

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
