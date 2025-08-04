import axios from "axios";
import { FormData } from "../../lib/use-edit-scholarship-form";

export function useScholarshipSubmission() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/updateScholarship`,
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
