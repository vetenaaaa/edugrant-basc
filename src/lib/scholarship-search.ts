"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type SearchTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDealine: string;
};

export default function useScholarshipSearch({ query }: { query: string }) {
  const [searchData, setSearchData] = useState<SearchTypes[]>([]);
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
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/searchScholarship`,
          { search: trimmedQuery },
          { withCredentials: true }
        );

        if (res.status === 200) {
          setSearchData(res.data.dataSearch);
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
