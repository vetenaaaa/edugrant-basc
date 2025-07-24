import { AppSidebar } from "@/components/ui/client-sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home({ children, modal }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children} {modal}
      </SidebarInset>
    </SidebarProvider>
  );
}
