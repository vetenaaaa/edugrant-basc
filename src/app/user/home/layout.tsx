import { AppSidebar } from "@/components/ui/client-sidebar";
import { ReactNode } from "react";
import useAuthenticatedUser from "@/lib/get-student-by-id";
interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home({ children, modal }: DashboardLayoutProps) {
  useAuthenticatedUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children} {modal}
      </SidebarInset>
    </SidebarProvider>
  );
}
