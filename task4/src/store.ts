import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./state/userSlice";
import userManagementReducer from "./state/userManagementSlice";
import droneModelsReducer from "./state/droneModelsSlice";
import droneReducer from "./state/droneSlice";
import jobOpeningsReducer from "./state/jobOpeningsSlice";
import jobApplicationsReducer from "./state/jobApplicationSlice";
import droneUsagesReducer from "./state/droneUsageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userManagement: userManagementReducer,
    droneModels: droneModelsReducer,
    drone: droneReducer,
    jobOpenings: jobOpeningsReducer,
    jobApplications: jobApplicationsReducer,
    droneUsages: droneUsagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
