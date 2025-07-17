// // /app/administrator/home
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function AdminHomePage() {
//   const router = useRouter();
//   const [isAuthenticated] = useState(true);
//   const [loading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "https://edugrant-express-server-production.up.railway.app/administrator/adminLogout",
//         {},
//         { withCredentials: true }
//       );
//       router.replace("/administrator");
//     } catch (error) {
//       console.error("Logout failed", error);
//       // Still redirect even if logout fails
//       router.push("/administrator");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Checking authentication...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Redirecting...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Your admin content goes here */}

//       </div>
//     </>
//   );
// }
"use client";
import ChartPieDonutText from "./dashboard/pie";
import { ChartBarMultiple } from "./dashboard/bar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import morty from "@/assets/image.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ui/dark-mode";
import ApplicationSummary from "./dashboard/summary";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Bell,
  ChevronDown,
  LogOut,
  Megaphone,
  SquarePen,
} from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const HandleLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/adminLogout`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        router.replace("/administrator");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pl-1 pr-2 your-class h-screen">
      <header className="flex w-full items-center justify-between bg-background/50 border-b rounded-md top-2 relative">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Main</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-3 flex  items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <img
                  className="h-full w-full aspect-square object-cover rounded-full"
                  src={morty.src}
                  alt=""
                />
                Admin
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                variant="ghost"
                className="w-full"
                size="sm"
                onClick={HandleLogout}
              >
                <LogOut />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
          <span className="p-2.5 border rounded-sm">
            <Megaphone className="h-4 w-4" />
          </span>
          <span className="p-2.5 border rounded-sm">
            <Bell className="h-4 w-4" />
          </span>
          <ModeToggle />
        </div>
      </header>

      <div className=" grid grid-cols-3  gap-5 px-5 ">
        <div className=" flex justify-between items-start py-10 col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Hello Admin </h1>
            <p className="text-sm text-muted-foreground">
              Tuesday, August 6th 2025
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <SquarePen /> Post a scholarship
            </Button>
            <Button variant="outline" className="flex-1">
              <Activity /> Generate Report
            </Button>
          </div>
        </div>

        <>1</>

        <div className="col-span-2 grid gap-5">
          <ApplicationSummary />
          <div className="grid grid-cols-2 gap-5">
            <ChartBarMultiple />
            <ChartPieDonutText />
          </div>
        </div>
      </div>
    </div>
  );
}
