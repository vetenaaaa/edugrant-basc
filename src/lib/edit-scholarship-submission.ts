import axios from "axios";
import { FormData } from "./use-edit-scholarship-form";

export function useScholarshipSubmission() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await axios.put(
        `https://edugrant-express-server-production.up.railway.app/administrator/updateScholarship`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        console.log("Submitited scholarship data:", formData);
      }
    } catch (error) {
      console.error("Error submitting scholarship:", error);
    }
  };
  return { handleSubmit };
}
