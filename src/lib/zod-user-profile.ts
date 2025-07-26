import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileTypes } from "./types";
const userProfileSchema = z.object({
  //Personal
  firstName: z.string().min(1, "Required"),
  middleName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  //Contact
  email: z.string().min(1, "Required"),
  contactNumber: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  //Academic
  studentId: z.string().min(1, "Required"),
  course: z.string().min(1, "Required"),
  yearLevel: z.string().min(1, "Required"),
  section: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});
export type FormData = z.infer<typeof userProfileSchema>;

export function useProfileZod(data: UserProfileTypes) {
  const form = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      //Contact
      email: data.email,
      contactNumber: data.contactNumber,
      address: data.address,
      //Academic
      studentId: data.studentId,
      course: data.course,
      yearLevel: data.yearLevel,
      section: data.section,
      password: "************",
    },
  });
  return { form, schema: userProfileSchema };
}
