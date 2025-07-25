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

export default function useScholarshipUserById({ id }: { id: string }) {
  const [data, setData] = useState<ScholarshipTypes | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchScholarships() {
      setLoading(true);
      try {
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/user/getScholarshipsbyId`,
          { scholarshipId: id },
          { withCredentials: true }
        );
        if (res.status === 200) {
          console.log("API response:", res.data);
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
