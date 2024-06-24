import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";

interface JobOpening {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: number;
  salaryCurrency: string;
}

interface JobOpeningsState {
  jobOpenings: JobOpening[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: JobOpeningsState = {
  jobOpenings: [],
  status: "idle",
};

export const createJobOpening = createAsyncThunk(
  "jobOpenings/createJobOpening",
  async (jobOpeningData: Omit<JobOpening, "id">) => {
    const response = await api.post("/collaborations", jobOpeningData);
    return response.data;
  }
);

export const fetchJobOpenings = createAsyncThunk(
  "jobOpenings/fetchJobOpenings",
  async () => {
    const response = await api.get("/collaborations");
    return response.data;
  }
);

export const deleteJobOpening = createAsyncThunk(
  "jobOpenings/deleteJobOpening",
  async (id: string) => {
    await api.delete(`/collaborations/${id}`);
    return id;
  }
);

const jobOpeningsSlice = createSlice({
  name: "jobOpenings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobOpening.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createJobOpening.fulfilled,
        (state, action: PayloadAction<JobOpening>) => {
          state.status = "succeeded";
          state.jobOpenings.push(action.payload);
        }
      )
      .addCase(createJobOpening.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchJobOpenings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchJobOpenings.fulfilled,
        (state, action: PayloadAction<JobOpening[]>) => {
          state.status = "succeeded";
          state.jobOpenings = action.payload;
        }
      )
      .addCase(fetchJobOpenings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        deleteJobOpening.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.jobOpenings = state.jobOpenings.filter(
            (job) => job.id !== action.payload
          );
        }
      );
  },
});

export default jobOpeningsSlice.reducer;
export type { JobOpeningsState, JobOpening };
