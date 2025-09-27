import { configureStore } from "@reduxjs/toolkit";
import instituteSlice from "@/lib/store/ReduxSlices/InstituteSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    institute: instituteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
