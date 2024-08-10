"use client";

import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider>
        <ColorModeScript />
        {children}
      </ChakraProvider>
    </>
  );
}
