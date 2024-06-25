import axios from "./api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk для получения всех вакансий
export const fetchJobOpenings = createAsyncThunk(
  "collaborations/fetchJobOpenings",
  async () => {
    const response = await axios.get("/collaborations");
    return response.data;
  }
);

// Thunk для создания новой вакансии
export const createJobOpening = createAsyncThunk(
  "collaborations/createJobOpening",
  async (jobOpeningData) => {
    const response = await axios.post("/collaborations", jobOpeningData);
    return response.data;
  }
);

// Thunk для подачи заявки на вакансию
export const applyForJobOpening = createAsyncThunk(
  "collaborations/applyForJobOpening",
  async ({ jobId, coverLetter }) => {
    const response = await axios.post(`/collaborations/${jobId}/apply`, {
      coverLetter,
    });
    return response.data;
  }
);

// Thunk для обновления вакансии
export const updateJobOpening = createAsyncThunk(
  "collaborations/updateJobOpening",
  async ({ jobId, updateData }) => {
    const response = await axios.patch(`/collaborations/${jobId}`, updateData);
    return response.data;
  }
);

// Thunk для удаления вакансии
export const deleteJobOpening = createAsyncThunk(
  "collaborations/deleteJobOpening",
  async (jobId) => {
    const response = await axios.delete(`/collaborations/${jobId}`);
    return response.data;
  }
);
