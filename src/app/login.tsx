"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, IdCard, LogIn } from "lucide-react";
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
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/EduGrant/loginAccounts`,
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
        router.push("/EduGrant/home");
        alert("login success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendCode = async (data: loginFormData) => {
    console.log("sent to backend", data.studentId, data.password);

    try {
      const response = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/EduGrant/sendAuthCodeLogin`,
        {
          studentId: data.studentId,
          userPassword: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("code sent");
        setStep("otp");
      }
    } catch (error) {
      console.log(error);
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
                >
                  Login <LogIn />
                </Button>
                <div className="relative flex justify-center items-center gap-3">
                  <div className=" border flex-1"></div>
                  <Label>Don&apos;t have an account?</Label>
                  <div className=" border flex-1"></div>
                </div>
                <Link
                  href={`/EduGrant/register`}
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
                <Label className="text-blue-500">{LoginData.studentId}</Label>
              </div>
              <Form {...loginOtpForm}>
                <div className="space-y-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full"
                    onClick={loginOtpForm.handleSubmit(handleSubmit)}
                  >
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
    </div>
  );
}
