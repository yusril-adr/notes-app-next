import {
  LoadingBarContext,
  LoadingBarContextType,
} from "@utils/libs/react-top-loading-bar/provider";
import { useContext } from "react";

export const useLoadingBar = (): LoadingBarContextType => {
  const context = useContext(LoadingBarContext);
  if (!context) {
    throw new Error("useLoadingBar must be used within a LoadingBarProvider");
  }
  return context;
};
