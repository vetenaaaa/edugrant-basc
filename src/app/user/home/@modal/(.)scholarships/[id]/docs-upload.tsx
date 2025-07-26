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
import { FileInput, X } from "lucide-react";

export default function UploadDocs({
  data,
  setIsApply,
}: {
  data: ScholarshipTypes;
  setIsApply: (value: boolean) => void;
}) {
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
  const formData = new FormData();

  values.documents.forEach((file) => {
    formData.append("documents", file); // use the field name expected by your backend
  });

  try {
    const res = await axios.post(
      "https://edugrant-express-server-production.up.railway.app/user/applyScholarship",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // axios sets this automatically, but you can include it
        },
      }
    );
    if (res.status === 200) {
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
};

  // Helper function to get uploaded files count
  const uploadedCount = form.watch("documents").filter(Boolean).length;

  return (
    <Form {...form}>
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
      </div>
      <div className="flex gap-3 p-4 absolute bottom-0 w-full left-0">
        <Button
          className="flex-1 bg-green-900 text-foreground hover:bg-green-900 cursor-pointer"
          onClick={form.handleSubmit(onSubmit)}
        >
          <FileInput />
          Apply Now
        </Button>
        <Button
          className="flex-1 cursor-pointer"
          variant="destructive"
          onClick={() => setIsApply(false)}
        >
          <X />
          Cancel Apply
        </Button>
      </div>
    </Form>
  );
}
