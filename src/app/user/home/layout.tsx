"use client";
import { AppSidebar } from "@/components/ui/client-sidebar";
import { ReactNode } from "react";
import useAuthenticatedUser from "@/lib/get-student-by-id";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="fixed your-class h-screen w-full"></div>
        {children} {modal}
        <Toaster richColors position="bottom-right" />
      </SidebarInset>
    </SidebarProvider>
  );
}
