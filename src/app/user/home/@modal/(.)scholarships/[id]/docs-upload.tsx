import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScholarshipTypes } from "@/lib/client-scholarship";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
const documentsSchema = z.object({});

type Meow = {
  selected: ScholarshipTypes | undefined;
};
export default function UploadDocs({ selected }: Meow) {
  console.log(selected);
  const documentsLength = selected?.scholarshipDocuments.length;

  return (
    <div className="p-4 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Apply for Scholarship</h1>
        </div>
        <p className="text-muted-foreground">
          Complete your application by uploading the required documents below.
        </p>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1>Required Documents</h1>
          <h1>/ {documentsLength}</h1>
        </div>
        {selected?.scholarshipDocuments.map((doc, index) => (
          <div key={doc.label} className="space-y-1">
            <div className="flex justify-between items-center">
              <h1>
                {index + 1}. {doc.label}
              </h1>
              <p>{doc.formats.join(", ")}</p>
            </div>
            <Input type="file" accept={doc.formats.join(",")}></Input>
          </div>
        ))}
      </div>
    </div>
  );
}
