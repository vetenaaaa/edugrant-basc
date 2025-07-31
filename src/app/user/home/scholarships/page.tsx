"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "../dynamic-header";
import {
  parseISO,
  isPast,
  differenceInDays,
  formatDistanceToNowStrict,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PhilippinePeso, Share2, TextSearch } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import useScholarshipUserData from "@/lib/client-scholarship";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const path = usePathname();
  const segmentedPath = path.split("/");
  const { data, loading } = useScholarshipUserData({
    currentPage,
    rowsPerPage,
    sort,
  });
  console.log(data, loading);
  const getDeadlineInfo = (deadline: string) => {
    const date = parseISO(deadline);

    if (isPast(date))
      return { label: "Expired", className: "bg-red-800 text-white" };

    const daysLeft = differenceInDays(date, new Date());
    const label = `${formatDistanceToNowStrict(date)} left`;

    const className =
      daysLeft <= 2 ? "bg-red-800 text-white" : "bg-green-800 text-gray-200";

    return { label, className };
  };
  return (
    <div className=" min-h-screen background px-4 ">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />

      <div className="mx-auto w-[95%] pt-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-semibold flex gap-2 items-center">
              <TextSearch /> Available Scholarships
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Discover scholarship opportunities. Browse, filter, and apply for
              financial aid that supports your education..
            </p>
          </div>
          <Select onValueChange={(value) => setSort(value as "asc" | "desc")}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by Title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Title A-Z</SelectItem>
              <SelectItem value="desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className=" py-10 grid lg:grid-cols-4 grid-cols-2 gap-3">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="p-2 dark:bg-black/50 relative rounded-md border"
                >
                  <Skeleton className=" aspect-video" />

                  <div className="w-full  bottom-0 left-0 px-2 py-4 space-y-2">
                    <Skeleton className="h-8.5 w-full" />
                    <div className=" flex gap-2">
                      <Skeleton className="h-8.5 flex-1" />
                      <Skeleton className="h-8.5 w-9" />
                    </div>
                  </div>
                </div>
              ))
            : data.map((scholarship) => (
                <Link
                  href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                  key={scholarship.scholarshipId}
                  className="rounded-lg border border-green-950 dark:bg-black/50 shadow-sm  overflow-hidden h-full  relative p-2"
                  prefetch
                  scroll={false}
                >
                  <img
                    src={scholarship.scholarshipLogo}
                    alt=""
                    className=" w-full object-cover rounded-md mask-gradient-bottom bg-background mb-27 aspect-video dark:brightness-80"
                  />
                  <div className=" absolute bottom-0 w-full left-0 px-2 py-4 space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <h1 className="font-bold text-lg">
                          {scholarship.scholarshipTitle}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                          by {scholarship.scholarshipProvider}
                        </p>
                      </div>
                      {/* <h1 className="flex  text-lg items-center">
                        <PhilippinePeso size={15} />{" "}
                        {scholarship.scholarshipAmount}
                      </h1> */}
                      <Badge
                        className={`${
                          getDeadlineInfo(scholarship.scholarshipDealine)
                            .className
                        }`}
                      >
                        {getDeadlineInfo(scholarship.scholarshipDealine).label}
                      </Badge>
                    </div>

                    <div className="flex gap-2 items-center px-2">
                      <div className="flex-1">
                        <div className="flex gap-1 text-sm">
                          <h1 className="flex  text font-semibold items-center ">
                            <PhilippinePeso size={15} strokeWidth={3} />{" "}
                            {scholarship.scholarshipAmount}
                          </h1>
                          per semester
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Share2 />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
