import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: Cookies.get("token") },
  reducers: {
    setCredentials: (state, action) => {
      const { email, access_token } = action.payload;
      (state.email = email), (state.token = access_token);
      Cookies.set("token", access_token, { expires: 1, secure: true });
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
