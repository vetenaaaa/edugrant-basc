"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type FormatTypes = {
  formats: string;
};

export type scholarshipDocumentTypes = {
  label: string;
  formats: FormatTypes[];
};

export type ScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipDealine: string;
  totalApplicants: number;
  totalApproved: number;
  scholarshipLogo: string;
  scholarshipCover: string;
  scholarshipDescription: string;
  scholarshipAmount: number;
  scholarshipDocuments: scholarshipDocumentTypes[];
};

export default function useScholarshipUserData({
  currentPage,
  rowsPerPage,
  sort,
}: {
  currentPage: number;
  rowsPerPage: number;
  sort: string;
}) {
  const [data, setData] = useState<ScholarshipTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchScholarships() {
      setLoading(true);
      try {
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/user/getAllScholarships`,
          { page: currentPage, dataPerPage: rowsPerPage, sortBy: sort },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setData(res.data.getScholarshipsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchScholarships();
  }, []);

  return { data, loading };
}
