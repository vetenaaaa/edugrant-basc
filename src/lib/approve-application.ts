"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useApproveApplication(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function ApprovedApplication() {
      try {
        setLoading(true);
        const res = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/approveApplication`,
          { applicationId: id },
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setSuccess(true);
          console.log("approved");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.message === "Network Error") {
          setError("No network connection");
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    }

    ApprovedApplication();
  }, [id]);

  return { loading, error, success };
}
