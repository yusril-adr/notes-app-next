import { useColorModeValue } from "@chakra-ui/react";
import { createContext, FC, ReactNode, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

// Define the context type
export interface LoadingBarContextType {
  start: () => void;
  complete: () => void;
}

// Create the context with default values
export const LoadingBarContext = createContext<
  LoadingBarContextType | undefined
>(undefined);

// Provider component
const LoadingBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const color = useColorModeValue("#38B2AC", "#319795");

  const start = () => {
    loadingBarRef.current?.continuousStart();
  };

  const complete = () => {
    loadingBarRef.current?.complete();
  };

  return (
    <LoadingBarContext.Provider value={{ start, complete }}>
      <LoadingBar color={color} ref={loadingBarRef} />
      {children}
    </LoadingBarContext.Provider>
  );
};

export default LoadingBarProvider;
