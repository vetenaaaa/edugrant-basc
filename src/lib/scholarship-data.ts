"use client";
import axios from "axios";
import { useEffect, useState } from "react";
type FormatTypes = {
  formats: string;
};

type scholarshipDocumentTypes = {
  label: string;
  formats: FormatTypes[];
};

type Scholarship = {
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

export default function useScholarshipData() {
  const [data, setData] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchScholarships() {
      try {
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/getScholarships`,
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
  return { data, loading };
}
