import React from "react";
import type { Metadata } from "next";
import { Container, SkipNavLink } from "@chakra-ui/react";

import { Provider as ChakraProvider } from "@utils/libs/chakra-ui/providers";
import favicon from "./favicon.ico";
import AppBar from "@components/AppBar";
import { CONFIG } from "@utils/contants/config";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes APP with Next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </head>
      <body>
        <ChakraProvider>
          <SkipNavLink zIndex="9999">Skip to content</SkipNavLink>
          <AppBar styles={{ maxW: "8xl" }} />

          <Container as="main" maxW="8xl" minH={CONFIG.MIN_BODY_HEIGHT}>
            {children}
          </Container>
        </ChakraProvider>
      </body>
    </html>
  );
}
