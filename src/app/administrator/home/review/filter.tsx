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
import useGetFilter from "@/lib/dynamic-filter";
import { RotateCcw, Settings2, Undo2 } from "lucide-react";

type FilterApplication = {
  setScholar: (scholar: string) => void;
  setCourse: (scholar: string) => void;
  setYear: (scholar: string) => void;
  setSections: (scholar: string) => void;
  scholar: string;
  course: string;
  year: string;
  section: string;
};
export default function ApplicationFilter({
  setScholar,
  setCourse,
  setYear,
  setSections,
  scholar,
  course,
  year,
  section,
}: FilterApplication) {
  const { filter } = useGetFilter();
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
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Course" />
                </SelectTrigger>
                <SelectContent>
                  {filter?.Courses.map((meow) => (
                    <SelectItem key={meow.course} value={meow.course}>
                      {meow.course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Year Level" />
                </SelectTrigger>
                <SelectContent>
                  {filter?.Years.map((meow) => (
                    <SelectItem key={meow.year} value={meow.year.slice(0, 3)}>
                      {meow.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={section} onValueChange={setSections}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Section" />
                </SelectTrigger>
                <SelectContent>
                  {filter?.Sections.map((meow) => (
                    <SelectItem key={meow.section} value={meow.section}>
                      {meow.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1>Scholarships</h1>
            <Select value={scholar} onValueChange={setScholar}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter Scholarship" />
              </SelectTrigger>
              <SelectContent>
                {filter?.Scholarships.map((meow) => (
                  <SelectItem
                    key={meow.scholarshipId}
                    value={meow.scholarshipId.toString()}
                  >
                    {meow.scholarshipTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DrawerFooter>
          <Button
            onClick={() => {
              setScholar("");
              setCourse("");
              setYear("");
              setSections("");
            }}
          >
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
