"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, UserCog2 } from "lucide-react";
import DynamicHeader from "./dynamic-header";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import SummaryClient from "./summary";
import TabsClient from "./tabs";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@/components/ui/separator";
export default function ClientDashboard() {
  const { user } = useUserStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="px-4   min-h-screen your-class">
      <DynamicHeader first={segmentedPath[2]} />
      <div className="flex gap-5 py-10">
        <div className="flex-1">
          <SummaryClient />
        </div>
        <div className="space-y-3">
          <div className="border p-4 space-y-3">
            <h1>Quick Action</h1>
            <div className="space-x-3">
              <Button>Find Scholarship</Button>
              <Button>Track Application</Button>
            </div>
          </div>
          <div className="flex items-center justify-center bg-background/40 rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md  p-4 "
              classNames={{
                month_caption: "ms-2.5 me-20 justify-start",
                nav: "justify-end",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
