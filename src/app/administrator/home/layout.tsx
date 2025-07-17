import { AppSidebar } from "@/components/ui/app-side";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
interface DashboardLayoutProps {
  children: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
      <Toaster
        richColors
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff", 
          },
          className: "my-toast",
        }}
      />
    </SidebarProvider>
  );
}
