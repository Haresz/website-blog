import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./features/blogSlice";
import userSlice from "./features/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      blogSlice: blogSlice,
      userSlice: userSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
