"use client";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import useScholarshipSearch from "@/lib/scholarship-search";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import useScholarshipData from "@/lib/scholarship-data";
import DynamicHeaderAdmin from "../dynamic-header";
import { useState } from "react";
import {
  ChevronDown,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const headers = [
  { label: "Provider" },
  { label: "Status" },
  { label: "Deadline" },
];

export default function Manage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<"asc" | "desc" | "">("");
  const { data, loading, totalPages } = useScholarshipData({
    currentPage,
    rowsPerPage,
    sort,
  });

  const [query, setQuery] = useState<string>("");
  console.log(query);
  const { searchData, searchLoading } = useScholarshipSearch({ query });
  console.log(searchData.map((meow) => meow.scholarshipTitle));
  return (
    <div className="pl-1 pr-2 your-class  h-screen">
      <DynamicHeaderAdmin first="Scholarship" second="Manage" />

      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">Manage Scholarships</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse the list of active scholarships. Use the available actions to
          modify or remove entries.
        </p>
        <div className="container mx-auto py-10 space-y-3">
          <div>
            <Input
              placeholder="Search Scholarship Title..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Table>
            {/* <TableCaption>A list of active scholarships.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div
                    className="flex items-center  gap-3"
                    onClick={() => {
                      if (sort === "") {
                        setSort("asc");
                      } else if (sort === "asc") {
                        setSort("desc");
                      } else {
                        setSort(""); // Go back to default/no sort
                      }
                      setCurrentPage(1); // Reset to first page when sorting changes
                    }}
                  >
                    Scholarship Title{" "}
                    {sort === "" && <ChevronsUpDown size={20} />}
                    {sort === "asc" && <ChevronDown size={20} />}
                    {sort === "desc" && <ChevronUp size={20} />}
                  </div>
                </TableHead>
                {headers.map((header) => (
                  <TableHead key={header.label}>{header.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headers.length + 1} className="text-center">
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : !query ? (
                data.map((row, index) => (
                  <TableRow key={row.scholarshipId}>
                    <TableCell className="font-medium underline">
                      <Link
                        href={`/administrator/home/manage/${row.scholarshipId}`}
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
              ) : searchLoading ? (
                <TableRow>
                  <TableCell colSpan={headers.length + 1} className="text-center">
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : searchData.length > 0 ? (
                searchData.map((row, index) => (
                  <TableRow key={row.scholarshipId}>
                    <TableCell className="font-medium underline">
                      <Link
                        href={`/administrator/home/manage/${row.scholarshipId}`}
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
              ) : (
                <TableRow>
                  <TableCell colSpan={headers.length + 1} className="text-center">
                    No result found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!query && (
            <div className="flex items-center justify-between gap-8">
              {/* Results per page */}
              <div className="flex items-center gap-3">
                <Label className="max-sm:sr-only">Rows per page</Label>
                <Select
                  onValueChange={(value) => {
                    setRowsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                  value={rowsPerPage.toString()}
                >
                  <SelectTrigger size="sm" className="w-fit whitespace-nowrap">
                    <SelectValue  placeholder="Select number of results" />
                  </SelectTrigger>
                  <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                    {[1, 5, 10, 25, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Page number information */}
              <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                <p
                  className="text-muted-foreground text-sm whitespace-nowrap"
                  aria-live="polite"
                >
                  <span className="text-foreground">{currentPage}</span> of{" "}
                  <span className="text-foreground">{totalPages}</span>
                </p>
              </div>

              {/* Pagination buttons */}

              <div>
                <Pagination>
                  <PaginationContent>
                    {/* First */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        aria-label="Go to first page"
                      >
                        <ChevronFirstIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Previous */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        aria-label="Go to previous page"
                      >
                        <ChevronLeftIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Next */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        aria-label="Go to next page"
                      >
                        <ChevronRightIcon size={16} />
                      </Button>
                    </PaginationItem>

                    {/* Last */}
                    <PaginationItem>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="Go to last page"
                      >
                        <ChevronLastIcon size={16} />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
