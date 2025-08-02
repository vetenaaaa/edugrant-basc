"use client";
import "ldrs/react/Ring.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const headers = [
  { label: "Student ID" },
  { label: "Student Name" },
  { label: "Course, Year & Section" },
  { label: "Scholarship" },
  { label: "Status" },
  { label: "Approved Date" },
];
const body = [
  { label: "12345" },
  { label: "Jane Doe" },
  { label: "BSIT 3C" },
  { label: "Merit" },
  { label: "Approved" },
  { label: "02-10-25" },
];

export default function Manage() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.label}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((meow) => (
          <TableRow>
            <TableCell
              colSpan={headers.length}
              className="text-center"
            ></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
