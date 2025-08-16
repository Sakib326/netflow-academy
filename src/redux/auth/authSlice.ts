import type { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Hydrate initial state from storage
const user =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const token = typeof window !== "undefined" ? Cookies.get("token") : null;

type AuthState = {
  user?: User;
  token: string | null;
};
const initialState: AuthState = {
  user: user ? JSON.parse(user) : undefined,
  token: token || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ token: string; user: User }>) => {
      // apiSlice.util.invalidateTags(["User", "Users"]);
      Cookies.set("token", action?.payload?.token, {
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      });
      state.token = action?.payload?.token;
      state.user = action.payload?.user;
      // set auth info to the localStorage when loggedIn
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action?.payload.user));
      }
    },
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      // apiSlice.util.invalidateTags(["User", "Users"]);
      Cookies.set("token", action?.payload?.token, {
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      });
      state.token = action?.payload?.token;
      state.user = action.payload?.user;
      // set auth info to the localStorage when loggedIn
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action?.payload.user));
      }
    },
    logout: (state) => {
      Cookies.remove("token");
      state.user = undefined;
      state.token = null;
      // remove auth info from localStorage when loggedOut
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
