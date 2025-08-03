"use client";

import ApplicationSummary from "./summary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";
import DynamicHeaderAdmin from "./dynamic-header";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
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
  {
    id: 3,
    title: "New Document Upload Feature",
    description:
      "You can now upload additional supporting documents through your dashboard.",
    date: "Dec 10, 2024",
    priority: "medium",
  },
];

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="pl-1 pr-2 min-h-screen z-10">
      <DynamicHeaderAdmin first="Home" />

      <div className=" grid grid-cols-3  gap-5 px-5  py-5 mt-3 ">
        <div className="col-span-2 grid gap-5">
          <ApplicationSummary />
          <div className=" space-y-2 p-4 bg-background/40 rounded-md">
            <h1>Announcements</h1>
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
            <Button className="w-full" variant="link">
              See all
            </Button>
          </div>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className=" space-y-2 p-4 bg-background/40 rounded-md">
                <h1>Announcements</h1>
                <Timeline className="divide-y rounded-lg border">
                  {announcements.map((item) => (
                    <TimelineItem
                      key={item.id}
                      step={item.id}
                      className="m-0! px-4! py-3!"
                    >
                      <TimelineContent className="text-foreground">
                        {item.description}
                        <TimelineDate className="mt-1">
                          {item.date}
                        </TimelineDate>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
                <Button className="w-full" variant="link">
                  See all
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-3">
          <div className="aspect-video bg-background/40 border rounded-md"></div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm w-full bg-background/40"
            captionLayout="dropdown"
          />
        </div>
      </div>
    </div>
  );
}
