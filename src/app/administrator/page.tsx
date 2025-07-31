// /app/administrator

"use client";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ModeToggle } from "@/components/ui/dark-mode";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BlurText from "@/components/ui/blur";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheckIcon,
  LoaderCircleIcon,
} from "lucide-react";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email({ message: "Please enter a vali email." }),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(20, "Password must be at least 20 characters long."),
});

const optSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 characters long")
    .max(6, "OTP must be 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type otpFormData = z.infer<typeof optSchema>;

export default function LoginAdmin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");
  const LoginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<otpFormData>({
    resolver: zodResolver(optSchema),

    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get(
          `https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`,
          {
            withCredentials: true,
          }
        );

        console.log("token", response.data);
        if (response.status === 200) {
          router.push("/administrator/home");
          console.log("authenticated");
        }
      } catch (error) {
        console.log("No valid token found", error);
      }
    };
    checkToken();
  }, [router]);

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log(`Login attempt with email: ${data.email}, ${data.password}`);

    try {
      setLoading(true);
      setDisableInput(true);
      setLoginError("");
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminLogin`,
        {
          adminEmail: data.email,
          adminPassword: data.password,
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
        email: data.email,
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
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const onOtpSubmit = async (data: otpFormData) => {
    if (data.otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit verification code");
      return;
    }
    console.log(
      "sent to backend",
      credentials.email,
      credentials.password,
      data.otp
    );

    try {
      setOtpError("");
      setDisableInput(true);
      setLoading(true);
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminCodeAuthentication`,
        {
          adminEmail: credentials.email,
          adminPassword: credentials.password,
          code: data.otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoginSuccess("Sucessfully logged in...");
      console.log("Code verification successful:", response.data);
      setTimeout(() => {
        router.push("/administrator/home");
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
        }
      } else {
        console.error("Verification error:", error);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex-1  flex flex-col justify-center items-center">
        <div>
          <motion.span
            className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text  text-green-500/70 
text-5xl  zxczxc tracking-[-9px] -translate-x-2
"
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "-200% 0" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 7,
              ease: "linear",
            }}
          >
            Edugrant Admin
          </motion.span>
          <BlurText
            text="Manage everything in one place. Secure. Efficient. Reliable."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mt-3"
          />
        </div>
      </div>
      <div className="border h-[80%]"></div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="absolute top-5 right-5">
          <ModeToggle />
        </div>
        {step === "login" && (
          <div>
            <Form {...LoginForm}>
              <h1 className=" text-3xl font-bold">Sign In</h1>
              <h1 className="text-sm text-muted-foreground mt-2 mb-3">
                Enter your credentials to access your account
              </h1>

              <div className="min-w-md space-y-4 mt-8">
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

                <div className="space-y-8">
                  <FormField
                    control={LoginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            disabled={disableInput}
                            placeholder="Enter your email"
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
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={disableInput}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Checkbox disabled={disableInput} />
                    <Label> Remember me</Label>
                  </div>
                </div>
                <Button
                  className="w-full mt-8"
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
                  Login
                </Button>
              </div>
            </Form>
          </div>
        )}

        {step === "otp" && (
          <div>
            <Form {...otpForm}>
              <Label>
                <ArrowLeft size={16} onClick={() => setStep("login")} />
                Back to login
              </Label>
              <h1 className=" text-3xl font-bold mt-5">Verification</h1>
              <h1 className="text-sm text-muted-foreground mt-1">
                Enter verification code sent to your email.
              </h1>
              <Label className="text-blue-500 mt-1">{credentials.email}</Label>

              <div className="mt-5 space-y-5">
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
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <div className="flex items-center">
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
                  className="w-full mt-3"
                  variant="outline"
                  disabled={disableInput}
                  onClick={otpForm.handleSubmit(onOtpSubmit)}
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
                <Label>
                  Didn&apos;t recieved the code?{" "}
                  <span className="underline">Resend Now</span>{" "}
                </Label>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
