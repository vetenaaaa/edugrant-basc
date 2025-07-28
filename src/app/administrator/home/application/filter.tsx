import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw, Settings2, Undo2 } from "lucide-react";
const frameworks = [
  { value: "bsit", label: "BSIT" },
  { value: "bsab", label: "BSABEN" },
  { value: "bsft", label: "BSFT" },
  { value: "bsge", label: "BSGE" },
  { value: "bsba", label: "BSBA" },
  { value: "bshm", label: "BSHM" },
  { value: "bsa", label: "BSA" },
  { value: "bsagribus", label: "BSAgriBus" },
  { value: "bsdc", label: "BSDC" },
  { value: "bse", label: "BSEd" },
  { value: "bee", label: "BEEd" },
  { value: "bsaf", label: "BSAF" },
  { value: "dvm", label: "DVM" },
];
export default function ApplicationFilter() {
  return (
    <Drawer direction="right" modal={true}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          Advance Filter
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl flex gap-2 items-center">
            {" "}
            <Settings2 />
            Advance Filter
          </DrawerTitle>
          <DrawerDescription>
            Filter applicants by course, scholarship, and more.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-5">
          <div className="space-y-1.5">
            <h1>Course, Year & Section</h1>
            <div className="flex flex-col gap-3">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Course" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((meow) => (
                    <SelectItem key={meow.value} value={meow.value}>
                      {meow.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Year Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1>Scholarships</h1>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter Scholarship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DrawerFooter>
          <Button>
            <RotateCcw />
            Reset
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">
              <Undo2 />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
