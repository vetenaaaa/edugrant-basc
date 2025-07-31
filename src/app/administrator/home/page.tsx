"use client";
import ChartPieDonutText from "./dashboard/pie";
import { ChartBarMultiple } from "./dashboard/bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ApplicationSummary from "./dashboard/summary";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  
  Megaphone,
  SquarePen,
} from "lucide-react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";
import { useEffect, useState } from "react";
import DynamicHeaderAdmin from "./dynamic-header";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "New Document Upload Feature",
    description:
      "You can now upload additional supporting documents through your dashboard.",
    date: "Dec 10, 2024",
    priority: "medium",
  },
];

export default function AdminDashboard() {
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

  return (
    <div className="pl-1 pr-2 min-h-screen">
      <DynamicHeaderAdmin first="Home" />

      <div className=" grid grid-cols-3  gap-5 px-5 ">
        <div className=" flex justify-between items-start py-10 col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Hello Admin </h1>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <SquarePen /> Post a scholarship
            </Button>
            <Button variant="outline" className="flex-1">
              <Activity /> Generate Report
            </Button>
          </div>
        </div>
        <>1</>

        <div className="col-span-2 grid gap-5">
          <ApplicationSummary />
          <div className="grid grid-cols-2 gap-5">
            <ChartBarMultiple />
            <ChartPieDonutText />
          </div>
          <Card className="bg-background/40 flex-1 ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Announcements
              </CardTitle>
              <CardDescription>Keep on latest update</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 ">
              <Timeline className="divide-y rounded-lg border">
                {announcements.map((item) => (
                  <TimelineItem
                    key={item.id}
                    step={item.id}
                    className="m-0! px-4! py-3!"
                  >
                    <TimelineContent className="text-foreground">
                      {item.description}
                      <TimelineDate className="mt-1">{item.date}</TimelineDate>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
            <CardFooter>
              <Button className="w-full " size="sm" variant="outline">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
