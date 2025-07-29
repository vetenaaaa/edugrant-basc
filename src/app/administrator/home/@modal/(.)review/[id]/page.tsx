"use client";

// import { Ring } from "ldrs/react";
import { Progress } from "@/components/ui/progress";
// import "ldrs/react/Ring.css";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import useApplicationById from "@/lib/get-application-by-id";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Download,
  File,
  Image,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Label } from "@/components/ui/label";

import Reviewer from "./reviewer";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

// const steps = [
//   {
//     step: 1,
//     title: "Submitted",
//     description: "Jan 8, 2025",
//   },
//   {
//     step: 2,
//     title: "On Review",
//     description: "In progress",
//   },
//   {
//     step: 3,
//     title: "Approved",
//     description: "In progress",
//   },
//   {
//     step: 4,
//     title: "Incomplete",
//     description: "In progress",
//   },
// ];
export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data } = useApplicationById(id);
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 200);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="max-w-[900px] w-full mx-auto h-[95vh] outline-0 border-0">
        <DrawerHeader className=" ">
          <DrawerTitle className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-2xl font-semibold">
                {[
                  data?.student.firstName,
                  data?.student.middleName,
                  data?.student.lastName,
                ].join(" ")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {data?.student.studentId}
              </p>
              <span className="flex gap-2 items-center mt-2">
                <Badge className="bg-blue-800 text-gray-200">
                  {data?.student.studentCourseYearSection.course}
                </Badge>
                <Badge className="bg-blue-800 text-gray-200">
                  {data?.student.studentCourseYearSection.year}
                </Badge>
                <Badge className="bg-blue-800 text-gray-200">
                  Section {data?.student.studentCourseYearSection.section}
                </Badge>
              </span>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-semibold text-blue-900">
                {data?.scholarship.scholarshipTitle}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                by {data?.scholarship.scholarshipProvider}
              </p>
            </div>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-auto no-scrollbar space-y-5">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-1.5 items-center">
                <h1 className="font-semibold">Submitted Documents</h1>
                <span className="flex gap-1 items-center">
                  {data?.userDocuments && (
                    <p className="font-semibold">
                      {Object.keys(data.userDocuments).length}
                    </p>
                  )}
                  /{" "}
                  <p className="">
                    {" "}
                    {data?.scholarship.scholarshipDocuments.length}
                  </p>
                </span>
              </div>
              <div>
                {data?.applicationDate
                  ? format(data?.applicationDate, "PPP")
                  : ""}
              </div>
            </div>
            <div className="space-y-2 ">
              {data?.userDocuments &&
                Object.entries(data.userDocuments).map(([key, doc]) => (
                  <div
                    key={key}
                    className=" border-input relative flex w-full items-center gap-3 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-green-800 bg-card overflow-hidden"
                  >
                    <div className="flex grow items-center gap-3">
                      {doc.fileFormat === "jpg" || doc.fileFormat === "png" ? (
                        <Image />
                      ) : (
                        <File />
                      )}

                      <div className="grid gap-2">
                        <Label>
                          {doc.document}{" "}
                          <Badge className="uppercase bg-red-900 text-gray-200">
                            {doc.fileFormat || "DOCX"}
                          </Badge>
                        </Label>
                        <p className="text-muted-foreground text-xs truncate">
                          {doc.cloudinaryId}
                        </p>
                      </div>
                    </div>
                    <Reviewer
                      fileFormat={doc.fileFormat}
                      resourceType={doc.resourceType}
                      fileUrl={doc.fileUrl}
                      document={doc.document}
                      cloudinaryId={doc.cloudinaryId}
                    />
                    <Button variant="ghost">
                      <Download />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          <Separator />
          <div className="grid md:grid-cols-1 gap-6 px-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-700" />
                <div>
                  <p className="text-sm text-gray-700">Applicant Name</p>
                  <p className="font-semibold text-gray-200">
                    {[
                      data?.student.firstName,
                      data?.student.middleName,
                      data?.student.lastName,
                    ].join(" ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-700" />
                <div>
                  <p className="text-sm text-gray-700">Email</p>
                  <p className="font-semibold text-gray-200">
                    {data?.student.studentEmail}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-700" />
                <div>
                  <p className="text-sm text-gray-700">Phone</p>
                  <p className="font-semibold text-gray-200">
                    {data?.student.contactNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-700" />
                <div>
                  <p className="text-sm text-gray-700">Date of Birth</p>
                  <p className="font-semibold text-gray-200">
                    {data?.student.dateOfBirth
                      ? format(data.student.dateOfBirth, "PPP")
                      : ""}
                  </p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">
                  {" "}
                  {data?.scholarship.scholarshipProvider}
                </p>
                <p className="text-lg font-semibold text-blue-900">
                  {data?.scholarship.scholarshipTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="space-y-2 border-t-2">
          {/* <Stepper defaultValue={2}>
            {steps.map(({ step, title, description }) => (
              <StepperItem
                key={step}
                step={step}
                className="not-last:flex-1 max-md:items-start"
              >
                <StepperTrigger className="gap-4 rounded max-md:flex-col">
                  <StepperIndicator />
                  <div className="text-center md:-order-1 md:text-left">
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                )}
              </StepperItem>
            ))}
          </Stepper> */}
          <Progress value={100} />
          {/* <Textarea placeholder="Admin Comment (Optional)" /> */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-green-800 hover:bg-green-900 text-gray-200">
              Approve
            </Button>{" "}
            <Button className="flex-1 bg-red-800 hover:bg-red-900 text-gray-200">
              Reject
            </Button>
            <Button className="flex-1 bg-amber-800 hover:bg-amber-900 text-gray-200">
              Incomplete
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
