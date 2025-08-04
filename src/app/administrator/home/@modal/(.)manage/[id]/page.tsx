"use client";
import {
  Activity,

  Edit,
  LoaderCircleIcon,
  Maximize,

  Trash2,

} from "lucide-react";

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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditScholarship from "./edit-form";
import { useScholarshipStore } from "@/store/scholarshipStore";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import useScholarshipUserByIdAdmin from "@/hooks/admin/getScholarshipData";
import { format } from "date-fns";

export default function InterceptManageScholarship() {
  const [editMode, setEditMode] = useState(false);
  const { triggerRefresh, markScholarshipDeleted } = useScholarshipStore();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const { data, loading } = useScholarshipUserByIdAdmin(id);

  const title = data?.scholarshipTitle || "N/A";
  const deadline = data?.scholarshipDealine;
  const provider = data?.scholarshipProvider || "unknown";
  const description = data?.scholarshipDescription;
   const amount = data?.scholarshipAmount;
  const scholarshipId = data?.scholarshipId;
  const scholarshipCover = data?.scholarshipCover;
  const scholarshipLogo = data?.scholarshipLogo;
  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      router.back();
    }
  };

  const onSubmit = async () => {
    try {
      setDeleteLoading(true);

      const res = await axios.post(
        "https://edugrant-express-server-production.up.railway.app/administrator/deleteScholarship",
        { scholarshipId }, 
        { withCredentials: true }
      );

      if (res.status === 200) {
        console.log("Scholarship deleted successfully!");
        toast("Scholarship has been deleted", {
          description:
            "The scholarship opportunity has been successfully deleted to the system.",
        });
        if (scholarshipId) {
          markScholarshipDeleted(scholarshipId);
          triggerRefresh();
        }
        setDeleteLoading(false);
        setOpenAlert(false);
        setOpen(false);
        router.back();
      }
    } catch (error) {
      console.error(error);
      setDeleteLoading(false);
      setOpenAlert(false);
      setOpen(false);
      router.back();
    }
  };
  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        HandleCloseDrawer(value);
      }}
    >
      <DrawerContent className="w-[900px] mx-auto h-[95vh] outline-0 border-0">
        <DrawerHeader className={editMode ? "" : "sr-only"}>
          <DrawerTitle className="text-2xl">Edit Mode</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {editMode ? (
          <div className=" overflow-auto h-full no-scrollbar">
            {data && <EditScholarship data={data} setEditMode={setEditMode} />}
          </div>
        ) : (
          <div className=" overflow-auto h-full no-scrollbar">
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
          </div>
        )}
        {!editMode && (
          <div className="p-4">
            <div className="flex gap-3">
              <Button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-blue-800 text-white hover:bg-blue-700"
                disabled={loading}
              >
                <Edit /> Edit
              </Button>

              <Button
                className="flex-1"
                variant="destructive"
                onClick={() => setOpenAlert(true)}
                disabled={loading}
              >
                <Trash2 /> Delete
              </Button>
              <Button className="flex-1" variant="outline" disabled={loading}>
                <Activity /> Generate Report
              </Button>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleteLoading}>
                    Cancel
                  </AlertDialogCancel>
                  <Button onClick={onSubmit} disabled={deleteLoading}>
                    {deleteLoading && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}{" "}
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
