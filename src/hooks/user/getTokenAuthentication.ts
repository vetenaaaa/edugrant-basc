"use client";
import axios from "axios";
import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";

export default function useAuthenticatedUser() {
  const { setUser, setLoading, setError } = useUserStore();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_URL}/tokenValidation`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setUser(res.data.userData);
          console.log("authapi:", res.data);
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
