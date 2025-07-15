"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheckIcon,
  IdCard,
  LoaderCircleIcon,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

interface LoginProps {
  setTransition?: React.Dispatch<
    React.SetStateAction<"hero" | "login" | "register">
  >;
  className: boolean;
}

type loginFormData = z.infer<typeof loginSchema>;
type loginOtpFormData = z.infer<typeof loginOtpSchema>;

export default function Login({ setTransition, className }: LoginProps) {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleHeroClick = () => {
    if (setTransition) {
      setTransition("hero");
    }
  };
  const handleRegisterClick = () => {
    if (setTransition) {
      setTransition("register");
    }
  };

  const handleSubmit = async (data: loginOtpFormData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/user/loginAccounts`,
        {
          studentId: LoginData.studentId,
          userPassword: LoginData.password,
          code: data.otp,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
          router.push("/user/home");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      setSuccess("");
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Invalid code. Please check your code in your email.");
        } else {
          setError("An unexpected error occurred. Please try again.");
          console.error(
            "Login error:",
            error.response?.data?.message || error.message
          );
        }
      } else {
        console.error("Login error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSendCode = async (data: loginFormData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/user/sendAuthCodeLogin`,
        {
          studentId: data.studentId,
          userPassword: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setStep("otp");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError(
            "Invalid credentials. Please check your email and password."
          );
        } else {
          console.error(
            "Login error:",
            error.response?.data?.message || error.message
          );
        }
      } else {
        console.error("Login error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className={`relative flex justify-center items-center gap-5 w-full ${
        className ? "h-[calc(100vh-116px)]" : "h-screen"
      }`}
    >
      <Link
        href={"/"}
        prefetch={true}
        onClick={handleHeroClick}
        className="absolute top-3 left-3"
      >
        <Button variant="outline">
          <ArrowLeft />
        </Button>
      </Link>

      <div className="flex-1 flex justify-center items-center">
        <div className="min-w-md">
          {step === "login" && (
            <div className="space-y-8">
              <div className="space-y-1.5">
                <h1 className="text-2xl font-semibold">Welcome back!</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your credentials to access your account.
                </p>
              </div>
              {error && (
                <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                  <p className="text-sm">
                    <CircleAlert
                      className="me-3 -mt-0.5 inline-flex opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {error}
                  </p>
                </div>
              )}
              {success && (
                <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
                  <p className="text-sm">
                    <CircleCheckIcon
                      className="me-3 -mt-0.5 inline-flex opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {success}
                  </p>
                </div>
              )}
              <Form {...LoginForm}>
                <div className="space-y-10">
                  <FormField
                    control={LoginForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IdCard /> Student ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Student ID"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={LoginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Password"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={LoginForm.handleSubmit(handleSendCode)}
                  disabled={loading}
                >
                  {loading && (
                    <LoaderCircleIcon
                      className="-ms-1 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                  )}
                  Login <LogIn />
                </Button>
                <div className="relative flex justify-center items-center gap-3">
                  <div className=" border flex-1"></div>
                  <Label>Don&apos;t have an account?</Label>
                  <div className=" border flex-1"></div>
                </div>
                <Link
                  href={`/user/register`}
                  prefetch
                  onClick={handleRegisterClick}
                >
                  <Button variant="secondary" className="w-full">
                    Register
                  </Button>
                </Link>
              </Form>

              <p className="text-xs text-center mt-1">
                By clicking continue, you agree to our <br />
                <span className="underline"> Terms of Service </span> and{" "}
                <span className="underline"> Privacy Policy</span>.
              </p>
            </div>
          )}
          {step === "otp" && (
            <div className="space-y-5">
              <div className=" space-y-1.5">
                <h1 className="text-2xl font-semibold">Verification</h1>
                <p className="text-sm text-muted-foreground">
                  Enter verification code sent to your email.
                </p>
              </div>
              {error && (
                <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                  <p className="text-sm">
                    <CircleAlert
                      className="me-3 -mt-0.5 inline-flex opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {error}
                  </p>
                </div>
              )}
              {success && (
                <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
                  <p className="text-sm">
                    <CircleCheckIcon
                      className="me-3 -mt-0.5 inline-flex opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {success}
                  </p>
                </div>
              )}
              <Form {...loginOtpForm}>
                <div className="space-y-4">
                  <FormField
                    control={loginOtpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Enter 6-digit code
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center">
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={(value) => {
                                field.onChange(value);
                                setError("");
                              }}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" className="flex-1" disabled>
                      Resend (0s)
                    </Button>
                    <Button
                      onClick={loginOtpForm.handleSubmit(handleSubmit)}
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading && (
                        <LoaderCircleIcon
                          className="-ms-1 animate-spin"
                          size={16}
                          aria-hidden="true"
                        />
                      )}
                      Verify
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
