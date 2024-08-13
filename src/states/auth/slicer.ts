import { createAsyncThunk } from "@reduxjs/toolkit";

// import * as Api from '../../services/api/dicodingForum';

import { setAlertMessage, setErrorAlert } from "@states/alertMessage";

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

export const login = createAsyncThunk(
  "authUser/login",
  async ({ values, formikProps, navigate }, { dispatch, rejectWithValue }) => {
    try {
      await Api.login(values);
      const response = await Api.getOwnProfile();
      formikProps.setSubmitting(false);
      navigate("/");
      return response;
    } catch (error) {
      dispatch(setErrorAlert(error));
      formikProps.setSubmitting(false);
      return rejectWithValue(error);
    }
  }
);

// export const getOwnProfile = createAsyncThunk(
//   "authUser/getOwnProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await Api.getOwnProfile();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   "authUser/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await Api.logout();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
