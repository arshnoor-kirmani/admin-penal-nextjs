"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
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
  FormDescription,
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
  FileText,
  Upload,
  PlusCircle,
  Trash2,
  Edit,
  XCircle,
  X,
  XIcon,
  SaveIcon,
} from "lucide-react";
import { useAppSelector } from "@/hooks/custom/redux-hooks";
import { InstituteInfo } from "@/lib/store/ReduxSlices/InstituteSlice";
import UserForm from "./fileUploade";
import { useState } from "react";
import { set } from "mongoose";

// Schemas for each form
const generalInfoSchema = z.object({
  logo: z.string(),
  prfile_url: z.string(),
  instituteName: z.string().min(1, "Institute name is required"),
  instituteType: z.string().min(1, "Institute type is required"),
  institute_code: z.string(),
  establishedYear: z
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

const brandingSchema = z.object({});

const settingsSchema = z.object({
  instituteCode: z.string(),
  currency: z.string(),
  timezone: z.string(),
  workingHours: z.string(),
});

function GeneralInfoForm({ institute }: { institute: InstituteInfo }) {
  const [logo_url, setLogo_url] = useState("");
  const [profile_url, setProfile_url] = useState("");
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      logo: institute.logo,
      prfile_url: institute.logo,
      instituteName: institute.institute_name || "**************",
      instituteType: institute.institute_type || "college",
      institute_code: institute.institute_code || "IMS-12345",
      establishedYear: institute.established_year || 2002,
      affiliation:
        institute.institute_affiliation || "Affiliated to CBSE, UGC Approved",
    },
  });
  async function UploadFile(files: FileList, uploadType: string) {
    console.log(files);
    console.log("file", files[0].webkitRelativePath);
    const url = URL.createObjectURL(files[0]);
    if (uploadType === "logo") setLogo_url(url);
    if (uploadType === "profile") setProfile_url(url);
    return url;
  }
  function onSubmit(values: z.infer<typeof generalInfoSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Manage your institute's basic details.
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
                      const { value, ...rest } = field;
                      return (
                        <FormItem>
                          {/* <FormLabel>Institute Name</FormLabel> */}
                          <FormControl>
                            <Input
                              {...rest}
                              id="logo-upload"
                              type="file"
                              onChange={(e) => {
                                if (e.target.files)
                                  UploadFile(e.target?.files, "logo").then(
                                    (url) => {
                                      field.onChange(url);
                                    }
                                  );
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
                      }}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-file">Owner Profile Picture</Label>
                  <FormField
                    control={form.control}
                    name="prfile_url"
                    render={({ field }) => {
                      const { value, ...rest } = field;
                      return (
                        <FormItem>
                          {/* <FormLabel>Institute Name</FormLabel> */}
                          <FormControl>
                            <Input
                              {...rest}
                              id="prfile_file"
                              type="file"
                              onChange={(e) => {
                                if (e.target.files)
                                  UploadFile(e.target?.files, "profile").then(
                                    (url) => {
                                      field.onChange(url);
                                    }
                                  );
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
                name="instituteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instituteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                        <SelectItem value="university">University</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="establishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                      <Input {...field} />
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

function ContactInfoForm() {
  const form = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      address: "123, Knowledge Park, Greater Noida",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      pincode: "201310",
      country: "India",
      landline: "0120-1234567",
      mobile: "+91-9876543210",
      email: "info@hopeinstitute.com",
      website: "https://hopeinstitute.com",
    },
  });

  function onSubmit(values: z.infer<typeof contactInfoSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Update your institute's contact details.
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input type="email" {...field} />
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
                      <Input {...field} />
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

function SettingsForm() {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      instituteCode: "HGI",
      currency: "inr",
      timezone: "ist",
      workingHours: "9:00 AM - 5:00 PM",
    },
  });

  function onSubmit(values: z.infer<typeof settingsSchema>) {
    console.log(values);
  }

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
                name="instituteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Code / Short Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="holiday-calendar">Holiday Calendar</Label>
              <Input id="holiday-calendar" type="file" />
              <p className="text-xs text-muted-foreground">
                Upload a .ics or .csv file for the holiday list.
              </p>
            </div>
            <Button type="submit">Save Changes</Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function Profile() {
  const [editDisabel, setEditDisabel] = useState(false);
  const InstituteInfo = useAppSelector((state) => state.institute);
  return (
    <div className="p-2 md:p-8 gap-3">
      <Card className="my-4">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt="Profile"
              />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h1 className="text-xl md:text-2xl font-bold">
                Hope Group of Institute
              </h1>
              <p className="text-sm text-muted-foreground">Arshnoor Kirmani</p>
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex w-full md:w-auto">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardHeader>
        <CardFooter className="md:hidden">
          <CardAction>
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
          </CardAction>
        </CardFooter>
      </Card>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-fit sm:grid-cols-3 gap-y-1 md:grid-cols-4 p-2">
          <TabsTrigger className="p-2 cursor-pointer" value="general">
            <Building2 className="mr-1 md:mr-2" /> General Info
          </TabsTrigger>
          <TabsTrigger className="p-2 cursor-pointer" value="contact">
            <Contact className="mr-1 md:mr-2" /> Contact Info
          </TabsTrigger>
          <TabsTrigger className="p-2 cursor-pointer" value="academic">
            <GraduationCap className="mr-1 md:mr-2" /> Academic Info
          </TabsTrigger>
          {/* <TabsTrigger className="p-2" value="branding">
            <FileText className="mr-1 md:mr-2" /> Documents & Branding
          </TabsTrigger> */}
          <TabsTrigger className="p-2 cursor-pointer" value="settings">
            <Settings className="mr-1 md:mr-2" /> System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralInfoForm institute={InstituteInfo} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactInfoForm />
        </TabsContent>
        <TabsContent value="academic">
          <AcademicInfoForm />
        </TabsContent>
        {/* <TabsContent value="branding">
          <BrandingForm />
        </TabsContent> */}
        <TabsContent value="settings">
          <SettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
