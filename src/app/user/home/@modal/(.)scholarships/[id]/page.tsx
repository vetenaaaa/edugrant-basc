"use client";
import {

  CalendarX2,

  FileInput,
  GraduationCap,
 
  Wallet,
  X,
} from "lucide-react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,

  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useScholarshipUserById from "@/hooks/user/getScholarshipData";
import { Badge } from "@/components/ui/badge";
import UploadDocs from "./docs-upload";
import { useSearchParams } from "next/navigation";
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
              <div className=" relative flex flex-col justify-center items-center w-full">
                <img
                  src={scholarshipCover}
                  alt=""
                  className=" object-cover brightness-90 mask-gradient h-50 w-full mb-10"
                />
                <div className="absolute -bottom-8 flex flex-col justify-center items-center gap-2">
                  <img
                    src={scholarshipLogo}
                    alt=""
                    className=" rounded-full shadow-sm shadow-black border-background size-30 object-cover"
                  />
                  <div className="text-center">
                    <h1 className="text-xl zxczxc tracking-[-3px] font-semibold">
                      {title}
                    </h1>
                    <h3 className="text-sm text-muted-foreground">
                      {provider}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="mt-13 p-2 space-y-8">
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-2.5">
                  <div className="border lg:p-4 p-2.5 rounded bg-card flex justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">Amount</h1>
                      <Wallet />
                    </div>
                    <p className="line-clamp-4 text-2xl text-blue-700 font-semibold">
                      ₱{amount}
                    </p>
                  </div>
                  <div className="border lg:p-4 p-2.5 rounded bg-card flex justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">
                        Deadline
                      </h1>
                      <CalendarX2 />
                    </div>
                    <p className="line-clamp-4 text-2xl text-blue-700 font-semibold">
                      {deadline && format(deadline, "MM-dd-yyy")}
                    </p>
                  </div>{" "}
                  <div className="border lg:p-4 p-2.5 rounded bg-card  lg:flex hidden justify-between items-end">
                    <div className="space-y-3">
                      <h1 className="text-xs text-muted-foreground">
                        Deadline
                      </h1>
                      <CalendarX2 />
                    </div>
                    <p className="line-clamp-4 text-2xl text-blue-700 font-semibold">
                      {deadline && format(deadline, "MM-dd-yyy")}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-4">{description}</p>
                <div>
                  <h1 className="text-sm text-muted-foreground">
                    Required Documents
                  </h1>
                  <div className="space-y-2 mt-2">
                    {data?.scholarshipDocuments.map((meow) => (
                      <div
                        className="p-2.5 border bg-card rounded-sm flex justify-between items-center"
                        key={meow.label}
                      >
                        <div>{meow.label}</div>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-800 text-gray-200">
                            PDF
                          </Badge>
                          <Badge className="bg-blue-800 text-gray-200">
                            DOCX
                          </Badge>
                          <Badge className="bg-blue-800 text-gray-200">
                            JPG
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {!isApply && (
          <div className="p-2">
            <div className="flex gap-2">
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
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
