"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useScholarshipData from "@/lib/scholarship-data";
export default function InterceptManageScholarship() {
  const { data, loading } = useScholarshipData();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id;

  const selected = data.find((meow) => meow.scholarshipId == id);

  console.log(selected);

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          router.back();
        }
      }}
    >
      <DrawerContent className="w-3/4 mx-auto">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{selected?.scholarshipTitle}</div>
        <DrawerFooter>
          <div className="flex gap-4">
            <Button className="flex-1">Edit</Button>
            <Button className="flex-1" variant="destructive">Delete</Button>
            <Button className="flex-1" variant="outline">
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
