import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import CONFIG from "@utils/contants/config";
import { StateStatus } from "@utils/contants/enums";

// import ClientError from "../../errors/ClientError";

export interface StateProps {
  value: {
    title: string | null;
    message: string | null;
    isLoading: boolean;
  };
  status: StateStatus;
  error: Error | null;
}

const initialState: StateProps = {
  value: {
    title: null,
    message: null,
    isLoading: false,
  },
  status: StateStatus.IDLE,
  error: null,
};

export const alertSlicer = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert(state, action) {
      const value = {
        ...state.value,
      };

      if (action.payload.title) {
        value.title = action.payload.title;
      }

      if (action.payload.message) {
        value.message = action.payload.message;
      }

      if (action.payload.isLoading) {
        value.isLoading = action.payload.isLoading;
      }

      return {
        ...state,
        value,
      };
    },
    unsetAlert() {
      return initialState;
    },
    setAlertMessage(state, action: PayloadAction<string>) {
      return {
        ...state,
        value: {
          ...state.value,
          message: action.payload,
        },
      };
    },
    setErrorAlert(state, action: PayloadAction<Error>) {
      const error = action.payload;
      let message = CONFIG.DEFAULT_ERROR_MESSAGE;
      // if (error instanceof ClientError) {
      //   message = error.message;
      // }

      return {
        ...state,
        value: {
          ...state.value,
          title: "Error!",
          message,
        },
      };
    },
  },
});

export const { setAlert, unsetAlert, setAlertMessage, setErrorAlert } =
  alertSlicer.actions;

export default alertSlicer.reducer;
