"use client";

import { FC, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as ChakraProvider } from "@utils/libs/chakra-ui/providers";

import store from "@states";

const ProviderLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <ReduxProvider store={store}>
    <ChakraProvider>{children}</ChakraProvider>
  </ReduxProvider>
);

export default ProviderLayout;
