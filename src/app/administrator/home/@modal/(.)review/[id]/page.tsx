"use client";

import { Ring } from "ldrs/react";
import { Progress } from "@/components/ui/progress";
import "ldrs/react/Ring.css";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  
  Download,


  Image,

} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import Reviewer from "./reviewer";

const steps = [
  {
    step: 1,
    title: "Submitted",
    description: "Jan 8, 2025",
  },
  {
    step: 2,
    title: "On Review",
    description: "In progress",
  },
  {
    step: 3,
    title: "Approved",
    description: "In progress",
  },
  {
    step: 4,
    title: "Incomplete",
    description: "In progress",
  },
];
export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useApplicationById(id);
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
        <DrawerHeader className="  border-b-2">
          <DrawerTitle className="grid grid-cols-3 gap-5">
            <div>
              <p className="text-xl font-semibold">
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
                <Badge className="bg-blue-800 text-gray-200">BSIT</Badge>
                <Badge className="bg-blue-800 text-gray-200">4th Year</Badge>
                <Badge className="bg-blue-800 text-gray-200">Section C</Badge>
              </span>
            </div>
            <div className="text-right col-span-2">
              <h1 className="text-2xl font-semibold">
                {data?.scholarship.scholarshipTitle}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                June 1st, 2025
              </p>
            </div>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-auto no-scrollbar">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Submitted Documents</h1>
              <span className="flex gap-2 items-center">
                3/3{" "}
                <Badge className="bg-green-800 text-gray-200">
                  Complete
                  <Check strokeWidth={4} />
                </Badge>
              </span>
            </div>
            <div className="space-y-2 ">
              {data?.userDocuments &&
                Object.entries(data.userDocuments).map(([key, doc]) => (
                  <div
                    key={key}
                    className="border-input relative flex w-full items-center gap-3 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-green-800"
                  >
                    <div className="flex grow items-center gap-3">
                      <Image />
                      <div className="grid gap-2">
                        <Label>
                          {doc.document} <Badge>File</Badge>
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
                    <Button>
                      <Download />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <DrawerFooter className="space-y-2 border-t-2">
          <Stepper defaultValue={2}>
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
          </Stepper>
          <Progress value={33} />
          {/* <Textarea placeholder="Admin Comment (Optional)" /> */}
          <div className="flex gap-3">
            <Button
              disabled
              className="flex-1 bg-green-800 hover:bg-green-900 text-gray-200"
            >
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
