"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApplicationTypes } from "./types";

export default function useApplicationById(id: string) {
  const [data, setData] = useState<ApplicationTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchApplicationById() {
        setLoading(true);
        try {
          const res = await axios.get<{
            data: ApplicationTypes;
          }>(
            `https://edugrant-express-server-production.up.railway.app/administrator/getApplicationById?applicationId=${id}`,

            { withCredentials: true }
          );
          if (res.status === 200) {
            console.log(res);
            setData(res.data.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.message === "Network Error") {
              setError("No internet connection. Please check your network.");
            }
          }
        } finally {
          setLoading(false);
        }
      }

      fetchApplicationById();
    },
    [id]
  );

  return { data, loading, error };
}
