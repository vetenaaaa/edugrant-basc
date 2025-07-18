import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ModeToggle } from "@/components/ui/dark-mode";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, ChevronsUpDown, ExternalLink, LogOut, User } from "lucide-react";
import Link from "next/link";
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface HeaderTypes {
  first: string;
  second?: string;
  third?: string;
}
export default function DynamicHeader({ first, second, third }: HeaderTypes) {
  const router = useRouter();

  const HandleLogout = async () => {
    try {
      const res = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
      router.push("/");
    }
  };
  return (
    <header className="flex w-full items-center justify-between your-class2 border-b rounded-md top-2 relative">
      <div className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>{capitalizeFirstLetter(first)}</BreadcrumbItem>
            {second && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(second)}</BreadcrumbItem>
              </>
            )}
            {third && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{capitalizeFirstLetter(third)}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mr-3 flex  items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <User />
              Jerome
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2 bg-background space-y-2">
            <Link prefetch={true} href="/user/home/profile">
              <div className="w-full rounded-md border py-1 px-4 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Profile</p>
                  </div>

                  <Button size="sm" variant="ghost">
                    <User />
                  </Button>
                </div>
              </div>
            </Link>
            <div
              className="w-full rounded-md border py-1 px-4 shadow-lg cursor-pointer"
              onClick={HandleLogout}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Log out</p>
                </div>

                <Button size="sm" variant="ghost">
                  <LogOut />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 size-4 flex justify-center items-center text-[.7rem] rounded-full">
                2
              </span>
              <Button variant="outline">
                <Bell />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-md p-2 bg-background space-y-2">
            <div className="bg-background z-50 w-full rounded-md border p-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex grow items-center gap-12">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Your application to Win Gatchalian has been approved
                    </p>
                    <p className="text-muted-foreground text-xs">
                      November 20 at 8:00 PM.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View <ExternalLink />
                </Button>
              </div>
            </div>
            <div className="bg-background z-50 w-full rounded-md border p-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="flex grow items-center gap-12">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Live in 27 hours</p>
                    <p className="text-muted-foreground text-xs">
                      November 20 at 8:00 PM.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View <ExternalLink />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <ModeToggle />
      </div>
    </header>
  );
}
