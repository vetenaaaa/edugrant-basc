"use client";
import { usePathname } from "next/navigation";

import DynamicHeader from "../dynamic-header";

export default function ClientApplication() {
  const path = usePathname();
  const segmentedPath = path.split("/");
  return (
    <div className="pl-1 pr-2 your-class min-h-screen">
      <DynamicHeader first={segmentedPath[2]} second={segmentedPath[3]} />
    </div>
  );
}
