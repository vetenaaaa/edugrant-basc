"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
const steps = [
  {
    step: 1,
    title: "Personal",
  },
  {
    step: 2,
    title: "Account",
  },
  {
    step: 3,
    title: "Review",
  },
  {
    step: 4,
    title: "Verification",
  },
];
interface LoginProps {
  setTransition?: React.Dispatch<
    React.SetStateAction<"hero" | "login" | "register">
  >;
  className: boolean;
}

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  contactNumber: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
});
const accountDetailsSchema = z.object({
  studentId: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  yearLevel: z.string().min(1, "Required"),
  section: z.string().min(1, "Required"),
});
const otpSchema = z.object({
  otp: z.string().min(6, "Required").max(6, "Required"),
});

type personalFormData = z.infer<typeof personalDetailsSchema>;
type accountFormData = z.infer<typeof accountDetailsSchema>;
type otpFormData = z.infer<typeof otpSchema>;

export default function Register({ setTransition, className }: LoginProps) {
  const [stepper, setStepper] = useState(1);
  const [open, setOpen] = useState(false);
  const personalForm = useForm<personalFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      gender: "",
      dateOfBirth: "",
      address: "",
    },
  });
  const accountForm = useForm<accountFormData>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      studentId: "",
      email: "",
      password: "",
      course: "",
      yearLevel: "",
      section: "",
    },
  });
  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const personalData = personalForm.watch();
  const accountData = accountForm.watch();
  const handleHeroClick = () => {
    if (setTransition) {
      setTransition("hero");
    }
  };
  const handlePrevStepper = () => {
    setStepper((prev) => prev - 1);
  };

  const handlePersonalSubmit = () => {
    setStepper(2);
  };
  const handleAccountSubmit = () => {
    setStepper(3);
  };
  const handleReviewSubmit = async () => {
    setStepper(4);
    try {
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/EduGrant/sendAuthCodeRegister`,
        {
          studentFirstName: personalData.firstName,
          studentMiddleName: personalData.middleName,
          studentLastName: personalData.lastName,
          studentContact: personalData.contactNumber,
          studentGender: personalData.gender,
          studentDateofBirth: personalData.dateOfBirth,
          studentAddress: personalData.address,
          studentId: accountData.studentId,
          studentEmail: accountData.email,
          studentPassword: accountData.password,
          studentCourseYearSection: {
            course: accountData.course,
            year: accountData.yearLevel,
            section: accountData.section,
          }
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtpSubmit = async (data: otpFormData) => {
    try {
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/EduGrant/registerAccount`,
        {
          verificationCode: data.otp,
          studentFirstName: personalData.firstName,
          studentMiddleName: personalData.middleName,
          studentLastName: personalData.lastName,
          studentContact: personalData.contactNumber,
          studentGender: personalData.gender,
          studentDateofBirth: personalData.dateOfBirth,
          studentAddress: personalData.address,
          studentId: accountData.studentId,
          studentEmail: accountData.email,
          studentPassword: accountData.password,
          course: accountData.course,
          year: accountData.yearLevel,
          section: accountData.section,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`relative flex justify-center items-center gap-5  w-full ${
        className ? "min-h-[calc(100vh-116px)]" : "min-h-screen"
      }`}
    >
      <Link
        href={"/"}
        prefetch={true}
        onClick={handleHeroClick}
        className="absolute top-3 left-3"
      >
        <Button variant="outline">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="flex-1 flex justify-center items-center ">
        <div className="min-w-2xl space-y-5">
          <Stepper
            defaultValue={1}
            value={stepper}
            className="items-start gap-3 "
          >
            {steps.map(({ step, title }) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                  <StepperIndicator asChild className="bg-border h-1 w-full">
                    <span className="sr-only">{step}</span>
                  </StepperIndicator>
                  <div className="space-y-0.5">
                    <StepperTitle>{title}</StepperTitle>
                  </div>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
          {stepper === 1 && (
            <Form {...personalForm}>
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Personal Information
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Tell us about yourself.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
                  <FormField
                    control={personalForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          First Name <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Middle Name <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your middle name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Last Name <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Contact number <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your contact number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Gender <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Date of Birth <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-full justify-between font-normal"
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(
                                    date?.toISOString().split("T")[0] || ""
                                  );
                                  setOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={personalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="flex items-center justify-between">
                          Address (Street, Barangay, City/Municipality,
                          Province) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your complete address"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  onClick={personalForm.handleSubmit(handlePersonalSubmit)}
                  className="w-full mt-4"
                >
                  Next
                </Button>
              </div>
            </Form>
          )}
          {stepper === 2 && (
            <Form {...accountForm}>
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Account Information
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill out all required fields to start scholarship
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
                  <FormField
                    control={accountForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem className=" col-span-2">
                        <FormLabel className="flex items-center justify-between">
                          Student ID <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your student ID"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Email <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Password <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex col-span-2 gap-4">
                    <FormField
                      control={accountForm.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="flex items-center justify-between">
                            Course <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your course" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="yearLevel"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="flex items-center justify-between">
                            Year Level <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Year Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1st Year">
                                  1st Year
                                </SelectItem>
                                <SelectItem value="2nd Year">
                                  2nd Year
                                </SelectItem>
                                <SelectItem value="3rd Year">
                                  3rd Year
                                </SelectItem>
                                <SelectItem value="4th Year">
                                  4th Year
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="section"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="flex items-center justify-between">
                            Section <FormMessage />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your section"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-13 items-center">
                  <Button
                    type="button"
                    onClick={handlePrevStepper}
                    variant="outline"
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={accountForm.handleSubmit(handleAccountSubmit)}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Form>
          )}
          {stepper === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Review & Submit</h1>
                <p className="text-sm mt-1 text-muted-foreground">
                  Please review your information before submitting
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Name:</strong> {personalData.firstName}{" "}
                      {personalData.middleName} {personalData.lastName}
                    </div>
                    <div>
                      <strong>Contact:</strong> {personalData.contactNumber}
                    </div>
                    <div>
                      <strong>Gender:</strong> {personalData.gender}
                    </div>
                    <div>
                      <strong>Date of Birth:</strong> {personalData.dateOfBirth}
                    </div>
                    <div className="col-span-2">
                      <strong>Address:</strong> {personalData.address}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Student ID:</strong> {accountData.studentId}
                    </div>
                    <div>
                      <strong>Email:</strong> {accountData.email}
                    </div>
                    <div>
                      <strong>Course:</strong> {accountData.course}
                    </div>
                    <div>
                      <strong>Year Level:</strong> {accountData.yearLevel}
                    </div>
                    <div>
                      <strong>Section:</strong> {accountData.section}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-13">
                <Button
                  onClick={handlePrevStepper}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button onClick={handleReviewSubmit} className="flex-1">
                  Submit Application
                </Button>
              </div>
            </div>
          )}
          {stepper === 4 && (
            <Form {...otpForm}>
              <div className="space-y-6 flex justify-center items-center flex-col">
                <div className="max-w-md space-y-5">
                  <div className="">
                    <h1 className="text-2xl font-semibold">Code Verifcation</h1>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Enter the code we sent to your gmail.
                    </p>
                  </div>
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Enter 6-digit code
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 mt-13">
                    <Button variant="outline" className="flex-1" disabled>
                      Resend (0s)
                    </Button>
                    <Button
                      onClick={otpForm.handleSubmit(handleOtpSubmit)}
                      className="flex-1"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
