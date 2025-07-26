import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// const announcements = [
//   {
//     id: 1,
//     title: "Scholarship Application Deadline Extended",
//     description:
//       "The deadline for scholarship applications has been extended to June 30, 2025.",
//     date: "Dec 12, 2024",
//     priority: "high",
//   },
//   {
//     id: 2,
//     title: "New Document Upload Feature",
//     description:
//       "You can now upload additional supporting documents through your dashboard.",
//     date: "Dec 10, 2024",
//     priority: "medium",
//   },
// ];
// const items = [
//   {
//     id: 1,
//     date: "Mar 15, 2024",
//     title: "Submitted",
//     description: "Initial team meeting.",
//   },
//   {
//     id: 2,
//     date: "Mar 22, 2024",
//     title: "Under Review",
//     description: "Completed wireframes.",
//   },
//   {
//     id: 3,
//     date: "Apr 5, 2024",
//     title: "Approve/Declined",
//     description: "Approved",
//   },
//   {
//     id: 4,
//     date: "Apr 19, 2024",
//     title: "Missing Requirements",
//     description: "Your COR is expired",
//   },
// ];

import { Home, Megaphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TabsClient() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="bg-background/20 mb-1 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse w-full">
        <TabsTrigger
          value="tab-1"
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-card  relative overflow-hidden border py-2 rounded-sm flex-1"
        >
          <Megaphone
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Announcements
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-muted  relative overflow-hidden border py-2 rounded-sm flex-1"
        >
          <Megaphone
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Recent Application
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-muted  relative overflow-hidden border py-2 rounded-sm flex-1"
        >
          <Home
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Track Application
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <Card className="bg-background/40 flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Announcements
            </CardTitle>
            <CardDescription>Keep on latest update</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 "></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="tab-2">
        <Card className="bg-background/40">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Your latest scholarship applications
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="tab-3">
        <Card className="bg-background/40">
          <CardHeader>
            <CardTitle>Track Applications</CardTitle>
            <CardDescription>
              Monitor the progress of your scholarship applications
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
