import { configureStore } from "@reduxjs/toolkit";
import InstituteSlice from "@/lib/store/ReduxSlices/InstituteSlice";
import StudentSlice from "@/lib/store/ReduxSlices/StudentSlice";
import TeacherSlice from "@/lib/store/ReduxSlices/TeacherSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    institute: InstituteSlice,
    student: StudentSlice,
    teacher: TeacherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
