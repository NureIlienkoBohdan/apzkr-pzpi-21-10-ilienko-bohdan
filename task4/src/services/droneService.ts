import api from "./api";

export const fetchDrones = () => {
  return api.get("/drone");
};

export const addDrone = (droneData: any) => {
  return api.post("/drone", droneData);
};

export const deleteDrone = (id: string) => {
  return api.delete(`/drone/${id}`);
};

export const updateDrone = (id: string, droneData: any) => {
  return api.patch(`/drone/${id}`, droneData);
};
