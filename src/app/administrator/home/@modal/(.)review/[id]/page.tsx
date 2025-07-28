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
  CheckIcon,
  Expand,
  FileCheck2,
  Image,
  ImageIcon,
  Text,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Submitted",
    description: "23232",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "In Review",
    description: "2323",
  },
  {
    id: 3,
    date: "N/A",
    title: "Approved",
    description: "23232",
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
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-2xl ">
            {/* {[
              data?.student.firstName,
              data?.student.middleName,
              data?.student.lastName,
            ].join(" ")} */}
          </DrawerTitle>
          <DrawerDescription>
            {/* {data?.student.studentId} */}
          </DrawerDescription>
          <div className="flex gap-2">
            <Badge>BSIT</Badge>
            <Badge>4th Year</Badge>
            <Badge>Section C</Badge>
          </div>
        </DrawerHeader>
        <div className="p-4 overflow-auto no-scrollbar">
          {/* <div className="flex justify-between">
            <div>
              <div className="text-2xl font-semibold">Jerome Laguyo Tecson</div>
              <p className="text-sm text-muted-foreground">2022000493</p>
            </div>
           
          </div> */}

          <div className="grid grid-cols-3 gap-5 ">
            <div className=" rounded-md space-y-12">
              <div>
                <p className="text-xl font-semibold">
                  {" "}
                  {[
                    data?.student.firstName,
                    data?.student.middleName,
                    data?.student.lastName,
                  ].join(" ")}{" "}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {data?.student.studentId}
                </p>
                <span className="flex gap-2 items-center mt-2">
                  <Badge>BSIT</Badge>
                  <Badge>4th Year</Badge>
                  <Badge>Section C</Badge>
                </span>
              </div>

              <div>
                <Timeline defaultValue={2}>
                  {items.map((item) => (
                    <TimelineItem
                      key={item.id}
                      step={item.id}
                      className="group-data-[orientation=vertical]/timeline:ms-10"
                    >
                      <TimelineHeader>
                        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                        <TimelineDate>{item.date}</TimelineDate>
                        <TimelineTitle>{item.title}</TimelineTitle>
                        <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-4.5 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                          <CheckIcon
                            className="group-not-data-completed/timeline-item:hidden"
                            size={14}
                          />
                        </TimelineIndicator>
                      </TimelineHeader>
                      <TimelineContent>{item.description}</TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </div>

            <div className="col-span-2 space-y-3  rounded-md ">
              <div className="text-right  ">
                <h1 className="text-2xl font-semibold">
                  {data?.scholarship.scholarshipTitle}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  June 1st, 2025
                </p>
              </div>
              <div className="flex justify-between mt-15 items-center">
                <h1>Submitted Documents</h1>
                <span className="flex gap-2 items-center">
                  3/3{" "}
                  <Badge className="bg-green-800 text-gray-200">
                    Complete
                    <Check strokeWidth={4} />
                  </Badge>
                </span>
              </div>
              <div className="space-y-2 ">
                <div className="border-input relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-green-800">
                  <div className="flex grow items-center gap-3">
                    <Image />
                    <div className="grid gap-2">
                      <Label>
                        Certificate of Registration <Badge>File</Badge>
                      </Label>
                      <p className="text-muted-foreground text-xs">3MB</p>
                    </div>
                  </div>
                  <Button>
                    View <Expand />
                  </Button>
                </div>{" "}
                <div className="border-input relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-amber-800">
                  <div className="flex grow items-center gap-3">
                    <Image />
                    <div className="grid gap-2">
                      <Label>
                        Certificate of Registration <Badge>Image</Badge>
                      </Label>
                      <p className="text-muted-foreground text-xs">3MB</p>
                    </div>
                  </div>
                  <Button>
                    View <Expand />
                  </Button>
                </div>{" "}
                <div className="border-input relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none border-l-2 border-l-amber-800">
                  <div className="flex grow items-center gap-3">
                    <Image />
                    <div className="grid gap-2">
                      <Label>
                        Certificate of Registration <Badge>Image</Badge>
                      </Label>
                      <p className="text-muted-foreground text-xs">3MB</p>
                    </div>
                  </div>
                  <Button>
                    View <Expand />
                  </Button>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="space-y-2 border-t-2">
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
