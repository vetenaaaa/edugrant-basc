"use client";
import {
  CalendarClock,
  FileInput,
  FilePlus2,
  Files,
  Maximize,
  PhilippinePeso,
  X,
} from "lucide-react";
import { Ring } from "ldrs/react";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useScholarshipUserById from "@/lib/get-scholar-by-id";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UploadDocs from "./docs-upload";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function InterceptManageScholarshipClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const [isApply, setIsApply] = useState(apply || false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useScholarshipUserById(id);
  const title = data?.scholarshipTitle || "N/A";
  const deadline = data?.scholarshipDealine;
  const formatted = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  const provider = data?.scholarshipProvider || "unknown";
  const amount = data?.scholarshipAmount || "N/A";
  const description = data?.scholarshipDescription || "N/A";
  const scholarshipCover = data?.scholarshipCover;
  const scholarshipLogo = data?.scholarshipLogo;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="lg:w-[900px] w-[98%] mx-auto h-[95vh] outline-0 border-0 ">
        <DrawerHeader className={isApply ? "" : "sr-only"}>
          <DrawerTitle className="text-2xl flex gap-1.5 items-center">
            <FilePlus2 />
            Apply for {title}
          </DrawerTitle>
          <DrawerDescription>
            {" "}
            Complete your application by uploading the required documents below.
          </DrawerDescription>
        </DrawerHeader>

        <div className=" overflow-auto h-full no-scrollbar">
          {isApply ? (
            data && <UploadDocs data={data} setIsApply={setIsApply} />
          ) : (
            <>
              <div className="relative h-48 md:h-64 flex justify-center items-center">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <div className="relative h-full w-full flex justify-center items-center overflow-hidden ">
                    <Link
                      href={`${scholarshipCover}`}
                      target="_blank"
                      scroll={false}
                      rel="noopener noreferrer"
                    >
                      <Button className="absolute z-10 cursor-pointer bottom-5 right-5">
                        View
                        <Maximize />
                      </Button>
                    </Link>
                    <img
                      src={scholarshipCover}
                      alt="Scholarship Cover"
                      className="w-full h-full object-cover mask-gradient brightness-75 "
                    />
                  </div>
                )}

                <div className="absolute flex items-end gap-3 -bottom-10 left-4">
                  <div className="lg:size-35 size-25 rounded-full overflow-hidden border-3 border-background bg-background">
                    {loading ? (
                      <Skeleton className="h-full w-full" />
                    ) : (
                      <img
                        src={scholarshipLogo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl  text-white mb-1 font-bold">
                      {title}
                    </h1>
                    <p className="text-white/90 flex items-center gap-1">
                      by {provider}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:px-6 px-2 pt-16 pb-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <PhilippinePeso className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Amount</h1>
                    </div>
                    <span className="text-3xl font-semibold text-green-700 ">
                      {loading ? (
                        <Ring size={30} speed={2} bgOpacity={0} color="green" />
                      ) : (
                        amount
                      )}
                    </span>
                  </div>
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <CalendarClock className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Deadline</h1>
                    </div>
                    <span className="text-xl font-semibold text-green-700">
                      {loading ? (
                        <Ring size={30} speed={2} bgOpacity={0} color="green" />
                      ) : (
                        formatted
                      )}
                    </span>
                  </div>{" "}
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <Files className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Required Docs</h1>
                    </div>
                    <span className="text-3xl font-semibold text-green-700">
                      {loading ? (
                        <Ring size={30} speed={2} bgOpacity={0} color="green" />
                      ) : (
                        data?.scholarshipDocuments.length || "N/A"
                      )}
                    </span>
                  </div>
                </div>

                {/* <div className="flex bg-card gap-3 items-center rounded-md border">
                  <div className="flex-1 flex justify-between items-end p-4">
                    <div>
                      <PhilippinePeso className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300" />
                      <h1>Amount</h1>
                    </div>
                    <p className="text-3xl font-semibold text-green-700">
                      {amount}
                    </p>
                  </div>
                  <div className="border h-17"></div>
                  <div className="flex-1 flex justify-between items-end p-4">
                    <div>
                      <CalendarClock className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300 " />
                      <h1>Deadlne</h1>
                    </div>
                    <p className="text-xl font-semibold text-green-700">
                      {formatted}
                    </p>
                  </div>
                  <div className="border h-17"></div>
                  <div className="flex-1 flex justify-between items-end p-4">
                    <div>
                      <CalendarClock className="border p-2 rounded-sm h-8 w-8 bg-background text-gray-300" />
                      <h1>Required Docs</h1>
                    </div>
                    <p className="text-3xl font-semibold text-green-700">
                      {data?.scholarshipDocuments.length}
                    </p>
                  </div>
                </div> */}

                <Separator />

                {/* Description */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    About this Scholarship
                  </h2>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-7 w-full" />
                      <Skeleton className="h-7 w-full" />
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                {/* Required Documents */}
                {data?.scholarshipDocuments &&
                  data.scholarshipDocuments.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold">
                        Required Documents
                      </h2>
                      <div className="grid gap-2">
                        {data?.scholarshipDocuments.map((docs) => (
                          <div
                            key={docs.label}
                            className="flex border justify-between border-l-4 border-l-green-800 items-center p-4 gap-5 rounded-sm bg-card"
                          >
                            <h1>Document: {docs.label}</h1>

                            <p>
                              Format:{" "}
                              {docs.formats.map((format) => format).join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className="bg-green-800 text-gray-300">Active</Badge>
                </div>
              </div>
            </>
          )}
        </div>

        {!isApply && (
          <DrawerFooter>
            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => setIsApply(true)}
                disabled={loading}
              >
                <FileInput />
                Apply Scholarship
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => HandleCloseDrawer(false)}
                disabled={loading}
              >
                <X />
                Back
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
