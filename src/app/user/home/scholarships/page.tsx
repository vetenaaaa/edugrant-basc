"use client";
import morty from "@/assets/image.png";
import { Separator } from "@/components/ui/separator";

import { usePathname } from "next/navigation";
import DynamicHeader from "../dynamic-header";

import { Button } from "@/components/ui/button";

import { Info, Send, Clock } from "lucide-react";

import Link from "next/link";

const scholarships = [
  {
    id: 1,
    name: "Academic Excellence Scholarship",
    description:
      "Merit-based scholarship for outstanding academic performance and leadership potential.",
    deadline: "2025-03-15",
    amount: 15000,
    provider: "Bulacan Agricultural State College",
    documents: "3/3",
    daysLeft: 45,
    status: "active",
  },
  {
    id: 2,
    name: "STEM Innovation Grant",
    description:
      "For students in Science, Technology, Engineering, or Mathematics pursuing innovative research.",
    deadline: "2025-04-01",
    amount: 10000,
    provider: "Department of Science and Technology",
    documents: "2/3",
    daysLeft: 62,
    status: "active",
  },
  {
    id: 3,
    name: "Financial Aid for Farmers' Children",
    description:
      "Supporting students from agricultural families to pursue higher education.",
    deadline: "2025-02-20",
    amount: 8000,
    provider: "Department of Agriculture",
    documents: "1/2",
    daysLeft: 22,
    status: "urgent",
  },
];
import useScholarshipUserData from "@/lib/client-scholarship";
import { useState } from "react";
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
    <div className="bg-background min-h-screen">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />

      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">Available Scholarships</h1>
        <p className="text-sm text-gray-500 mt-1">
          Discover scholarship opportunities. Browse, filter, and apply for
          financial aid that supports your education..
        </p>

        <div className="space-y-3 py-10 ">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="flex gap-5 p-4">
                <div className="md:w-68 bg-card rounded-md overflow-hidden border-1 border-black">
                  <img
                    src={morty.src}
                    alt={`${scholarship.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">
                        {scholarship.name}
                      </h3>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={15} />
                        {scholarship.daysLeft} days left
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by {scholarship.provider}
                    </p>

                    <p className="text-sm text-muted-foreground line-clamp-2 mt-3">
                      {scholarship.description}
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <h1 className="text-xs text-muted-foreground uppercase ">
                        Amount
                      </h1>
                      <div className="text-lg font-bold text-green-600 ">
                        ₱{scholarship.amount}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-xs text-muted-foreground uppercase ">
                        Required Documents
                      </h1>
                      <div className="text-lg font-bold text-green-600 ">
                        {scholarship.documents}
                      </div>
                    </div>

                    <div className="flex gap-2 items-end flex-1">
                      <Link
                        href={`/home/scholarships/${scholarship.id}/form`}
                        className="flex-1"
                      >
                        <Button size="sm" className="gap-2 w-full">
                          <Send className="h-4 w-4" />
                          Apply Now
                        </Button>
                      </Link>
                      <Link
                        href={`/home/scholarships/${scholarship.id}`}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 w-full"
                        >
                          <Info className="h-4 w-4" />
                          More Info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
