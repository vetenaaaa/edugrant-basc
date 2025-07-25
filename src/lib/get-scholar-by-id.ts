"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export type scholarshipDocumentTypes = {
  label: string;
  formats: string[];
};

export type ScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  status: string;
  scholarshipLimit: string;
  scholarshipDealine: string;
  totalApplicants: number;
  totalApproved: number;
  scholarshipLogo: string;
  scholarshipCover: string;
  scholarshipDescription: string;
  scholarshipAmount: string;
  scholarshipDocuments: scholarshipDocumentTypes[];
};

export default function useScholarshipUserById(id: string) {
  const [data, setData] = useState<ScholarshipTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function fetchScholarships() {
        setLoading(true);
        try {
          const res = await axios.post<{
            scholarship: ScholarshipTypes;
          }>(
            `https://edugrant-express-server-production.up.railway.app/user/getScholarshipsbyId`,
            { scholarshipId: id },
            { withCredentials: true }
          );
          if (res.status === 200) {
            setData(res.data.scholarship);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchScholarships();
    },
    [id]
  );

  return { data, loading };
}
