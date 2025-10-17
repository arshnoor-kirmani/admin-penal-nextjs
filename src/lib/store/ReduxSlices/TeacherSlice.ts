// import { Course, rules } from "@/models/InstituteSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
export interface TeacherInfo {
  information: {
    logo: string;
    profile_url: string;
  };
  institute_shor_name?: string;
  // logo?: string;
  institute_name: string;
  // profile_url: string;
  institute_id: string;
  username: string;
  user_type: string;
  identifier: string;
  rules: { [key: string]: boolean | undefined };
}

// Define the initial state using that type
const initialState: TeacherInfo = {
  information: {
    logo: "",
    profile_url: "",
  },
  // logo: "",
  institute_shor_name: "",
  // profile_url: "",
  institute_id: "",
  username: "",
  identifier: "",
  user_type: "teacher",
  institute_name: "",
  rules: {
    all_permissions: undefined,
    profile_edit: undefined,
    send_message: undefined,
    inbox_message: undefined,
    website_setting: undefined,
    add_teacher: undefined,
    edit_teacher: undefined,
    delete_teacher: undefined,
    salary_management: undefined,
    add_student: undefined,
    edit_student: undefined,
    delete_student: undefined,
    fees_management: undefined,
    result_permession: undefined,
    attendance: undefined,
    manage_users: undefined,
    settings: undefined,
    show_student: false,
    show_teacher: undefined,
  },
};

export const TeacherSlice = createSlice({
  name: "teacher",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTeacherInfo: (state, action: PayloadAction<TeacherInfo>) => {
      console.log("Action", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setTeacherInfo } = TeacherSlice.actions;
export default TeacherSlice.reducer;
