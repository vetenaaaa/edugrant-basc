"use client";
import {
  CalendarClock,
  FileInput,
  Files,
  PhilippinePeso,
  X,
} from "lucide-react";
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

export default function InterceptManageScholarshipClient() {
  const searchParams = useSearchParams();
  const apply = searchParams.get("apply");
  const [isApply, setIsApply] = useState(apply || false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useScholarshipUserById(id);
  const title = data?.scholarshipTitle;
  const deadline = data?.scholarshipDealine;
  const formatted = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline available";
  const provider = data?.scholarshipProvider;
  const amount = data?.scholarshipAmount;
  const description = data?.scholarshipDescription;
  const scholarshipId = data?.scholarshipId;
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
      <DrawerContent className="w-[900px] mx-auto h-[95vh] outline-0 border-0 ">
        <DrawerHeader className="sr-only ">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <div className=" overflow-auto h-full no-scrollbar">
          {isApply ? (
            data && <UploadDocs data={data} setIsApply={setIsApply} />
          ) : (
            <>
              <div className="relative h-48 md:h-64 flex justify-center items-center pointer-events-none">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <img
                    src={scholarshipCover}
                    alt="Scholarship Cover"
                    className="w-full h-full object-cover mask-gradient brightness-75"
                  />
                )}

                <div className="absolute flex items-end gap-3 -bottom-10 left-4">
                  <div className="size-35 rounded-full overflow-hidden border-3 border-background bg-background">
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
              <div className="px-6 pt-16 pb-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <PhilippinePeso className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Amount</h1>
                    </div>
                    <p className="text-2xl font-semibold text-green-700 tracking-wide">
                      {amount}
                    </p>
                  </div>
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <CalendarClock className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Deadline</h1>
                    </div>
                    <p className="text-xl font-semibold text-green-700">
                      {formatted}
                    </p>
                  </div>{" "}
                  <div className="border p-3 rounded-md flex items-end bg-card">
                    <div className="flex-1 space-y-2">
                      <Files className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                      <h1 className="text-sm text-gray-300">Required Docs</h1>
                    </div>
                    <p className="text-4xl font-semibold text-green-700">
                      {data?.scholarshipDocuments.length}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    About this Scholarship
                  </h2>
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
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
                  <Badge>Active</Badge>
                </div>
              </div>
            </>
          )}
        </div>

        {scholarshipId && !isApply && (
          <DrawerFooter>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setIsApply(true)}>
                <FileInput />
                Apply Scholarship
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() => HandleCloseDrawer(false)}
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
