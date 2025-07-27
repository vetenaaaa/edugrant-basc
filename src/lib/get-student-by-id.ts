"use client";
import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

export default function useAuthenticatedUser() {
  const { setUser, setLoading, setError } = useUserStore();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://edugrant-express-server-production.up.railway.app/user/tokenValidation`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200 && res.data?.user) {
          console.log(res);
          setUser(res.data.user);
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

    fetchUserData();
  }, [setUser, setLoading, setError]);

  return null;
}
