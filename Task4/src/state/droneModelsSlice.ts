// src/state/droneModelsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDroneModels,
  addDroneModel,
  deleteDroneModel,
  updateDroneModel,
} from "../services/droneModelsService";
import { DroneModel } from "../types/droneModel";

interface DroneModelsState {
  droneModels: DroneModel[];
  status: "idle" | "loading" | "failed";
}

const initialState: DroneModelsState = {
  droneModels: [],
  status: "idle",
};

const droneModelsSlice = createSlice({
  name: "droneModels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDroneModels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDroneModels.fulfilled,
        (state, action: PayloadAction<DroneModel[]>) => {
          state.status = "idle";
          state.droneModels = action.payload;
        }
      )
      .addCase(fetchDroneModels.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        addDroneModel.fulfilled,
        (state, action: PayloadAction<DroneModel>) => {
          state.droneModels.push(action.payload);
        }
      )
      .addCase(
        deleteDroneModel.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.droneModels = state.droneModels.filter(
            (model) => model.id !== action.payload
          );
        }
      )
      .addCase(
        updateDroneModel.fulfilled,
        (state, action: PayloadAction<DroneModel>) => {
          const index = state.droneModels.findIndex(
            (model) => model.id === action.payload.id
          );
          if (index !== -1) {
            state.droneModels[index] = action.payload;
          }
        }
      );
  },
});

export default droneModelsSlice.reducer;
