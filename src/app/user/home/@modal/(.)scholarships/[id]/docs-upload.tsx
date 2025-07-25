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
import { ScholarshipTypes } from "@/lib/get-scholar-by-id";
import axios from "axios";

export default function UploadDocs({ data }: { data: ScholarshipTypes }) {
  const formSchema = z.object({
    documents: z
      .array(
        z
          .instanceof(File, { message: "Please upload a file" })
          .refine((file) => file.size > 0, "File cannot be empty")
      )
      .length(data.scholarshipDocuments.length, {
        message: `Please upload all ${data.scholarshipDocuments.length} required documents`,
      }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;
  console.log(data);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documents: [],
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    console.log("Uploaded docs:", values.documents);
    try {
      const res = await axios.post(`https://edugrant-express-server-production.up.railway.app/user/applyScholarship`,values.documents,{withCredentials: true})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  // Helper function to get uploaded files count
  const uploadedCount = form.watch("documents").filter(Boolean).length;

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
              {uploadedCount}/{data.scholarshipDocuments.length}
            </h1>
          </div>

          {data.scholarshipDocuments.map((doc, index) => (
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
                      {doc.formats.join(", ")}
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      type="file"
                      accept={doc.formats.join(",")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Update the documents array at the specific index
                          const currentDocs = form.getValues("documents") || [];
                          currentDocs[index] = file;
                          form.setValue("documents", currentDocs);
                          form.trigger(`documents.${index}`);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={uploadedCount !== data.scholarshipDocuments.length}
        >
          Submit Application
        </Button>
      </form>
    </Form>
  );
}
