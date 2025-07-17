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
import useScholarshipSearch from "@/lib/scholarship-search";
const headers = [
  { label: "Scholarship" },
  { label: "Provider" },
  { label: "Status" },
  { label: "Deadline" },
];

export default function Manage() {
  const [query, setQuery] = useState("");
  const { data, loading } = useScholarshipData();
  const { searchData } = useScholarshipSearch();

  return (
    <div className="pl-1 pr-2 your-class  h-screen">
      <header className="flex w-full items-center justify-between your-class2 border-b rounded-md top-2 relative">
        <div className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  Scholarship Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-3">
          <ModeToggle />
        </div>
      </header>
      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">Manage Scholarships</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>
        <div className="container mx-auto py-10 space-y-3">
          <div>
            <Input
              placeholder="Search "
              onChange={(e) => setQuery(e.target.value)}
            />
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
              ) : query ? (
                searchData.map((row) => (
                  <TableRow key={row.scholarshipId}>
                    <TableCell className="font-medium underline">
                      <Link
                        href={`/administrator/home/scholarships/manage/${row.scholarshipId}`}
                        prefetch={true}
                      >
                        {" "}
                        {row.scholarshipTitle}
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
                    <TableCell className="">{row.scholarshipDealine}</TableCell>
                  </TableRow>
                ))
              ) : (
                data.map((row, index) => (
                  <TableRow key={row.scholarshipId}>
                    <TableCell className="font-medium underline">
                      <Link
                        href={`/administrator/home/scholarships/manage/${row.scholarshipId}`}
                        prefetch={true}
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
    </div>
  );
}
