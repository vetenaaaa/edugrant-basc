import z from "zod";
import { EditScholarshipTypes } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  applicationDeadline: z.string().min(1, "Required"),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string().min(1, "Required"),
});
export type FormData = z.infer<typeof createScholarshipSchema>;
export function useEditScholarshipForm(data: EditScholarshipTypes) {
  const form = useForm<FormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: data.scholarshipTitle,
      providerName: data.scholarshipProvider,
      scholarshipDescription: data.scholarshipDescription,
      applicationDeadline: data.scholarshipDealine,
      scholarshipAmount: data.scholarshipAmount.toString(),
      scholarshipLimit: data.scholarshipLimit.toString(),
    },
  });
  return {
    form,
    schema: createScholarshipSchema,
  };
}
