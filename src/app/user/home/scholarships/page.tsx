"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "../dynamic-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {  PhilippinePeso, Share2, TextSearch } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import useScholarshipUserData from "@/hooks/user/getScholarship";
import { useState } from "react";
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

        <div className=" py-10 grid lg:grid-cols-4 grid-cols-1 gap-3">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="p-2 bg-background/40 relative rounded-md border"
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
                  className="group rounded-lg border border-green-950 dark:bg-black/50 shadow-sm overflow-hidden h-full relative p-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/20 hover:border-green-800"
                  prefetch
                  scroll={false}
                >
                  <img
                    src={scholarship.scholarshipCover}
                    alt=""
                    className="w-full object-cover rounded-md mask-gradient-bottom bg-background mb-23 aspect-video dark:brightness-80 group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 w-full left-0 px-2 py-4 space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <div className="flex gap-2 items-end">
                        <img
                          src={scholarship.scholarshipLogo}
                          className="aspect-square w-[20%] object-cover rounded-2xl border group-hover:scale-110 transition-transform duration-300"
                          alt=""
                        />
                        <div className="">
                          <h1 className="font-bold text-lg line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
                            {scholarship.scholarshipTitle}
                          </h1>
                          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                            {scholarship.scholarshipProvider}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center px-2">
                      <div className="flex-1">
                        <div className="flex gap-1 text-sm">
                          <h1 className="flex text font-semibold items-center group-hover:text-green-600 transition-colors duration-300">
                            <PhilippinePeso
                              size={15}
                              strokeWidth={3}
                              className="group-hover:text-green-600 transition-colors duration-300"
                            />
                            {scholarship.scholarshipAmount}
                          </h1>
                          per semester
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 group-hover:bg-green-50 group-hover:border-green-300 group-hover:text-green-700 transition-all duration-300"
                      >
                        <Share2 className="group-hover:scale-110 transition-transform duration-300" />
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
