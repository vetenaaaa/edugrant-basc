"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

// Schema for required documents
const documentsRequired = [
  {
    label: "PNG",
    format: [".jpg", ".docx", ".png"],
  },
  { label: "JPG", format: [".jpg", ".docx", ".png"] },
];

const formSchema = z.object({
  documents: z
    .array(z.instanceof(File).optional())
    .length(documentsRequired.length),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function UploadDocs() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: Array(documentsRequired.length).fill(undefined),
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log("Uploaded docs:", values.documents);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-5">
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
            <h1>
              {documentsRequired.length}/{documentsRequired.length}
            </h1>
          </div>

          {documentsRequired.map((doc, index) => (
            <FormField
              key={doc.label}
              control={form.control}
              name={`documents.${index}`}
              render={() => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>
                      {index + 1}. {doc.label}
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {doc.format}
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      type="file"
                      accept={doc.format.join(",")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        form.setValue(`documents.${index}`, file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
