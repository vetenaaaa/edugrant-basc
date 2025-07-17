"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type Scholarship = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDealine: string;
};
export default function useScholarshipSearch() {
  const [searchData, setData] = useState<Scholarship[]>([]);
  const [searchLoading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchScholarships() {
      try {
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/searchScholarships`,
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchScholarships();
  }, []);
  return { searchData, searchLoading };
}
