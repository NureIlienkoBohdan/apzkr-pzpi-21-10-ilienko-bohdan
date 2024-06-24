import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { RootState } from "../store";
import { Tokens, UserState } from "./types";

const initialState: UserState = {
  userData: null,
  tokens: {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },
  status: "idle",
};

// Асинхронний thunk для входу користувача
export const signIn = createAsyncThunk(
  "user/signIn",
  async (credentials: { email: string; password: string }) => {
    const response = await api.post("/auth/sign-in", credentials);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  }
);

// Асинхронний thunk для реєстрації користувача
export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post("/auth/sign-up", userData);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  }
);

// Асинхронний thunk для отримання даних користувача
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await api.get("/users/profile");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.userData = null;
      state.tokens = { accessToken: "", refreshToken: "" };
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setTokens(state, action: PayloadAction<Tokens>) {
      state.tokens = action.payload;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokens = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokens = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logOut, setTokens } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
