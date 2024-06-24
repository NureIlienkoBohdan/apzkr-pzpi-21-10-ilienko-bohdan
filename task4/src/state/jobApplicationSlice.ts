// src/state/jobApplicationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchJobOpenings = createAsyncThunk(
  "jobApplication/fetchJobOpenings",
  async () => {
    const response = await api.get("/collaborations");
    return response.data;
  }
);

export const fetchJobApplications = createAsyncThunk(
  "jobApplication/fetchJobApplications",
  async () => {
    const response = await api.get("/collaborations/applications");
    return response.data;
  }
);

export const applyForJobOpening = createAsyncThunk(
  "jobApplication/applyForJobOpening",
  async ({ jobId, coverLetter }: { jobId: string; coverLetter: string }) => {
    const response = await api.post(`/collaborations/${jobId}/apply`, {
      coverLetter,
    });
    return response.data;
  }
);

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState: {
    jobOpenings: [],
    jobApplications: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobOpenings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobOpenings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobOpenings = action.payload;
      })
      .addCase(fetchJobOpenings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchJobApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobApplications = action.payload;
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(applyForJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyForJobOpening.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(applyForJobOpening.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobApplicationSlice.reducer;
