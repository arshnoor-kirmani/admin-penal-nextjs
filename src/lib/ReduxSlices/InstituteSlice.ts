import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface InstituteInfo {
  institute_name: string;
  logo: string;
  institute_id: string;
  username: string;
  email: string;
  users: any[];
  courses: any[];
  rules: { [key: string]: boolean };
  institute_short_name: string;
}

// Define the initial state using that type
const initialState: InstituteInfo = {
  logo: "https://github.com/shadcn.png",
  institute_id: "68c99c615d737fe36af14cea",
  username: "Sarfaraz Khan",
  email: "skjansewakendra86+1@gmail.com",
  institute_name: "Hope Group of Institute",
  users: [],
  courses: [],
  rules: {
    all_permissions: true,
    profile_edit: true,
    send_message: true,
    inbox_message: true,
    website_setting: true,
    add_teacher: true,
    edit_teacher: true,
    delete_teacher: true,
    salary_management: true,
    add_student: true,
    edit_student: true,
    delete_student: true,
    fees_management: true,
    result_permession: true,
    attendance: true,
    manage_users: true,
    settings: true,
    show_student: false,
    show_teacher: true,
  },
  institute_short_name: "HGI",
};

export const instituteSlice = createSlice({
  name: "institute",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInstitute = (state: RootState) => state.institute;

export default instituteSlice.reducer;
