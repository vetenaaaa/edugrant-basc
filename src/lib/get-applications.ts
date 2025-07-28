"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "./types";

export default function useAdminReview({
  currentPage,
  rowsPerPage,
  sort,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort: string;
}) {
  const [data, setData] = useState<ApplicationTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://edugrant-express-server-production.up.railway.app/administrator/getStudentApplication?page=${currentPage}&dataPerPage=${rowsPerPage}&sortBy=${sort}`,
            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log("API response:", res.data);
            setData(res.data.Applications);
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
    [currentPage, rowsPerPage, sort]
  );

  return { data, loading, totalPages };
}
