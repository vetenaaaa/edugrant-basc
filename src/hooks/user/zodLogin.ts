import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  studentId: z.string().min(1, "Student ID is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(20, "Password must be at least 20 characters long."),
});

const loginOtpSchema = z.object({
  otp: z.string().min(6, "Too short").max(6, "OTP must be 6 characters long"),
});

export type loginFormData = z.infer<typeof loginSchema>;
export type loginOtpFormData = z.infer<typeof loginOtpSchema>;
export function useLoginUser() {
  const LoginForm = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });
  const LoginData = LoginForm.watch();
  const loginOtpForm = useForm<loginOtpFormData>({
    resolver: zodResolver(loginOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  return {LoginForm, LoginData, loginOtpForm, loginSchema, loginOtpSchema };
}
