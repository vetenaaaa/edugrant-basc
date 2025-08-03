"use client";
import {
  Calendar,
  FileInput,
  GraduationCap,
  Maximize,
  PhilippinePeso,
  PiggyBank,
  StickyNote,
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
import { format } from "date-fns";
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
          <DrawerTitle className="text-xl flex gap-1.5 items-center">
            <GraduationCap />
            Apply Scholarship
          </DrawerTitle>
          <DrawerDescription>
            {" "}
            Complete your application by uploading the required documents below.
          </DrawerDescription>
        </DrawerHeader>

        <div className=" overflow-auto h-full no-scrollbar">
          {isApply ? (
            loading ? (
              <div className="relative flex flex-col h-full w-full ">
                <div className="flex-1 flex justify-center items-center">
                  <Ring size={40} speed={2} bgOpacity={0} color="green" />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex w-full items-center gap-3 ">
                    <Skeleton className="h-2 flex-1" />
                    <Skeleton className="h-2 w-6" />
                  </div>
                  <div className="flex w-full items-center gap-3 ">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </div>
              </div>
            ) : (
              data && <UploadDocs data={data} setIsApply={setIsApply} />
            )
          ) : (
            <>
              <div className="relative h-64 flex justify-center items-center">
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
                      <Button className="absolute z-10 cursor-pointer bottom-5 right-5 bg-green-950 border border-green-950 hover:bg-green-900 text-gray-200 hover:border-green-800">
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

                <div className="absolute flex items-center justify-center left-5 -bottom-10 gap-3 flex-col">
                  <div className="lg:size-35 size-30 rounded-full overflow-hidden border-3 border-green-950 bg-background">
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
                </div>
              </div>

              <div className="lg:px-6 px-2 pt-15 pb-6 space-y-6">
                {/* Description */}

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                  <div className="col-span-2 space-y-4">
                    <div>
                      <h1 className="text-xl md:text-2xl  text-gray-200 mb-1 font-bold">
                        {title}
                      </h1>
                      <p className="text-gray-200/90 gap-1">{provider}</p>
                    </div>
                    <div>
                      <h2 className="line-clamp-3">{description}</h2>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="">
                      <h2 className="text-muted-foreground text-sm">Amount</h2>

                      <p className="text-xl font-semibold">₱{amount}</p>
                    </div>
                    <div className="">
                      <h2 className="text-muted-foreground text-sm">
                        Deadline
                      </h2>

                      <p className="text-xl font-semibold">
                        {deadline && format(deadline, "PPP")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Required Documents */}
                {data?.scholarshipDocuments &&
                  data.scholarshipDocuments.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-muted-foreground text-sm">
                        {" "}
                        Required Documents
                      </h2>
                      <div className="grid gap-2">
                        {data?.scholarshipDocuments.map((docs, index) => (
                          <div
                            key={docs.label}
                            className="flex border justify-between  items-center p-4 gap-5 rounded-md bg-background"
                          >
                            <h1>
                              {index + 1}. {docs.label}
                            </h1>

                            <div className="space-x-2">
                              <Badge className="bg-green-800 text-gray-200">
                                PDF
                              </Badge>
                              <Badge className="bg-green-800 text-gray-200">
                                JPG
                              </Badge>
                              <Badge className="bg-green-800 text-gray-200">
                                DOCX
                              </Badge>
                            </div>
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
                className="flex-1 bg-green-950 border border-green-950 hover:bg-green-800 text-gray-200 hover:border-green-800"
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
