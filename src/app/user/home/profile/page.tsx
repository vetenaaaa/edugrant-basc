"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Edit3,
  Eye,
  EyeOff,
} from "lucide-react";
import DynamicHeader from "../dynamic-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="bg-background min-h-screen">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />
      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        {/* Profile Header Card */}
        <div className="bg-card rounded-lg  p-4 mb-8 border ">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-300 mb-2">
                John Michael Smith
              </h2>
              <div className="text-lg text-gray-600 mb-3">
                <span className="font-semibold">2021-0001234</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge> Computer Science</Badge>
                <Badge> 3rd Year</Badge>
                <Badge> Section CS-3A</Badge>
              </div>
            </div>

            <Button>
              {" "}
              <Edit3 />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-card rounded-lg  p-4 border  ">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Personal Information
            </h3>

            <div className="mb-4 space-y-2">
              <Label>First Name</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Middle Name</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Last Name</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Gender</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Date of Birth</Label>
              <Input />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card rounded-lg  p-4 border  ">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Contact Information
            </h3>

            <div className="mb-4 space-y-2">
              <Label>Email Address</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Contact Number</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Address</Label>
              <Input />
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-card rounded-lg  p-4 border  ">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Academic Information
            </h3>

            <div className="mb-4 space-y-2">
              <Label>Student ID</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Course</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Year Level</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Section</Label>
              <Input />
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-card rounded-lg  p-4 border  ">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Account Security
            </h3>

            <div className="mb-4 space-y-2">
              <Label>Email</Label>
              <Input />
            </div>
            <div className="mb-4 space-y-2">
              <Label>Password</Label>
              <Input />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
