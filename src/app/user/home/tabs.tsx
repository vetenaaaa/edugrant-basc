import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Submitted",
    description: "Initial team meeting.",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "Under Review",
    description: "Completed wireframes.",
  },
  {
    id: 3,
    date: "Apr 5, 2024",
    title: "Approve/Declined",
    description: "Approved",
  },
  {
    id: 4,
    date: "Apr 19, 2024",
    title: "Missing Requirements",
    description: "Your COR is expired",
  },
];
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { ArrowRight, Home, Megaphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TabsClient() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList className="bg-card mb-1 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse w-full">
        <TabsTrigger
          value="tab-1"
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-muted  relative overflow-hidden border py-2 rounded flex-1"
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
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-muted  relative overflow-hidden border py-2 rounded flex-1"
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
          className="data-[state=active]:bg-muted dark:data-[state=active]:bg-muted  relative overflow-hidden border py-2 rounded flex-1"
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
        <Card className="bg-card flex-1">
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
      </TabsContent>

      <TabsContent value="tab-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Your latest scholarship applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">
                    Academic Excellence Scholarship
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Merit-based scholarship for outstanding academic performance
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">$7,500</Badge>
                    <span className="text-sm text-muted-foreground">
                      Due: March 15, 2025
                    </span>
                  </div>
                </div>
                <Button size="sm">Apply Now</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">STEM Innovation Grant</h3>
                  <p className="text-sm text-muted-foreground">
                    For students pursuing Science, Technology, Engineering, or
                    Mathematics
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">$5,000</Badge>
                    <span className="text-sm text-muted-foreground">
                      Due: April 1, 2025
                    </span>
                  </div>
                </div>
                <Button size="sm">Apply Now</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View More
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="tab-3">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Track Applications</CardTitle>
            <CardDescription>
              Monitor the progress of your scholarship applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">
                    Academic Excellence Scholarship
                  </h3>
                  <Badge variant="outline">Under Review</Badge>
                </div>
                <Timeline defaultValue={3} orientation="horizontal">
                  {items.map((item) => (
                    <TimelineItem key={item.id} step={item.id}>
                      <TimelineHeader>
                        <TimelineSeparator />
                        <TimelineDate>{item.date}</TimelineDate>
                        <TimelineTitle>{item.title}</TimelineTitle>
                        <TimelineIndicator />
                      </TimelineHeader>
                      <TimelineContent>{item.description}</TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">STEM Innovation Grant</h3>
                  <Badge variant="outline">Submitted</Badge>
                </div>
                <Timeline defaultValue={3} orientation="horizontal">
                  {items.map((item) => (
                    <TimelineItem key={item.id} step={item.id}>
                      <TimelineHeader>
                        <TimelineSeparator />
                        <TimelineDate>{item.date}</TimelineDate>
                        <TimelineTitle>{item.title}</TimelineTitle>
                        <TimelineIndicator />
                      </TimelineHeader>
                      <TimelineContent>{item.description}</TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
