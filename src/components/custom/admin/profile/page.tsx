"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  useFieldArray,
  useForm,
  UseFormReset,
} from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Building2,
  Contact,
  GraduationCap,
  Settings,
  PlusCircle,
  Trash2,
  Edit,
  XIcon,
  SaveIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/custom/redux-hooks";
import {
  InstituteInfo,
  setProfileInfo,
} from "@/lib/store/ReduxSlices/InstituteSlice";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// Schemas for each form
const generalInfoSchema = z.object({
  logo: z.string(),
  profile_url: z.string(),
  institute_name: z.string().min(1, "Institute name is required"),
  username: z.string().min(1, "Institute type is required"),
  institute_code: z.string(),
  established_year: z
    .number()
    .min(1800, "Year must be 1800 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  affiliation: z.string(),
});

const contactInfoSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string(),
  landline: z.string(),
  mobile: z.string(),
  email: z.string().email(),
  website: z.string().url(),
});

const academicInfoSchema = z.object({
  courses: z
    .array(
      z.object({
        value: z.string().min(1, "Course name cannot be empty"),
      })
    )
    .nonempty("Please add at least one course."),
  medium: z.string(),
  studentCapacity: z.number(),
  currentStrength: z.number(),
});

// const brandingSchema = z.object({});

const settingsSchema = z.object({
  short_name: z.string(),
  currency: z.string(),
  timezone: z.string(),
  workingHours: z.string(),
});
// =============================================================================================================
function useUpdateProfile() {
  const dispatch = useAppDispatch();

  const updateProfile = async <T extends FieldValues>(
    institute_code: string,
    values: T,
    formReset: UseFormReset<T>,
    setFormDirty: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await axios
        .post("/api/auth/set-institute-profile", {
          institute_code: institute_code,
          info: values,
        })
        .then(() => {
          if (!values) throw new Error("Failed to update profile information");
          dispatch(setProfileInfo(values));
          setFormDirty(false);
          formReset({ ...values });
          toast.success("Profile Information Updated Successfully");
        });
    } catch (error) {
      toast.error("Failed to update profile information");
      console.error(error);
    }
  };

  return updateProfile;
}
// =============================================================================================================
function GeneralInfoForm({
  // institute,
  editDisabel,
  setFormDirty,
}: {
  // institute: InstituteInfo;
  editDisabel: boolean;
  setFormDirty: React.Dispatch<SetStateAction<boolean>>;
}) {
  const institute = useAppSelector((state) => state.institute);
  const UpdateProfileInformation = useUpdateProfile();
  const [submitDisabel, setSubmitDisabel] = useState(false);
  const [logo_url, setLogo_url] = useState("");
  const [profile_url, setProfile_url] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  // if (!institute.identifier) return;
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      logo: institute.logo,
      profile_url: institute.logo,
      institute_name: institute.institute_name || "**************",
      username: institute.username || "",
      institute_code: institute.institute_code || "IMS-12345",
      established_year: institute.information?.established_year || 2002,
      affiliation:
        institute.information?.affiliation ||
        "Affiliated to CBSE, UGC Approved",
    },
  });
  const {
    formState: { isDirty },
  } = form;
  async function UploadFile(file: File, uploadType: string) {
    console.log(file);
    console.log("file", file.webkitRelativePath);
    const url = URL.createObjectURL(file);
    if (uploadType === "logo") setLogo_url(url);
    if (uploadType === "profile") setProfile_url(url);
    return url;
  }
  function onSubmit(values: z.infer<typeof generalInfoSchema>) {
    console.log(values);
    // TODO::
    if (logoFile) UploadFile(logoFile, "logo");
    if (profileFile) UploadFile(profileFile, "profile");
    values.logo =
      "https://images.pexels.com/photos/6809665/pexels-photo-6809665.jpeg";
    values.profile_url =
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg";
    UpdateProfileInformation(
      institute.institute_code,
      values,
      form.reset,
      setFormDirty
    ).then(() => {
      setSubmitDisabel(false);
    });
  }
  useEffect(() => {
    setSubmitDisabel(isDirty);
    setFormDirty(isDirty);
  }, [isDirty, setFormDirty]);
  useEffect(() => {
    form.reset({
      logo: institute.logo,
      profile_url: institute.logo,
      institute_name: institute.institute_name || "",
      username: institute.username || "",
      institute_code: institute.institute_code || "",
      affiliation: institute.information?.affiliation || "",
      established_year: institute.information?.established_year,
    });
  }, [
    institute.identifier,
    form,
    institute.logo,
    institute.institute_name,
    institute.username,
    institute.institute_code,
    institute.information?.affiliation,
    institute.information?.established_year,
  ]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Manage your institute&apos;s basic details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                {" "}
                <div className="relative">
                  <Avatar className="h-24 w-24 relative z-9">
                    <AvatarImage
                      src={logo_url || institute.logo}
                      alt="Institute Logo"
                    />
                    <AvatarFallback>LOGO</AvatarFallback>
                  </Avatar>
                  {logo_url && (
                    <XIcon
                      className="absolute z-10 top-0 right-0 bg-primary text-muted  overflow-hidden rounded-full p-0.5 border-muted border-3 cursor-pointer"
                      onClick={() => {
                        setLogo_url("");
                        form.resetField("logo");
                      }}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Institute Logo / Favicon</Label>
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => {
                      const { value: _value, ...rest } = field;
                      return (
                        <FormItem>
                          {/* <FormLabel>Institute Name</FormLabel> */}
                          <FormControl>
                            <Input
                              {...rest}
                              id="logo-upload"
                              type="file"
                              disabled={!editDisabel}
                              onChange={(e) => {
                                if (!e || !e.target.files || !e.target.files[0])
                                  return _value;
                                setLogoFile(e.target.files[0]);
                                const url = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                setLogo_url(url);
                                field.onChange(url);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 256x256px
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                {" "}
                <div className="relative">
                  <Avatar className="h-24 w-24 relative z-9">
                    <AvatarImage
                      src={profile_url || institute.profile_url}
                      alt="Profile Image"
                    />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                  {profile_url && (
                    <XIcon
                      className="absolute z-10 top-0 right-0 bg-primary text-muted  overflow-hidden rounded-full p-0.5 border-muted border-3 cursor-pointer"
                      onClick={() => {
                        setProfile_url("");
                        form.resetField("profile_url");
                      }}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-file">Owner Profile Picture</Label>
                  <FormField
                    control={form.control}
                    name="profile_url"
                    render={({ field }) => {
                      const { value, ...rest } = field;
                      return (
                        <FormItem>
                          {/* <FormLabel>Institute Name</FormLabel> */}
                          <FormControl>
                            <Input
                              {...rest}
                              disabled={!editDisabel}
                              id="prfile_file"
                              type="file"
                              onChange={(e) => {
                                if (!e || !e.target.files || !e.target.files[0])
                                  return value;
                                setProfileFile(e.target.files[0]);
                                const url = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                setProfile_url(url);
                                field.onChange(url);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 256x256px
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="institute_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Name</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!editDisabel} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institute_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Code</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="established_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established Year</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!editDisabel}
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Affiliation / Accreditation</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {editDisabel && (
              <Button
                type="submit"
                disabled={!submitDisabel}
                onClick={() => {
                  console.log(form.formState.isDirty);
                }}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function ContactInfoForm({
  institute,
  editDisabel,
  setFormDirty,
}: {
  institute: InstituteInfo;
  editDisabel: boolean;
  setFormDirty: React.Dispatch<SetStateAction<boolean>>;
}) {
  const UpdateProfileInformation = useUpdateProfile();
  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      address: institute?.information?.address || "",
      city: institute?.information?.city || "",
      state: institute?.information?.state || "",
      pincode: institute?.information?.pincode || "",
      country: institute?.information?.country || "",
      landline: institute?.information?.landline || "",
      mobile: institute?.information?.mobile || "",
      email: institute?.information?.email || "",
      website: institute?.information?.website || "",
    },
  });
  const {
    formState: { isDirty },
  } = form;
  // =======================================================================================================
  function onSubmit(values: z.infer<typeof contactInfoSchema>) {
    console.log(values);
    UpdateProfileInformation(
      institute.institute_code,
      values,
      form.reset,
      setFormDirty
    );
  }
  useEffect(() => {
    setFormDirty(isDirty);
  }, [isDirty, setFormDirty]);
  useEffect(() => {
    form.reset({
      address: institute.information?.address || "",
      city: institute.information?.city || "",
      state: institute.information?.state || "",
      pincode: institute.information?.pincode || "",
      country: institute.information?.country || "",
      landline: institute.information?.landline || "",
      mobile: institute.information?.mobile || "",
      email: institute.information?.email || "",
      website: institute.information?.website || "",
    });
  }, [
    institute.identifier,
    form,
    institute.information?.address,
    institute.information?.city,
    institute.information?.state,
    institute.information?.pincode,
    institute.information?.country,
    institute.information?.landline,
    institute.information?.mobile,
    institute.information?.email,
    institute.information?.website,
  ]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Update your institute&apos;s contact details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number (Landline)</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email ID</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {editDisabel && (
              <Button
                type="submit"
                disabled={!isDirty}
                onClick={() => {
                  console.log(form.formState.isDirty);
                }}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function AcademicInfoForm() {
  const form = useForm<z.infer<typeof academicInfoSchema>>({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      courses: [
        { value: "B.Tech in Computer Science" },
        { value: "MBA in Marketing" },
      ],
      medium: "english",
      studentCapacity: 5000,
      currentStrength: 4500,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "courses",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof academicInfoSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 relative"
      >
        <div className="w-full h-full bg-muted/70 absolute top-0 left-0 flex items-center justify-center rounded-md z-10">
          <h1 className="text-2xl font-bold text-accent-foreground">
            Comming Soon...
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>
              Manage courses, classes, and student capacity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormLabel>Courses Offered</FormLabel>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`courses.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ value: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="medium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medium of Instruction</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Strength</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

// function BrandingForm() {
//   const form = useForm<z.infer<typeof brandingSchema>>({
//     resolver: zodResolver(brandingSchema),
//     defaultValues: {},
//   });

//   function onSubmit(values: z.infer<typeof brandingSchema>) {
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Branding Materials</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="logo"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Logo</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         onChange={(e) => field.onChange(e.target.files)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="stamp"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Stamp/Seal</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         onChange={(e) => field.onChange(e.target.files)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="brochure"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Brochure (PDF)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         accept=".pdf"
//                         onChange={(e) => field.onChange(e.target.files)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Important Certificates</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="affiliationCertificate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Affiliation Certificate</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         onChange={(e) => field.onChange(e.target.files)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="isoCertificate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>ISO Certificate</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         onChange={(e) => field.onChange(e.target.files)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>
//         </div>
//         <Button variant={"default"} type="submit" className="mt-8">
//           Save Changes
//         </Button>
//       </form>
//     </Form>
//   );
// }

function SettingsForm({
  institute,
  editDisabel,
  setFormDirty,
}: {
  institute: InstituteInfo;
  editDisabel: boolean;
  setFormDirty: React.Dispatch<SetStateAction<boolean>>;
}) {
  const UpdateProfileInformation = useUpdateProfile();
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      short_name: institute?.information?.short_name || "HGI",
      currency: institute?.information?.currency || "inr",
      timezone: institute?.information?.timezone || "ist",
      workingHours:
        institute?.information?.working_hours || "9:00 AM - 5:00 PM",
    },
  });
  const {
    formState: { isDirty },
  } = form;
  // =================================================================================================
  function onSubmit(values: z.infer<typeof settingsSchema>) {
    console.log(values);
    UpdateProfileInformation(
      institute.institute_code,
      values,
      form.reset,
      setFormDirty
    );
  }
  // =================================================================================================
  useEffect(() => {
    setFormDirty(isDirty);
  }, [isDirty, setFormDirty]);
  useEffect(() => {
    form.reset({
      currency: institute.information?.currency || "inr",
      timezone: institute.information?.timezone || "ist",
      workingHours: institute.information?.working_hours || "9:00 AM - 5:00 PM",
      short_name: institute.information?.short_name || "HGI",
    });
  }, [
    institute.identifier,
    form,
    institute.information?.currency,
    institute.information?.timezone,
    institute.information?.working_hours,
    institute.information?.short_name,
  ]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure system-wide settings for your institute.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="short_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Code / Short Name</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Currency</FormLabel>
                    <Select
                      disabled={!editDisabel}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inr">₹ (INR)</SelectItem>
                        <SelectItem value="usd">$ (USD)</SelectItem>
                        <SelectItem value="gbp">£ (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Zone</FormLabel>
                    <Select
                      disabled={!editDisabel}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ist">
                          IST (India Standard Time)
                        </SelectItem>
                        <SelectItem value="gmt">
                          GMT (Greenwich Mean Time)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Working Hours</FormLabel>
                    <FormControl>
                      <Input disabled={!editDisabel} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="holiday-calendar">Holiday Calendar</Label>
              <Input
                disabled={!editDisabel}
                id="holiday-calendar"
                type="file"
              />
              <p className="text-xs text-muted-foreground">
                Upload a .ics or .csv file for the holiday list.
              </p>
            </div> */}
            {editDisabel && (
              <Button
                type="submit"
                disabled={!isDirty}
                onClick={() => {
                  console.log(form.formState.isDirty);
                }}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function Profile() {
  const [formDirty, setFormDirty] = useState(false);
  const [editDisabel, setEditDisabel] = useState(false);
  const InstituteInfo = useAppSelector((state) => state.institute);
  console.log(InstituteInfo);
  return (
    <div className="p-1 pt-0 md:p-8 gap-3">
      <Card className="mb-4">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={InstituteInfo.profile_url}
                className="object-cover "
                alt="Profile"
              />
              <AvatarFallback>
                {InstituteInfo.information.short_name || "LG"}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h1 className="text-xl md:text-2xl font-bold">
                {InstituteInfo.institute_name || ""}
              </h1>
              <p className="text-sm text-muted-foreground">
                {InstituteInfo.username || "Username"}
              </p>
            </div>
          </div>
          {!editDisabel && (
            <Button
              variant="outline"
              className="hidden md:flex w-full md:w-auto cursor-pointer"
              onClick={() => setEditDisabel((prev) => !prev)}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
          {editDisabel && (
            <Button
              variant="outline"
              className="hidden md:flex w-full md:w-auto cursor-pointer"
              onClick={() => !formDirty && setEditDisabel((prev) => !prev)}
            >
              <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          )}
        </CardHeader>
        <CardFooter className="md:hidden">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => setEditDisabel(true)}
          >
            {!editDisabel && (
              <span>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </span>
            )}
            {editDisabel && (
              <span>
                <SaveIcon /> Save Changes
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-fit sm:grid-cols-3 gap-y-1 md:grid-cols-4 p-2">
          <TabsTrigger
            className="p-2 cursor-pointer"
            value="general"
            disabled={formDirty}
          >
            <Building2 className="mr-1 md:mr-2" /> General Info
          </TabsTrigger>
          <TabsTrigger
            className="p-2 cursor-pointer"
            value="contact"
            disabled={formDirty}
          >
            <Contact className="mr-1 md:mr-2" /> Contact Info
          </TabsTrigger>
          <TabsTrigger
            className="p-2 cursor-pointer"
            value="academic"
            disabled={formDirty}
          >
            <GraduationCap className="mr-1 md:mr-2" /> Academic Info
          </TabsTrigger>
          {/* <TabsTrigger className="p-2" value="branding">
            <FileText className="mr-1 md:mr-2" /> Documents & Branding
          </TabsTrigger> */}
          <TabsTrigger
            className="p-2 cursor-pointer"
            value="settings"
            disabled={formDirty}
          >
            <Settings className="mr-1 md:mr-2" /> System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralInfoForm
            setFormDirty={setFormDirty}
            // institute={InstituteInfo}
            editDisabel={editDisabel}
          />
        </TabsContent>
        <TabsContent value="contact">
          <ContactInfoForm
            setFormDirty={setFormDirty}
            institute={InstituteInfo}
            editDisabel={editDisabel}
          />
        </TabsContent>
        <TabsContent value="academic">
          <AcademicInfoForm />
        </TabsContent>
        {/* <TabsContent value="branding">
          <BrandingForm />
        </TabsContent> */}
        <TabsContent value="settings">
          <SettingsForm
            setFormDirty={setFormDirty}
            institute={InstituteInfo}
            editDisabel={editDisabel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
