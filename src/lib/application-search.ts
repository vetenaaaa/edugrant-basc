"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "./types";

export default function useApplicationpSearch({ query }: { query: string }) {
  const [searchData, setSearchData] = useState<ApplicationTypes[]>([]);
  const [searchLoading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://edugrant-express-server-production.up.railway.app/administrator/searchApplication?search=${trimmedQuery}`,

          { withCredentials: true }
        );

        if (res.status === 200) {
          console.log(res);
          setSearchData(res.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500); // Adjust delay time as needed

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return { searchData, searchLoading };
}
