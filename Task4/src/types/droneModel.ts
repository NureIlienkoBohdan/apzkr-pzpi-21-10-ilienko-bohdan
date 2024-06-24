// src/types/droneModel.ts
export interface DroneModel {
  id?: string;
  name: string;
  manufacturer: string;
  weight?: number;
  max_speed?: number;
  max_flight_time?: number;
  max_range?: number;
  price?: number;
  description?: string;
}
