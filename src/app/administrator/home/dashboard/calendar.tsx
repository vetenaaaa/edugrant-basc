import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function CalendarDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Card className="bg-background/40 h-full w-full">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-md bg-transparent flex justify-center items-center"
          captionLayout="dropdown"
        />
      </CardContent>
    </Card>
  );
}
