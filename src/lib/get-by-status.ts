"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "./types";

export default function useStatusReview({
  currentPage,
  rowsPerPage,
  sort,
  scholar,
  course,
  year,
  section,
  status,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort: string;
  scholar?: string;
  course?: string;
  year?: string;
  section?: string;
  status?: string;
}) {
  const [data, setData] = useState<ApplicationTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  console.log(scholar, course, year, section);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://edugrant-express-server-production.up.railway.app/administrator/getApplicationByStatus?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}${
              scholar ? `&scholarshipId=${scholar}` : ""
            }${course ? `&course=${course}` : ""}
            ${year ? `&year=${year}` : ""} ${
              section ? `&section=${section}` : ""
            }${status ? `&status=${status}` : ""}`,
            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.applications);
            setTotalPages(res.data.totalPages);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [currentPage, rowsPerPage, sort, scholar, course, year, section]
  );

  return { data, loading, totalPages };
}
