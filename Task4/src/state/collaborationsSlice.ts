import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobOpenings,
  createJobOpening,
  applyForJobOpening,
  updateJobOpening,
  deleteJobOpening,
} from "../services/collaborationsService";

const initialState = {
  jobOpenings: [],
  status: "idle",
};

const collaborationsSlice = createSlice({
  name: "collaborations",
  initialState,
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
      .addCase(fetchJobOpenings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobOpening.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobOpenings.push(action.payload);
      })
      .addCase(createJobOpening.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(applyForJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyForJobOpening.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(applyForJobOpening.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJobOpening.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.jobOpenings.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.jobOpenings[index] = action.payload;
        }
      })
      .addCase(updateJobOpening.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJobOpening.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobOpenings = state.jobOpenings.filter(
          (job) => job.id !== action.payload.id
        );
      })
      .addCase(deleteJobOpening.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default collaborationsSlice.reducer;
