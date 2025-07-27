"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { UserPen, UserRound } from "lucide-react";
import DynamicHeader from "../dynamic-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProfileZod } from "@/lib/zod-user-profile";
const mockUserData = {
  firstName: "Jerome",
  middleName: "Laguyo",
  lastName: "Tecson",
  gender: "Male",
  dateOfBirth: "1999-02-18",

  // Contact
  email: "jerome.tecson@example.com",
  contactNumber: "09154888862",
  address: "Buliran, San Miguel, Bulacan",

  // Academic
  studentId: "2023-00123",
  course: "BSIT",
  yearLevel: "3rd Year",
  section: "A",
  password: "P@ssw0rd123",
};
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@/components/ui/separator";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(true);
  const { form } = useProfileZod(mockUserData);
  const path = usePathname();
  const segmentedPath = path.split("/");
  const { user, loading, error } = useUserStore();
  console.log("meow", user?.studentId, loading, error);

  return (
    <div className="bg-background min-h-screen your-class px-4">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />

      <Form {...form}>
        <div className="w-[60%] mx-auto py-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-semibold flex gap-2 items-center">
                <UserRound /> Jerome Laguyo Tecson
              </h1>
              <p className="text-sm text-gray-500 mt-1">ID: 2022000493</p>
              <div className="flex gap-2 mt-2">
                <Badge>Information Technology</Badge>
                <Badge>4th Year</Badge>
                <Badge>Section C</Badge>
              </div>
            </div>
            <Button onClick={() => setIsEdit(!isEdit)}>
              <UserPen />
              {isEdit ? "Edit Profile" : "Exit Edit Mode"}
            </Button>
          </div>
          <div className=" w-full mt-10 space-y-5">
            <h1 className="text-2xl font-semibold flex gap-2 items-center  pl-3 border-l-3 leading-5.5   border-amber-500">
              Personal Information
            </h1>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" w-full mt-10 space-y-5">
            <h1 className="text-2xl font-semibold flex gap-2 items-center  pl-3 border-l-3 leading-5.5 border-amber-500">
              Contact Information
            </h1>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" w-full mt-10 space-y-5">
            <h1 className="text-2xl font-semibold flex gap-2 items-center  pl-3 border-l-3 leading-5.5 border-amber-500">
              Academic Information
            </h1>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <div className="grid grid-cols-3 gap-3 col-span-2">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isEdit} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="yearLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Level</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isEdit} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isEdit} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
            </div>
          </div>
          <div className=" w-full mt-10 space-y-5">
            <h1 className="text-2xl font-semibold flex gap-2 items-center  pl-3 border-l-3 leading-5.5 border-amber-500">
              Account Security
            </h1>
            <div className="grid grid-cols-2  gap-x-3 gap-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isEdit} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {!isEdit && (
            <>
              {" "}
              <Separator className="mt-10" />
              <div className=" w-full mt-10 space-y-5">
                <div>
                  <h1 className="text-2xl font-semibold flex gap-2 items-center">
                    Save Changes?
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your current password to save changes.
                  </p>
                </div>

                <div className="grid grid-cols-2  gap-x-3 gap-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isEdit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex gap-3">
                  <Button className="flex-1">Save</Button>
                  <Button className="flex-1" onClick={() => setIsEdit(true)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  );
}
