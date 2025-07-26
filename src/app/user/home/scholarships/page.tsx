"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "../dynamic-header";

import { Button } from "@/components/ui/button";

import { Info, LogIn } from "lucide-react";

import Link from "next/link";

import useScholarshipUserData from "@/lib/client-scholarship";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
export default function ClientScholarship() {
  const [currentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sort] = useState<"asc" | "desc" | "">("");
  const path = usePathname();
  const segmentedPath = path.split("/");
  const { data, loading } = useScholarshipUserData({
    currentPage,
    rowsPerPage,
    sort,
  });
  console.log(data, loading);

  return (
    <div className="bg-background min-h-screen your-class">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />

      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">Available Scholarships</h1>
        <p className="text-sm text-gray-500 mt-1">
          Discover scholarship opportunities. Browse, filter, and apply for
          financial aid that supports your education..
        </p>

        <div className="space-y-3 py-10 grid lg:grid-cols-3 grid-cols-1 gap-5">
          {data.map((scholarship) => (
            <div
              key={scholarship.scholarshipId}
              className="rounded-lg border bg-background/40 shadow-sm  overflow-hidden h-full  relative p-2"
            >
              <img
                src={scholarship.scholarshipLogo}
                alt=""
                className=" w-full object-cover rounded-md mask-gradient-bottom bg-background mb-20 aspect-video"
              />
              <div className=" absolute bottom-0 w-full left-0 p-2 space-y-5">
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h1 className="font-bold text-lg">
                      {scholarship.scholarshipTitle}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      by {scholarship.scholarshipProvider}
                    </p>
                  </div>
                  <Badge>2 days left</Badge>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/user/home/scholarships/${scholarship.scholarshipId}?apply=true`}
                    className="flex-1"
                  >
                    <Button size="sm" className="gap-2 w-full">
                      <LogIn className="h-4 w-4" />
                      Apply Now
                    </Button>
                  </Link>
                  <Link
                    href={`/user/home/scholarships/${scholarship.scholarshipId}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 w-full"
                    >
                      <Info className="h-4 w-4" />
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
