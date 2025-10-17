import { Course, rules } from "@/models/InstituteSchema";
import { Student } from "@/models/StudentsSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
export interface InstituteInfo {
  information: {
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    landline?: string;
    mobile?: string;
    email?: string;
    website?: string;
    short_name?: string;
    currency?: string;
    timezone?: string;
    working_hours?: string;
    institute_type?: string;
    affiliation?: string;
    established_year?: number;
    institute_code?: string;
    institute_name?: string;
    logo: string;
    profile_url: string;
  };
  institute_code: string;
  institute_name: string;
  institute_short_name: string;
  // logo: string;
  // profile_url: string;
  institute_id: string;
  username: string;
  identifier: string;
  user_type: string;
  users: [];
  courses: Course[];
  rules: rules;
  total_student: number;
  total_teacher: number;
  total_courses: number;
  total_unpaid: number;
  recent: [];
  unpaid_student: Student[];
  male_student: Student[];
  female_student: Student[];
  male_teacher: [];
  female_teacher: [];
  monthly_student_enroll: { month: string; students: number }[];
}

// Define the initial state using that type
const initialState: InstituteInfo = {
  information: {
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    landline: "",
    mobile: "",
    email: "",
    website: "",
    short_name: "",
    currency: "",
    timezone: "",
    working_hours: "",
    affiliation: "",
    established_year: 0,
    institute_type: "",
    institute_code: "",
    institute_name: "",
    logo: "",
    profile_url: "",
  },
  institute_code: "",
  // logo: "",
  institute_id: "",
  username: "",
  user_type: "institute",
  // profile_url: "",
  identifier: "",
  institute_name: "",
  total_student: 0,
  total_teacher: 0,
  total_courses: 0,
  total_unpaid: 0,
  users: [],
  courses: [],
  rules: {
    all_permissions: false,
    profile_edit: false,
    send_message: false,
    inbox_message: false,
    website_setting: false,
    add_teacher: false,
    edit_teacher: false,
    delete_teacher: false,
    salary_management: false,
    add_student: false,
    edit_student: false,
    delete_student: false,
    fees_management: false,
    result_permession: false,
    attendance: false,
    manage_users: false,
    settings: false,
    show_student: false,
    show_teacher: false,
  },
  institute_short_name: "",
  recent: [],
  unpaid_student: [],
  male_student: [],
  female_student: [],
  male_teacher: [],
  female_teacher: [],
  monthly_student_enroll: [],
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
    setMaleStudents: (state, action: PayloadAction<Student[] | undefined>) => {
      console.log("Gedner Action", action.payload);
      if (action.payload) {
        state.male_student = action.payload
          .filter((student) => student.gender === "male")
          .map((student) => JSON.parse(JSON.stringify(student)));
      } else {
        state.male_student = [];
      }
    },
    setFemaleStudents: (
      state,
      action: PayloadAction<Student[] | undefined>
    ) => {
      if (action.payload) {
        state.female_student = action.payload
          .filter((student) => student.gender === "female")
          .map((student) => JSON.parse(JSON.stringify(student)));
      } else {
        state.female_student = [];
      }
    },
    setUnpaidStudents: (
      state,
      action: PayloadAction<Student[] | undefined>
    ) => {
      console.log("Unpaid Action", action.payload);
      if (action.payload) {
        state.unpaid_student = action.payload
          .filter((student) => student.fees.status === "unpaid")
          .map((student) => JSON.parse(JSON.stringify(student)));
      } else {
        state.unpaid_student = [];
      }
    },
    setProfileInfo: (state, action: PayloadAction<Partial<InstituteInfo>>) => {
      console.log("Profile Action", action.payload);
      const values = action.payload;
      // if (values.logo) state.logo = values.logo;
      // if (values.profile_url) state.profile_url = values.profile_url;
      if (values.institute_name) state.institute_name = values.institute_name;
      if (values.institute_code) state.institute_code = values.institute_code;
      if (values.username) state.username = values.username;
      state.information = {
        ...state.information,
        ...values,
      };
      // state={
      //   ...state,
      //   logo:action.payload.logo,
      //   profile_url: action.payload.profile_url,
      //   institute_name: action.payload.institute_name,
      //   institute_code: action.payload.institute_code,
      //   information:{
      //     ...action.payload
      //   }
      // }}
    },
  },
});

export const {
  setInstituteInfo,
  setMaleStudents,
  setFemaleStudents,
  setUnpaidStudents,
  setProfileInfo,
} = instituteSlice.actions;
export default instituteSlice.reducer;
