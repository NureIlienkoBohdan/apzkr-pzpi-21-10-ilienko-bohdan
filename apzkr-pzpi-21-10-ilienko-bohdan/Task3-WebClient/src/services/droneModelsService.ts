// src/services/droneModelsService.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios_client from "./api";
import { DroneModel } from "../types/droneModel";

// Асинхронный thunk для получения всех моделей дронов
export const fetchDroneModels = createAsyncThunk(
  "droneModels/fetchAll",
  async () => {
    const response = await axios_client.get<DroneModel[]>("/drone-models");
    return response.data;
  }
);

// Асинхронный thunk для добавления новой модели дрона
export const addDroneModel = createAsyncThunk(
  "droneModels/add",
  async (droneModelData: DroneModel) => {
    const response = await axios_client.post<DroneModel>(
      "/drone-models",
      droneModelData
    );
    return response.data;
  }
);

// Асинхронный thunk для удаления модели дрона
export const deleteDroneModel = createAsyncThunk(
  "droneModels/delete",
  async (id: string) => {
    await axios_client.delete(`/drone-models/${id}`);
    return id;
  }
);

// Асинхронный thunk для обновления модели дрона
export const updateDroneModel = createAsyncThunk(
  "droneModels/update",
  async ({
    id,
    droneModelData,
  }: {
    id: string;
    droneModelData: DroneModel;
  }) => {
    const response = await axios_client.patch<DroneModel>(
      `/drone-models/${id}`,
      droneModelData
    );
    return response.data;
  }
);
