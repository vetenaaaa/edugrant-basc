"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLoginHandler } from "@/hooks/user/postLoginHandler";
import { ModeToggle } from "@/components/ui/dark-mode";
export default function Login() {
  const {
    step,
    // setStep,
    LoginForm,
    // LoginData,
    loginOtpForm,
    handleLogin,
    handleOtpVerification,
    authLoading,
    // authError,
    // verifyLoading,
    // verifyError,
    // verifySuccess,
  } = useLoginHandler();

  return (
    <div className="relative flex justify-center items-center gap-5 w-full min-h-screen your-class">
      <Link href={"/"} prefetch={true} className="absolute top-3 left-3">
        <Button variant="outline">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>
      {/* <div className="absolute top-3 right-3">
        <ModeToggle />
      </div> */}

      <div className="flex-1 flex justify-center items-center">
        {step === "login" && (
          <div className="shadow-2xl shadow-background  rounded-xl overflow-hidden">
            <div className=" p-8 rounded-xl shadow-xs shadow-background w-md space-y-8 bg-background/40">
              <div>
                <h1 className="text-xl font-semibold">Sign In to Edugrant</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Please sign in to continue.
                </p>
              </div>
              <Form {...LoginForm}>
                <FormField
                  control={LoginForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Student ID <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Student ID"
                          {...field}
                          disabled={authLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={LoginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Password <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your Password"
                          {...field}
                          disabled={authLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-6">
                  <Button
                    className="w-full"
                    onClick={LoginForm.handleSubmit(handleLogin)}
                    disabled={authLoading}
                  >
                    {authLoading && (
                      <LoaderCircleIcon
                        className="-ms-1 animate-spin"
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                    Login
                  </Button>
                  <div className="relative flex justify-center items-center gap-3">
                    <div className=" border-b flex-1"></div>
                    <Label>Don&apos;t have an account?</Label>
                    <div className=" border-b flex-1"></div>
                  </div>
                  <Link href={`/user/register`} prefetch>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={authLoading}
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
            <p className="text-xs text-center mt-1 p-4 bg-background/80">
              By clicking continue, you agree to our <br />
              <span className="underline text-green-600">
                {" "}
                Terms of Service{" "}
              </span>{" "}
              &nbsp; and &nbsp;
              <span className="underline text-green-600"> Privacy Policy</span>.
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
                    onClick={loginOtpForm.handleSubmit(handleOtpVerification)}
                    className="flex-1"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
