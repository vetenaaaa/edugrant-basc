"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import { usePathname } from "next/navigation";
import { UserCog2 } from "lucide-react";
import morty from "@/assets/image.png";
import DynamicHeader from "./dynamic-header";
import { useEffect, useState } from "react";
import SummaryClient from "./summary";
import TabsClient from "./tabs";
export default function ClientDashboard() {
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
    <div className="pl-1 pr-2 your-class min-h-screen">
      <DynamicHeader first={segmentedPath[2]} />
      <div className=" grid grid-cols-3  gap-5 px-5 mt-5">
        <div className="col-span-2 space-y-3">
          <div className="flex justify-between py-10">
            <div className="flex gap-5">
              <img
                className="h-15 w-15 aspect-square object-cover rounded-full"
                src={morty.src || "/placeholder.svg"}
                alt=""
              />
              <div>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-400 to-teal-500 bg-clip-text text-transparent">
                  Hello, Jerome Tecson...
                </h1>
                <p className="text-muted-foreground text-sm">{date}</p>
              </div>
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
        <div className="bg-background/40"></div>
        <div className=" col-span-2 pt-5">
          <TabsClient />
        </div>
        <div className="bg-background/40"></div>
      </div>
    </div>
  );
}
