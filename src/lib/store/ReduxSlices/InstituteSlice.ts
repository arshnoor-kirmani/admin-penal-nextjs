import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface InstituteInfo {
  institute_name: string;
  logo: string;
  institute_id: string;
  username: string;
  email: string;
  users: any[];
  courses: any[];
  rules: { [key: string]: boolean | undefined };
  institute_short_name: string;
}

// Define the initial state using that type
const initialState: InstituteInfo = {
  logo: "",
  institute_id: "",
  username: "",
  email: "",
  institute_name: "",
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
};

export const instituteSlice = createSlice({
  name: "institute",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInstituteInfo: (state, action: PayloadAction<InstituteInfo>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setInstituteInfo } = instituteSlice.actions;
export default instituteSlice.reducer;
