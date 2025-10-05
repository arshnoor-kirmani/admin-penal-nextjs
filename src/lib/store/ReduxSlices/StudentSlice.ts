// import { Course, rules } from "@/models/InstituteSchema";
// import { Student } from "@/models/StudentsSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
export interface StudentInfo {
  logo?: string;
  institute_name: string;
  profile_url: string;
  institute_id: string;
  username: string;
  identifier: string;
  user_type: string;
  rules: { [key: string]: boolean | undefined };
}

// Define the initial state using that type
const initialState: StudentInfo = {
  profile_url: "",
  institute_id: "",
  identifier: "",
  username: "",
  user_type: "student",
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

export const StudentSlice = createSlice({
  name: "student",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStudentInfo: (state, action: PayloadAction<StudentInfo>) => {
      console.log("Action", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setStudentInfo } = StudentSlice.actions;
export default StudentSlice.reducer;
