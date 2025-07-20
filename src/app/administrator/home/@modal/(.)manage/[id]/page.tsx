"use client";
import {

  CheckCheck,

  PhilippinePeso,

  Users2,
} from "lucide-react";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,

  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";


import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useScholarshipData from "@/lib/scholarship-data";

import { useState } from "react";

import EditScholarship from "./edit-form";

export default function InterceptManageScholarship() {
  const { data } = useScholarshipData({
    currentPage: 1,
    rowsPerPage: 100,
    sort: "",
  });
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id;
  const selected = data.find((meow) => meow.scholarshipId == id);
  console.log(selected);

  const HandleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
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
      <DrawerContent className="w-[900px] mx-auto h-[95vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className=" overflow-auto pt-3 h-full">
          <Tabs defaultValue="tab-1">
            <TabsList className="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
              <TabsTrigger
                value="tab-1"
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                Edit / Delete
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >
                Report
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <div className="relative h-48 md:h-64 ">
                <img
                  src={selected?.scholarshipCover}
                  alt="Scholarship Cover"
                  className="w-full h-full object-cover mask-gradient"
                />
                <div className="absolute flex items-end gap-3 -bottom-10 left-4 right-4">
                  <div className="size-35 rounded-full overflow-hidden border-2 border-white">
                    <img
                      src={selected?.scholarshipLogo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {selected?.scholarshipTitle}
                    </h1>
                    <p className="text-white/90 flex items-center gap-1">
                      by {selected?.scholarshipProvider}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-16 space-y-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="border p-5 rounded-sm flex items-end">
                    <div className="flex-1 space-y-2">
                      <Users2 />
                      <h1 className="text-sm">Total Application</h1>
                    </div>
                    <p className="text-4xl font-semibold">0</p>
                  </div>
                  <div className="border p-5 rounded-sm flex items-end">
                    <div className="flex-1 space-y-2">
                      <CheckCheck />
                      <h1 className="text-sm">Total Approved</h1>
                    </div>
                    <p className="text-4xl font-semibold">0</p>
                  </div>{" "}
                  <div className="border p-5 rounded-sm flex items-end">
                    <div className="flex-1 space-y-2">
                      <PhilippinePeso />
                      <h1 className="text-sm">Amount</h1>
                    </div>
                    <p className="text-4xl font-semibold">3000</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h1 className="pl-3  border-l-2 border-amber-400">Details</h1>
                  <p>{selected?.scholarshipDescription}</p>
                </div>

                <div className="space-y-3">
                  <h1 className="font-semibold pl-3  border-l-2 border-amber-400">
                    Required Documents ({selected?.scholarshipDocuments.length})
                  </h1>
                  {selected?.scholarshipDocuments.map((docs) => (
                    <div
                      key={docs.label}
                      className="flex border justify-between items-center p-4 gap-5 rounded-sm"
                    >
                      <h1>{docs.label}</h1>

                      <p>{docs.formats.map((format) => format).join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab-2">
             <EditScholarship data={selected}/>
            </TabsContent>
            <TabsContent value="tab-3">
              <p className="text-muted-foreground p-4 text-center text-xs">
                Content for Tab 3
              </p>
            </TabsContent>
          </Tabs>
        </div>

     
      </DrawerContent>
    </Drawer>
  );
}


   {
     /* <DrawerFooter>
          <div className="flex gap-4">
            <Button className="flex-1" variant="secondary">
              <Edit /> Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1" variant="destructive">
                  <Trash2 /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => HandleCloseDrawer(false)}
            >
              <X /> Close
            </Button>
          </div>
        </DrawerFooter> */
   }