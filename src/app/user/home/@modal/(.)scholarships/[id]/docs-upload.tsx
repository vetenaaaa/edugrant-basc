"use client";

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
import { useUserStore } from "@/store/useUserStore";
import { DragAndDropArea } from "./reusable";
import { Send, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

interface ScholarshipDocument {
  label: string;
  formats: string[];
}
// Create Zod schema dynamically based on scholarship documents
const createFormSchema = (documents: ScholarshipDocument[]) => {
  const schemaShape: Record<string, z.ZodType> = {};

  documents.forEach((doc) => {
    schemaShape[doc.label] = z
      .array(z.instanceof(File))
      .min(1, `${doc.label} is required`)
      .refine(
        (files) => files.every((file) => doc.formats.includes(file.type)),
        `Invalid file format for ${doc.label}`
      )
      .refine(
        (files) => files.every((file) => file.size <= 2 * 1024 * 1024),
        `File size must be less than 2MB for ${doc.label}`
      );
  });

  return z.object(schemaShape);
};

export default function UploadDocs({
  data,
  setIsApply,
}: {
  data: ScholarshipTypes;
  setIsApply: (value: boolean) => void;
}) {
  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const scholarId = data.scholarshipId;

  // Create form schema based on scholarship documents
  const formSchema = createFormSchema(data.scholarshipDocuments);
  type FormData = z.infer<typeof formSchema>;

  // Initialize default values
  const defaultValues: Record<string, File[]> = {};
  data.scholarshipDocuments.forEach((doc) => {
    defaultValues[doc.label] = [];
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as FormData,
  });

  const handleFilesChange = (label: string, files: File[]) => {
    form.setValue(label as keyof FormData, files as File[]);
    // Trigger validation for this field
    form.trigger(label as keyof FormData);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Submitting:", data);
    try {
      const formData = new FormData();
      formData.append("userId", String(userId));
      formData.append("scholarshipId", String(scholarId));

      Object.entries(data).forEach(([label, files]) => {
        (files as File[]).forEach((file: File) => {
          formData.append(label, file);
        });
      });

      console.log("sending to backend:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await axios.post(
        "https://edugrant-express-server-production.up.railway.app/user/applyScholarship",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        console.log("Upload success:", res.data);
        setIsApply(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const mimeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  return (
    <div className="relative h-full w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 pb-20 grid grid-cols-2 gap-5">
            {data.scholarshipDocuments.map((doc, index) => (
              <FormField
                key={index}
                control={form.control}
                name={doc.label as keyof FormData}
                render={() => (
                  <FormItem>
                    <div className="border-green-950/80 p-3 border rounded-lg bg-background">
                      <FormLabel className="font-bold text-green-800">
                        {doc.label}
                      </FormLabel>
                      <div className="flex justify-between mt-1">
                        <h1 className="text-sm text-gray-200">
                          Required formats
                        </h1>
                        <div className="space-x-1.5">
                          {doc.formats.map((format, formatIndex) => (
                            <Badge
                              key={formatIndex}
                              className="bg-green-900 text-gray-200"
                            >
                              {mimeToLabelMap[format] || format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <FormControl>
                        <DragAndDropArea
                          label={doc.label}
                          accept={doc.formats}
                          onFilesChange={(files) =>
                            handleFilesChange(doc.label, files)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex gap-3 p-4 bottom-0 fixed w-full bg-black border-t-1">
            <Button type="submit" className="flex-1">
              <Send />
              Submit
            </Button>
            <Button
              type="button"
              className="flex-1"
              variant="outline"
              onClick={() => setIsApply(false)}
            >
              <X />
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
