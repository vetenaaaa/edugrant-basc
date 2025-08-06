"use client";
import { usePathname } from "next/navigation";

import DynamicHeader from "../dynamic-header";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileStack, Clock, CheckCircle2, XCircle } from "lucide-react";

const items = [
  {
    label: "All Applications",
    value: "all",
    icon: (
      <FileStack
        className="-ms-0.5 me-1.5 opacity-60"
        size={16}
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Pending",
    value: "pending",
    icon: (
      <Clock
        className="-ms-0.5 me-1.5 opacity-60"
        size={16}
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Approved",
    value: "approved",
    icon: (
      <CheckCircle2
        className="-ms-0.5 me-1.5 opacity-60"
        size={16}
        aria-hidden="true"
      />
    ),
  },
  {
    label: "Rejected",
    value: "rejected",
    icon: (
      <XCircle
        className="-ms-0.5 me-1.5 opacity-60"
        size={16}
        aria-hidden="true"
      />
    ),
  },
];
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineItem,
} from "@/components/ui/timeline";

const ites = [
  {
    id: 1,
    date: new Date("2024-01-09T10:55:00"),
    description: "System backup completed successfully.",
  },
  {
    id: 2,
    date: new Date("2024-01-09T10:50:00"),
    description:
      "User authentication service restarted due to configuration update.",
  },
  {
    id: 3,
    date: new Date("2024-01-09T10:45:00"),
    description: "Warning: High CPU usage detected on worker node-03.",
  },
  {
    id: 4,
    date: new Date("2024-01-09T10:40:00"),
    description: "New deployment initiated for api-service v2.1.0.",
  },
];

export default function ClientApplication() {
  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="px-4 min-h-screen">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />
      <div className="mx-auto w-[95%] pt-10 space-y-3">
        <Tabs defaultValue={items[0].value}>
          <ScrollArea>
            <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
              {items.map((meow) => (
                <TabsTrigger
                  key={meow.label}
                  value={meow.value}
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {meow.icon}
                  {meow.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="all" className="">
            <Timeline className="divide-y rounded-lg border">
              {ites.map((item) => (
                <TimelineItem
                  key={item.id}
                  step={item.id}
                  className="m-0! px-4! py-3!"
                >
                  <TimelineContent className="text-foreground">
                    {item.description}
                    <TimelineDate className="mt-1">
                      {item.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {item.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TimelineDate>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground pt-1 text-center text-xs">
              Content for Tab 2
            </p>
          </TabsContent>
          <TabsContent value="tab-3">
            <p className="text-muted-foreground pt-1 text-center text-xs">
              Content for Tab 3
            </p>
          </TabsContent>
          <TabsContent value="tab-4">
            <p className="text-muted-foreground pt-1 text-center text-xs">
              Content for Tab 4
            </p>
          </TabsContent>
          <TabsContent value="tab-5">
            <p className="text-muted-foreground pt-1 text-center text-xs">
              Content for Tab 5
            </p>
          </TabsContent>
          <TabsContent value="tab-6">
            <p className="text-muted-foreground pt-1 text-center text-xs">
              Content for Tab 6
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
