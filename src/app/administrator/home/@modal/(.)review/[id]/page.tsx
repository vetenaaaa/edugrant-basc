"use client";

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
import { Badge } from "@/components/ui/badge";

export default function InterceptReviewApplicants() {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id as string;

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
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Jerome Laguyo Tecson</DrawerTitle>
          <DrawerDescription>2022000493</DrawerDescription>
          <div className="flex gap-2">
            <Badge>BSIT</Badge>
            <Badge>4th Year</Badge>
            <Badge>Section C</Badge>
          </div>
        </DrawerHeader>
        <div className="overflow-auto">
          <div className="grid grid-cols-2 p-4 gap-4">
            <div className="aspect-[16/9] border"></div>
            <div className="aspect-[16/9] border"></div>
            <div className="aspect-[16/9] border"></div>
            <div className="aspect-[16/9] border"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
