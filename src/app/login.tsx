"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  ArrowLeft,
  CircleAlert,
  CircleCheckIcon,
  IdCard,
  LoaderCircleIcon,
  LogIn,
} from "lucide-react";
import loginImage from "@/assets/undraw_personal-information_gbtc.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useEffect, useState } from "react";
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
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
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
  const [disableInput, setDisableInput] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [credentials, setCredentials] = useState({
    studentId: "",
    password: "",
  });
  const [otpError, setOtpError] = useState("");

  const LoginForm = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

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

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const response = await axios.post(
  //         `https://edugrant-express-server-production.up.railway.app/EduGrant/tokenAuthentication`,
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       console.log("token", response.data);
  //       if (response.status === 200) {
  //         router.push("/home");
  //         console.log("authenticated");
  //       }
  //     } catch (error) {
  //       console.log("No valid token found", error);
  //     }
  //   };
  //   checkToken();
  // }, [router]);

  const onLoginSubmit = async (data: loginFormData) => {
    console.log(
      `Login attempt with student ID: ${data.studentId}, ${data.password}`
    );

    try {
      setLoading(true);
      setDisableInput(true);
      setLoginError("");
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/EduGrant/loginAccounts`,
        {
          studentId: data.studentId,
          userPassword: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Login successful:", response.data);
      setCredentials({
        studentId: data.studentId,
        password: data.password,
      });
      setStep("otp");
      setLoading(false);
      setDisableInput(false);
      setLoginError("");
    } catch (error) {
      setLoading(false);
      setDisableInput(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setLoginError(
            "Invalid credentials. Please check your student ID and password."
          );
        } else {
          console.error(
            "Login error:",
            error.response?.data?.message || error.message
          );
          setLoginError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Login error:", error);
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onOtpSubmit = async (data: loginOtpFormData) => {
    if (data.otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit verification code");
      return;
    }
    console.log(
      "sent to backend",
      credentials.studentId,
      credentials.password,
      data.otp
    );

    try {
      setOtpError("");
      setDisableInput(true);
      setLoading(true);
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/sendAuthCodeLogin`,
        {
          studentId: credentials.studentId,
          userPassword: credentials.password,
          code: data.otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoginSuccess("Successfully logged in...");
      console.log("Code verification successful:", response.data);
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setDisableInput(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setOtpError("Invalid code");
        } else {
          console.error(
            "Verification error:",
            error.response?.data?.message || error.message
          );
          setOtpError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.error("Verification error:", error);
        setOtpError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className={`relative flex justify-center items-center gap-5 ${
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
              <Form {...LoginForm}>
                <div className="space-y-10">
                  {loginError && (
                    <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                      <p className="text-sm">
                        <CircleAlert
                          className="me-3 -mt-0.5 inline-flex opacity-60"
                          size={16}
                          aria-hidden="true"
                        />
                        {loginError}
                      </p>
                    </div>
                  )}
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
                            disabled={disableInput}
                            placeholder="Enter your Student ID"
                            {...field}
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
                            disabled={disableInput}
                            placeholder="Enter your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={LoginForm.handleSubmit(onLoginSubmit)}
                  disabled={disableInput}
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
                <Link href={`/register`} prefetch onClick={handleRegisterClick}>
                  <Button
                    variant="secondary"
                    className="w-full"
                    disabled={disableInput}
                  >
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
              <div className="text-center space-y-1.5">
                <Label
                  onClick={() => setStep("login")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </Label>
                <h1 className="text-2xl font-semibold">Verification</h1>
                <p className="text-sm text-muted-foreground">
                  Enter verification code sent to your email.
                </p>
                <Label className="text-blue-500">{credentials.studentId}</Label>
              </div>
              <Form {...loginOtpForm}>
                <div className="space-y-4">
                  {otpError && (
                    <div className="rounded-md border border-red-500/50 px-4 py-3 text-red-600">
                      <p className="text-sm">
                        <CircleAlert
                          className="me-3 -mt-0.5 inline-flex opacity-60"
                          size={16}
                          aria-hidden="true"
                        />
                        {otpError}
                      </p>
                    </div>
                  )}
                  {loginSuccess && (
                    <div className="rounded-md border border-emerald-500/50 px-4 py-3 text-emerald-600">
                      <p className="text-sm">
                        <CircleCheckIcon
                          className="me-3 -mt-0.5 inline-flex opacity-60"
                          size={16}
                          aria-hidden="true"
                        />
                        {loginSuccess}
                      </p>
                    </div>
                  )}
                  <FormField
                    control={loginOtpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center">
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={(value) => {
                                field.onChange(value);
                                setOtpError("");
                              }}
                              disabled={disableInput}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full"
                    onClick={loginOtpForm.handleSubmit(onOtpSubmit)}
                    disabled={disableInput}
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
                  <div className="text-center">
                    <Label>
                      Didn&apos;t receive the code?{" "}
                      <span className="underline cursor-pointer">
                        Resend Now
                      </span>
                    </Label>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
      <div className="border h-[80%]"></div>
      <div className="flex-1 flex justify-center items-center">
        <img
          className="h-1/2 w-1/2 brightness-90"
          src={loginImage.src}
          alt=""
        />
      </div>
    </div>
  );
}
