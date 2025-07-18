"use client";
import { usePathname } from "next/navigation";

import DynamicHeader from "../dynamic-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClientProfile() {
  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="pl-1 pr-2 your-class min-h-screen">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />
      <div className="mx-auto lg:w-3/4 w-[95%] py-10 space-y-10">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="bg-black/40 size-25 rounded-full border-2 border-[var(--eclipse)]"></div>
          <p className="text-lg  mt-1">2022000493</p>
          <h1 className="text-3xl font-semibold">Jerome Laguyo Tecson</h1>
          <p className="text-sm text-gray-500 mt-1">jerometecsonn.gmail.com</p>
        </div>
        <div className="grid grid-cols-2 w-3/4 mx-auto gap-x-3 gap-y-8">
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div>
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div className="col-span-2">
            <Label>Name</Label>
            <Input></Input>
          </div>
          <div className="col-span-2">
            <Button className="w-full">Edit Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
