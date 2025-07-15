"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const router = useRouter();
  const HandleLogout = async () => {
    try {
      const res = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
      // Still redirect even if logout fails
      router.push("/");
    }
  };
  return (
    <>
      HOME <Button onClick={HandleLogout}>Logout</Button>
    </>
  );
}
