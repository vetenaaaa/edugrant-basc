"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterTypes } from "./types";

export default function useGetFilter() {
 const [filter, setFilter] = useState<FilterTypes | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchFilter() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://edugrant-express-server-production.up.railway.app/administrator/getFilterData`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          console.log("API response:", res.data);
          setFilter(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilter();
  }, []);

  return { filter, loading };
}
