"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import { usePathname } from "next/navigation";
import { UserCog2 } from "lucide-react";
import DynamicHeader from "./dynamic-header";
import { useEffect, useState } from "react";
import SummaryClient from "./summary";
import TabsClient from "./tabs";
import { useUserStore } from "@/store/useUserStore";
export default function ClientDashboard() {
  const { user } = useUserStore();
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const day = now.getDate();
      const suffix =
        day >= 11 && day <= 13
          ? "th"
          : day % 10 === 1
          ? "st"
          : day % 10 === 2
          ? "nd"
          : day % 10 === 3
          ? "rd"
          : "th";

      const formatted = now
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(/\b\d{1,2}\b/, `${day}${suffix}`);

      setDate(formatted);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="px-4   min-h-screen your-class">
      <DynamicHeader first={segmentedPath[2]} />
      <div className=" grid grid-cols-3  gap-4  mt-6 ">
        <div className="col-span-2 space-y-3">
          <div className="flex justify-between bg-background/40 p-4 rounded-md border">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-400 to-teal-500 bg-clip-text text-transparent  ">
                Hello, Jerome.
              </h1>
              <p className="text-muted-foreground text-sm">{date}</p>
            </div>

            <span className="flex gap-3">
              <Button variant="outline">
                <UserCog2 />
                Edit profile
              </Button>
            </span>
          </div>
          <SummaryClient />
        </div>
        <div className="bg-background/40 rounded-md border"></div>
        <div className=" col-span-2">
          <TabsClient />
        </div>
        <div className="bg-background/40 rounded-md border"></div>
      </div>
    </div>
  );
}
