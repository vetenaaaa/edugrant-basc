// /app/administrator

"use client";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BlurText from "@/components/ui/blur";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a vali email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .max(20, "Password must be at least 8 characters long"),
});

const optSchema = z.object({
  otp: z
    .string()
    .min(1, "One time password is required")
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
        const response = await axios.post(
          `https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login error:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const onOtpSubmit = async (data: otpFormData) => {
    console.log(
      "sent to backend",
      credentials.email,
      credentials.password,
      data.otp
    );
    try {
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

      console.log("Code verification successful:", response.data);
      router.push("/administrator/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Verification error:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Verification error:", error);
      }
    }
  };

  const [step, setStep] = useState<"login" | "otp">("login");

  return (
    <div className="h-screen flex justify-center items-center your-class">
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
            className="text-2xl mt-3 text-white"
          />
        </div>
      </div>
      <div className="border h-[80%]"></div>
      <div className="flex-1 flex flex-col justify-center items-center">
        {step === "login" && (
          <div>
            <Form {...LoginForm}>
              <h1 className=" text-3xl font-bold">Sign In</h1>
              <h1 className="text-sm text-muted-foreground mt-2">
                Enter your credentials to access your account
              </h1>
              <div className="min-w-md space-y-5 mt-8">
                <FormField
                  control={LoginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
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
                <div>
                  <div className="flex items-center gap-1.5">
                    <Checkbox />
                    <Label> Remember me</Label>
                  </div>
                </div>
                <Button
                  className="w-full mt-5"
                  onClick={LoginForm.handleSubmit(onLoginSubmit)}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        )}

        {step === "otp" && (
          <Form {...otpForm}>
            <div className="space-y-5">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
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

                        <Button
                          variant="outline"
                          onClick={otpForm.handleSubmit(onOtpSubmit)}
                        >
                          Verify
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
