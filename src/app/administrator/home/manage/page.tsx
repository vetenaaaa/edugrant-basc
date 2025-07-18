"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/dark-mode";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import useScholarshipData from "@/lib/scholarship-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DynamicHeaderAdmin from "../dynamic-header";
const headers = [
  { label: "Scholarship" },
  { label: "Provider" },
  { label: "Status" },
  { label: "Deadline" },
];

export default function Manage() {
  const { data, loading } = useScholarshipData();
  const [intercept, setIntercept] = useState<"scholars" | "details">(
    "scholars"
  );

  const [selectedScholar, setSelectedScholar] = useState("");

  const selected = data.filter(
    (meow) => meow.scholarshipId === selectedScholar
  );

  console.log(selected);
  const HandleClickScholarhip = () => {
    setIntercept("scholars");
  };

  return (
    <div className="pl-1 pr-2 your-class  h-screen">
      <DynamicHeaderAdmin first="Scholarship" second="Manage"/>
      {intercept === "scholars" && (
        <div className="mx-auto lg:w-3/4 w-[95%] py-10">
          <h1 className="text-3xl font-semibold">Manage Scholarships</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse the list of active scholarships. Use the available actions to
            modify or remove entries.
          </p>
          <div className="container mx-auto py-10 space-y-3">
            <div>
              <Input placeholder="Search " />
            </div>
            <Table>
              <TableCaption>A list of active scholarships.</TableCaption>
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header.label}>{header.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={headers.length} className="text-center">
                      <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, index) => (
                    <TableRow key={row.scholarshipId}>
                      <TableCell className="font-medium underline">
                        <Link
                          href={`/administrator/home/manage/${row.scholarshipId}`}
                          prefetch={true}
                          onClick={() => {
                            setIntercept("details");
                            setSelectedScholar(row.scholarshipId);
                          }}
                        >
                          {index + 1}. {row.scholarshipTitle}
                        </Link>
                      </TableCell>
                      <TableCell className="">
                        {row.scholarshipProvider}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="bg-green-900 text-gray-300">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="">
                        {" "}
                        {new Date(row.scholarshipDealine).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {intercept === "details" && (
        <div className="relative mx-auto lg:w-3/4 w-[95%] py-10 ">
          <Link
            href={`/administrator/home/manage`}
            prefetch={true}
            onClick={HandleClickScholarhip}
            className="absolute left-0 top-10"
          >
            <Button variant="outline">
              <ArrowLeft />
            </Button>
          </Link>
          <div></div>
        </div>
      )}
    </div>
  );
}
