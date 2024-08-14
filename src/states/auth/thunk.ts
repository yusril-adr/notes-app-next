import { createAsyncThunk } from "@reduxjs/toolkit";

import UserService, {
  LoginByTokenType,
} from "@services/api/notesAPI/UserService";

import axios, { AxiosError } from "axios";

// export const register = createAsyncThunk(
//   "authUser/register",
//   async ({ values, onSuccess }, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await Api.register(values);
//       dispatch(setAlertMessage("Pendaftaran Akun Berhasil."));
//       formikProps.resetForm();
//       formikProps.setSubmitting(false);
//       return response;
//     } catch (error) {
//       dispatch(setErrorAlert(error));
//       formikProps.setSubmitting(false);
//       return rejectWithValue(error);
//     }
//   }
// );

type LoginParam = {
  identifier: string;
  password: string;
};
export const login = createAsyncThunk<
  LoginByTokenType,
  LoginParam,
  {
    rejectValue: Error | unknown;
  }
>(
  "authUser/login",
  async ({ identifier, password }: LoginParam, { rejectWithValue }) => {
    try {
      await UserService.login(identifier, password);
      const user = await UserService.loginByToken();
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error as AxiosError);
      }

      return rejectWithValue(error);
    }
  },
);

export const loginByToken = createAsyncThunk<
  LoginByTokenType,
  undefined,
  {
    rejectValue: Error | unknown;
  }
>("authUser/loginByToken", async (_, { rejectWithValue }) => {
  try {
    const response = await UserService.loginByToken();
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error as AxiosError);
    }

    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    rejectValue: Error | unknown;
  }
>("authUser/logout", async (_, { rejectWithValue }) => {
  try {
    await UserService.logout();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error as AxiosError);
    }

    return rejectWithValue(error);
  }
});
