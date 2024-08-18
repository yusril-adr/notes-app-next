import { createSlice } from "@reduxjs/toolkit";
import { login, loginByToken, logout } from "./thunk";
import { StateStatus } from "@utils/constants/enums";
import { LoginByTokenType } from "@services/api/notesAPI/UserService";

export type StateType = {
  value: LoginByTokenType | null;
  status: StateStatus;
  error: Error | null | unknown;
};

export const initialState: StateType = {
  value: null,
  status: StateStatus.IDLE,
  error: null,
};

export const authUserSlicer = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      return {
        ...state,
        value: action.payload,
      };
    },
    unsetAuthUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Register
    // builder.addCase(register.pending, (state) => ({
    //   ...state,
    //   loading: "pending",
    // }));
    // builder.addCase(register.fulfilled, (state) => ({
    //   ...state,
    //   error: initialState.error,
    //   loading: "succeeded",
    // }));
    // builder.addCase(register.rejected, (state, action) => ({
    //   ...state,
    //   loading: "failed",
    //   error: action.payload,
    // }));

    // Login
    builder.addCase(login.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      error: initialState.error,
      status: StateStatus.SUCCESS,
      value: action.payload,
    }));
    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        error: action.payload,
      };
    });

    // Login By Token
    builder.addCase(loginByToken.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(loginByToken.fulfilled, (state, action) => ({
      ...state,
      error: initialState.error,
      status: StateStatus.SUCCESS,
      value: action.payload,
    }));
    builder.addCase(loginByToken.rejected, (state, action) => {
      return {
        ...state,
        status: StateStatus.REJECTED,
        error: action.payload,
      };
    });

    // Logout
    builder.addCase(logout.pending, (state) => ({
      ...state,
      status: StateStatus.PENDING,
    }));
    builder.addCase(logout.fulfilled, () => ({
      ...initialState,
      status: StateStatus.SUCCESS,
    }));
    builder.addCase(logout.rejected, (state, action) => ({
      ...state,
      status: StateStatus.REJECTED,
      error: action.payload,
    }));
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlicer.actions;

export default authUserSlicer.reducer;
