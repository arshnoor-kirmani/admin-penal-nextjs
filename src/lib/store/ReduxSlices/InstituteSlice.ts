import { Course, rules } from "@/models/InstituteSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
export interface InstituteInfo {
  institute_name: string;
  logo: string;
  profile_url: string;
  institute_id: string;
  username: string;
  identifier: string;
  user_type: string;
  users: rules[];
  courses: Course[];
  rules: { [key: string]: boolean | undefined };
  institute_short_name: string;
  total_student: number;
  total_teacher: number;
  total_courses: number;
  total_unpaid: number;
  recent: [];
}

// Define the initial state using that type
const initialState: InstituteInfo = {
  logo: "",
  institute_id: "",
  username: "",
  user_type: "institute",
  profile_url: "",
  identifier: "",
  institute_name: "",
  total_student: 0,
  total_teacher: 0,
  total_courses: 0,
  total_unpaid: 0,
  users: [],
  courses: [],
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
  institute_short_name: "",
  recent: [],
};

export const instituteSlice = createSlice({
  name: "institute",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInstituteInfo: (state, action: PayloadAction<InstituteInfo>) => {
      console.log("Action", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setInstituteInfo } = instituteSlice.actions;
export default instituteSlice.reducer;
