import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  blockUser,
} from "../services/userService";
import { RootState } from "../store";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  users: [],
  status: "idle",
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload
        );
        if (index !== -1) {
          state.users[index].status = "blocked";
        }
      });
  },
});

export const selectUsers = (state: RootState) => state.userManagement;

export type { UserState }; // Экспортируем тип UserState
export default userManagementSlice.reducer;
