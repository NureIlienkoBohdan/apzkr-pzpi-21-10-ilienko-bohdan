import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDrones,
  addDrone,
  deleteDrone,
  updateDrone,
} from "../services/droneService";

interface Drone {
  id: string;
  droneModel: { id: string };
  plan: string;
}

interface DroneState {
  drones: Drone[];
  status: "idle" | "loading" | "failed";
}

const initialState: DroneState = {
  drones: [],
  status: "idle",
};

export const fetchAllDrones = createAsyncThunk("drone/fetchAll", async () => {
  const response = await fetchDrones();
  return response.data;
});

export const addNewDrone = createAsyncThunk(
  "drone/addNew",
  async (droneData: any) => {
    const response = await addDrone(droneData);
    return response.data;
  }
);

export const deleteExistingDrone = createAsyncThunk(
  "drone/delete",
  async (id: string) => {
    await deleteDrone(id);
    return id;
  }
);

export const updateExistingDrone = createAsyncThunk(
  "drone/update",
  async ({ id, droneData }: { id: string; droneData: any }) => {
    const response = await updateDrone(id, droneData);
    return response.data;
  }
);

const droneSlice = createSlice({
  name: "drone",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDrones.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllDrones.fulfilled,
        (state, action: PayloadAction<Drone[]>) => {
          state.status = "idle";
          state.drones = action.payload;
        }
      )
      .addCase(fetchAllDrones.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addNewDrone.fulfilled, (state, action: PayloadAction<Drone>) => {
        state.drones.push(action.payload);
      })
      .addCase(
        deleteExistingDrone.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.drones = state.drones.filter(
            (drone) => drone.id !== action.payload
          );
        }
      )
      .addCase(
        updateExistingDrone.fulfilled,
        (state, action: PayloadAction<Drone>) => {
          const index = state.drones.findIndex(
            (drone) => drone.id === action.payload.id
          );
          if (index !== -1) {
            state.drones[index] = action.payload;
          }
        }
      );
  },
});

export default droneSlice.reducer;
