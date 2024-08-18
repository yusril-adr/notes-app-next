"use client";

import { FC, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as ChakraProvider } from "@utils/libs/chakra-ui/providers";

import store from "@states";
import LoadingBarProvider from "@utils/libs/react-top-loading-bar/provider";
import { AlertProvider } from "@components/Alert";

const ProviderLayout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <ReduxProvider store={store}>
    <LoadingBarProvider>
      <ChakraProvider>
        <AlertProvider>{children}</AlertProvider>
      </ChakraProvider>
    </LoadingBarProvider>
  </ReduxProvider>
);

export default ProviderLayout;
