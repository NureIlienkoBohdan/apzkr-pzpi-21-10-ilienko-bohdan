import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

interface DroneUsage {
  id: string;
  user: { id: string };
  drone: { id: string };
  usage_type: string;
  subscription?: { id: string };
  rental?: { id: string };
  start_time: string;
  end_time?: string;
  actual_end_time?: string;
  status: string;
  condition?: string;
}

interface DroneUsageState {
  droneUsages: DroneUsage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DroneUsageState = {
  droneUsages: [],
  status: "idle",
  error: null,
};

export const fetchDroneUsages = createAsyncThunk(
  "droneUsage/fetchDroneUsages",
  async () => {
    const response = await api.get("/drone-usage");
    return response.data;
  }
);

export const createDroneUsage = createAsyncThunk(
  "droneUsage/createDroneUsage",
  async (data: Omit<DroneUsage, "id">) => {
    const response = await api.post("/drone-usage", data);
    return response.data;
  }
);

export const updateDroneUsage = createAsyncThunk(
  "droneUsage/updateDroneUsage",
  async ({ id, data }: { id: string; data: Partial<DroneUsage> }) => {
    const response = await api.patch(`/drone-usage/${id}`, data);
    return response.data;
  }
);

export const deleteDroneUsage = createAsyncThunk(
  "droneUsage/deleteDroneUsage",
  async (id: string) => {
    await api.delete(`/drone-usage/${id}`);
    return id;
  }
);

const droneUsageSlice = createSlice({
  name: "droneUsage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDroneUsages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDroneUsages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.droneUsages = action.payload;
      })
      .addCase(fetchDroneUsages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDroneUsage.fulfilled, (state, action) => {
        state.droneUsages.push(action.payload);
      })
      .addCase(updateDroneUsage.fulfilled, (state, action) => {
        const index = state.droneUsages.findIndex(
          (usage) => usage.id === action.payload.id
        );
        if (index !== -1) {
          state.droneUsages[index] = action.payload;
        }
      })
      .addCase(deleteDroneUsage.fulfilled, (state, action) => {
        state.droneUsages = state.droneUsages.filter(
          (usage) => usage.id !== action.payload
        );
      });
  },
});

export default droneUsageSlice.reducer;
