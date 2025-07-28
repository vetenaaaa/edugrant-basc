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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import useScholarshipSearch from "@/lib/scholarship-search";
import { Input } from "@/components/ui/input";

import DynamicHeaderAdmin from "../dynamic-header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlignHorizontalDistributeCenter,
  ArrowRightIcon,
  Check,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
  FileDown,
  RotateCcw,
  SearchIcon,
  Settings2,
  Undo2,
  UsersRound,
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
import useAdminReview from "@/lib/get-applications";

const headers = [
  { label: "Student ID" },
  { label: "Student Name" },
  { label: "Course, Year & Section" },
  { label: "Scholarship" },

  { label: "Application Date" },
];
const frameworks = [
  { value: "bsit", label: "BSIT" },
  { value: "bsab", label: "BSABEN" },
  { value: "bsft", label: "BSFT" },
  { value: "bsge", label: "BSGE" },
  { value: "bsba", label: "BSBA" },
  { value: "bshm", label: "BSHM" },
  { value: "bsa", label: "BSA" },
  { value: "bsagribus", label: "BSAgriBus" },
  { value: "bsdc", label: "BSDC" },
  { value: "bse", label: "BSEd" },
  { value: "bee", label: "BEEd" },
  { value: "bsaf", label: "BSAF" },
  { value: "dvm", label: "DVM" },
];

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const sortList = [
  {
    value: "",
    label: "No Sort",
  },
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

export default function Manage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<"" | "asc" | "desc" | "newest" | "oldest">(
    ""
  );
  const [open, setOpen] = useState(false);
  const { data, loading, totalPages } = useAdminReview({
    currentPage,
    rowsPerPage,
    sort,
  });

  const [query, setQuery] = useState<string>("");
  console.log(query);
  const { searchData, searchLoading } = useScholarshipSearch({ query });

  return (
    <div className=" your-class  h-screen px-4">
      <DynamicHeaderAdmin first="Scholarship" second="Manage" />

      <div className="mx-auto lg:w-[95%]  w-[95%] py-10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <UsersRound />
          Pending Review
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review submitted documents and take action on scholarship
          applications. You can approve, decline, or manage applicants.
        </p>
        <div className="container mx-auto py-10 space-y-3">
          <div className="flex gap-3 justify-between">
            <div className="relative w-[40%]">
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className="peer ps-9 pe-9"
                placeholder="Search..."
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Submit search"
                type="submit"
              >
                <ArrowRightIcon size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="flex gap-3 items-center">
              {" "}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    <AlignHorizontalDistributeCenter />
                    {sort
                      ? sortList.find((framework) => framework.value === sort)
                          ?.label
                      : "Sort by"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {sortList.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setSort(
                                currentValue === sort
                                  ? ""
                                  : (currentValue as
                                      | ""
                                      | "asc"
                                      | "desc"
                                      | "newest"
                                      | "oldest")
                              );
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                sort === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Drawer direction="right" modal={true}>
                <DrawerTrigger asChild>
                  <Button variant="outline">
                    <Settings2 />
                    Advance Filter
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-xl flex gap-2 items-center">
                      {" "}
                      <Settings2 />
                      Advance Filter
                    </DrawerTitle>
                    <DrawerDescription>
                      Filter applicants by course, scholarship, and more.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-5">
                    <div className="space-y-1.5">
                      <h1>Course, Year & Section</h1>
                      <div className="flex flex-col gap-3">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter Course" />
                          </SelectTrigger>
                          <SelectContent>
                            {frameworks.map((meow) => (
                              <SelectItem key={meow.value} value={meow.value}>
                                {meow.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter Year Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h1>Scholarships</h1>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter Scholarship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>
                      <RotateCcw />
                      Reset
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">
                        <Undo2 />
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button variant="outline">
                <FileDown />
                Export CSV
              </Button>
            </div>
          </div>
          <Table>
            {/* <TableCaption>A list of active scholarships.</TableCaption> */}
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead
                    className={
                      header.label === "Application Date" ? "text-center" : ""
                    }
                    key={header.label}
                  >
                    {header.label}
                  </TableHead>
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
              ) : !query ? (
                data.length > 0 ? (
                  data.map((row) => (
                    <TableRow
                      key={row.applicationId}
                      onClick={() =>
                        router.push(
                          `/administrator/home/manage/${row.applicationId}`
                        )
                      }
                      className="cursor-pointer"
                    >
                      <TableCell className="">
                        {row.student.studentId}
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-3">
                        {`${row.student.lastName}, ${row.student.firstName} ${row.student.middleName}`}
                      </TableCell>

                      <TableCell>
                        {`${
                          row.student.studentCourseYearSection.course
                        }-${row.student.studentCourseYearSection.year.slice(
                          0,
                          1
                        )}${row.student.studentCourseYearSection.section}`}
                      </TableCell>
                      <TableCell>{row.scholarship.scholarshipTitle}</TableCell>
                      <TableCell className="text-center">
                        date ng application
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length} className="text-center">
                      No result found.
                    </TableCell>
                  </TableRow>
                )
              ) : searchLoading ? (
                <TableRow>
                  <TableCell colSpan={headers.length} className="text-center">
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : searchData.length > 0 ? (
                searchData.map((row) => (
                  <TableRow
                    key={row.scholarshipId}
                    onClick={() =>
                      router.push(
                        `/administrator/home/manage/${row.scholarshipId}`
                      )
                    }
                  >
                    <TableCell className="flex gap-3 items-center font-medium">
                      {/* <Link
                        href={`/administrator/home/manage/${row.scholarshipId}`}
                        prefetch={true}
                      > */}

                      {row.scholarshipTitle}
                      {/* </Link> */}
                    </TableCell>
                    <TableCell>{row.scholarshipProvider}</TableCell>
                    <TableCell className="">
                      <Badge className="bg-green-900 text-gray-300">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="">
                      {" "}
                      {new Date(row.scholarshipDealine).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.totalApproved}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headers.length} className="text-center">
                    No result found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!query && data.length !== 0 && (
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
                    <SelectValue placeholder="Select number of results" />
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
