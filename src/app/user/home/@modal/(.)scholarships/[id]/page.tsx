"use client";
import {
  Activity,
  CheckCheck,
  Edit,
  LoaderCircleIcon,
  PhilippinePeso,
  Save,
  Trash2,
  Users2,
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
import useScholarshipData from "@/lib/scholarship-data";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useScholarshipStore } from "@/store/scholarshipStore";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";

export default function InterceptManageScholarship() {
  const [editMode, setEditMode] = useState(false);
  const { triggerRefresh, markScholarshipDeleted } = useScholarshipStore();
  const { data, loading } = useScholarshipData({
    currentPage: 1,
    rowsPerPage: 100,
    sort: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;
  const selected = data.find((meow) => meow.scholarshipId == id);
  const title = selected?.scholarshipTitle;
  const deadline = selected?.scholarshipDealine;
  const readable = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline set";

  const provider = selected?.scholarshipProvider;
  const description = selected?.scholarshipDescription;
  const scholarshipId = selected?.scholarshipId;
  const scholarshipCover = selected?.scholarshipCover;
  const scholarshipLogo = selected?.scholarshipLogo;
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
        `https://edugrant-express-server-production.up.railway.app/administrator/deleteScholarship`,
        {
          scholarshipId: scholarshipId,
        },
        {
          withCredentials: true,
        }
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
        <DrawerHeader className="sr-only ">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        {editMode ? (
          <div className=" overflow-auto h-full no-scrollbar"></div>
        ) : (
          <div className=" overflow-auto h-full no-scrollbar">
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

              <div className="absolute flex items-end gap-3 -bottom-10 right-4">
                Until {readable}
              </div>
            </div>
            <div className="p-4 mt-16 space-y-10">
              <div className="grid grid-cols-3 gap-3">
                <div className="border p-3 rounded-md flex items-end bg-card">
                  <div className="flex-1 space-y-2">
                    <Users2 className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                    <h1 className="text-sm text-gray-300">Total Application</h1>
                  </div>
                  <p className="text-4xl font-semibold text-blue-700">0</p>
                </div>
                <div className="border p-3 rounded-md flex items-end bg-card">
                  <div className="flex-1 space-y-2">
                    <CheckCheck className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                    <h1 className="text-sm text-gray-300">Total Approved</h1>
                  </div>
                  <p className="text-4xl font-semibold text-green-700">0</p>
                </div>{" "}
                <div className="border p-3 rounded-md flex items-end bg-card">
                  <div className="flex-1 space-y-2">
                    <PhilippinePeso className="border p-2 rounded-sm h-10 w-10 bg-background text-gray-300" />
                    <h1 className="text-sm text-gray-300">Amount</h1>
                  </div>
                  <p className="text-4xl font-semibold text-amber-500">3000</p>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="pl-3  border-l-2 border-amber-400">Details</h1>
                <p className="p-4 bg-card rounded-sm border">{description}</p>
              </div>

              <div className="space-y-3">
                <h1 className="font-semibold pl-3  border-l-2 border-amber-400">
                  Required Documents ({selected?.scholarshipDocuments.length})
                </h1>
                {selected?.scholarshipDocuments.map((docs) => (
                  <div
                    key={docs.label}
                    className="flex border justify-between items-center p-4 gap-5 rounded-sm bg-card"
                  >
                    <h1>{docs.label}</h1>

                    <p>{docs.formats.map((format) => format).join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {scholarshipId && (
          <DrawerFooter>
            <div className="flex gap-3">
              {editMode ? (
                <Button className="flex-1 bg-green-800 text-white hover:bg-green-700">
                  <Save /> Save
                </Button>
              ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  className="flex-1 bg-blue-800 text-white hover:bg-blue-700"
                >
                  <Edit /> Edit
                </Button>
              )}

              {!editMode ? (
                <>
                  <Button
                    className="flex-1"
                    variant="destructive"
                    onClick={() => setOpenAlert(true)}
                  >
                    <Trash2 /> Delete
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Activity /> Generate Report
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditMode(false)}
                  className="flex-1"
                  variant="outline"
                >
                  <X />
                  Cancel
                </Button>
              )}
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogTrigger asChild></AlertDialogTrigger>
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
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
