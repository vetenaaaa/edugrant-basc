import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const steps = [
  {
    step: 1,
    title: "Account",
  },
  {
    step: 2,
    title: "Personal",
  },
  {
    step: 3,
    title: "Academic",
  },
  {
    step: 4,
    title: "Verification",
  },
];
interface LoginProps {
  setTransition?: React.Dispatch<
    React.SetStateAction<"hero" | "login" | "register">
  >;
  className: boolean;
}
export default function Register({ setTransition, className }: LoginProps) {
  const handleHeroClick = () => {
    if (setTransition) {
      setTransition("hero");
    }
  };
  // const handleRegisterClick = () => {
  //   if (setTransition) {
  //     setTransition("register");
  //   }
  // };
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

      <div className=" space-y-5 p-4">
        <Stepper defaultValue={1} className="items-start gap-3 ">
          {steps.map(({ step, title }) => (
            <StepperItem key={step} step={step} className="flex-1">
              <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                <StepperIndicator asChild className="bg-border h-1 w-full">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
                <div className="space-y-0.5">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
        <div>
          <h1 className="text-2xl font-semibold">Sign up</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fill out all required fields to start scholarship
          </p>
        </div>

        <div className="min-w-md space-y-5 mt-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input />
          </div>
          <Button className="w-full mt-3">Next</Button>
        </div>
      </div>
    </div>
  );
}
