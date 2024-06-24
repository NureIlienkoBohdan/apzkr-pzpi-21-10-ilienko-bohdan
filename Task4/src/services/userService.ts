import axios_client from "./api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios_client.get("/users");
  return response.data;
});

// Add new user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: any) => {
    const response = await axios_client.post("/users", userData);
    return response.data;
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: any) => {
    const response = await axios_client.patch(
      `/users/${userData.id}`,
      userData
    );
    return response.data;
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await axios_client.delete(`/users/${userId}`);
    return userId;
  }
);

// Block user
export const blockUser = createAsyncThunk(
  "users/blockUser",
  async (userId: string) => {
    await axios_client.patch(`/users/${userId}/block`);
    return userId;
  }
);
