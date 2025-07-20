"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ScholarshipTypes } from "@/lib/scholarship-data";

const options: Option[] = [
  { label: "PDF", value: "pdf" },
  { label: "Word Document", value: "docx" },
  { label: "JPEG Image", value: "jpg" },
  { label: "PNG Image", value: "png" },
];

const documentsSchema = z.object({
  label: z.string().min(3, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
});

const convertToDateInputFormat = (dateString: string): string => {
  if (!dateString) return "";

  try {
    // Handle ISO date format (e.g., "2025-08-08T00:00:00.000Z")
    if (dateString.includes("T") || dateString.includes("Z")) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      // Format as YYYY-MM-DD
      return date.toISOString().split("T")[0];
    }

    // Handle MM/DD/YYYY format (fallback)
    const [month, day, year] = dateString.split("/");
    if (!month || !day || !year) return "";

    // Pad month and day with leading zeros if needed
    const paddedMonth = month.padStart(2, "0");
    const paddedDay = day.padStart(2, "0");

    return `${year}-${paddedMonth}-${paddedDay}`;
  } catch (error) {
    console.error("Date conversion error:", error);
    return "";
  }
};

const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  applicationDeadline: z.string().min(1, "Required"),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string().min(1, "Required"),
  detailsImage: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),
  sponsorImage: z
    .any()
    .refine(
      (file) =>
        typeof File !== "undefined" && file instanceof File && file.size > 0,
      { message: "Image is required" }
    ),

  documents: z
    .array(documentsSchema)
    .min(1, "At least one document is required"),
});
interface EditScholarshipProps {
  data: ScholarshipTypes | undefined;
}

type FormData = z.infer<typeof createScholarshipSchema>;

export default function EditScholarship({ data }: EditScholarshipProps) {
  const [isEdit, setIsEdit] = useState(true);
  const form = useForm<FormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: "",
      providerName: "",
      scholarshipDescription: "",
      applicationDeadline: "",
      scholarshipAmount: "",
      scholarshipLimit: "",
      documents: [{ label: "", formats: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  // Populate form with data when it becomes available
  useEffect(() => {
    if (data) {
      console.log("Original deadline:", data.scholarshipDealine);
      const convertedDeadline = convertToDateInputFormat(
        data.scholarshipDealine || ""
      );
      console.log("Converted deadline:", convertedDeadline);
      const transformedDocuments = data.scholarshipDocuments?.map((doc) => ({
        label: doc.label,
        formats: doc.formats.map((format) => String(format)),
      })) || [{ label: "", formats: [] }];

      form.reset({
        scholarshipTitle: data.scholarshipTitle || "",
        providerName: data.scholarshipProvider || "",
        scholarshipDescription: data.scholarshipDescription || "",
        applicationDeadline: convertedDeadline,
        scholarshipAmount: data.scholarshipAmount?.toString() || "",
        scholarshipLimit: "0", // You might need to add this field to ScholarshipTypes
        documents: transformedDocuments,
      });
    }
  }, [data, form]);

  const onSubmit = async (data: FormData) => {};

  return (
    <div className="p-4">
      <Form {...form}>
        <div className="space-y-5">
          <div className="grid grid-cols-3 lg:gap-y-10 gap-y-6 gap-x-5">
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="scholarshipTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Scholarship Title <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isEdit} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-1 col-span-3">
              <FormField
                control={form.control}
                name="providerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Provider Name <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isEdit} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="detailsImage"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Backdrop Image <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      type="file"
                      accept="image/*"
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sponsorImage"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Sponsor Image <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEdit}
                      type="file"
                      accept="image/*"
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="col-span-3">
              <FormField
                control={form.control}
                name="scholarshipDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Scholarship Description <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Textarea disabled={isEdit} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-1 col-span-3">
              <FormField
                control={form.control}
                name="applicationDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Application Deadline <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isEdit} type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-1 col-span-3">
              <FormField
                control={form.control}
                name="scholarshipAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Scholarship Amount <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isEdit} type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-1 col-span-3">
              <FormField
                control={form.control}
                name="scholarshipLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center">
                      Scholarship Limit (0 = unlimited) <FormMessage />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isEdit} type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Dynamic Required Documents */}
          <div className="w-full flex items-center justify-between mt-10">
            <h2 className="font-semibold text-lg">Required Documents</h2>
            <Button
              type="button"
              size="sm"
              disabled={isEdit}
              onClick={() => append({ label: "", formats: [] })}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-1" />
              More requirements
            </Button>
          </div>

          <div className="space-y-4 mt-5">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-3 gap-3 items-center"
              >
                {/* Label */}
                <div className="lg:col-span-1 col-span-3">
                  <FormField
                    control={form.control}
                    name={`documents.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Document Label {index + 1} <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isEdit} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Formats */}
                <div className="lg:col-span-1 col-span-3">
                  <FormField
                    control={form.control}
                    name={`documents.${index}.formats`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Document Formats
                          <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <MultipleSelector
                            disabled={isEdit}
                            commandProps={{
                              label: "Select document formats",
                            }}
                            value={options.filter((option) =>
                              field.value?.includes(option.value)
                            )}
                            defaultOptions={options}
                            placeholder="Choose formats"
                            hideClearAllButton
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No results found
                              </p>
                            }
                            onChange={(selected) => {
                              field.onChange(
                                selected.map((option) => option.value)
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* File + Remove */}
                <div className="lg:col-span-1 col-span-3 flex items-end gap-2 lg:mt-6 mt-3">
                  <Input type="file" disabled />
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={fields.length === 1 || isEdit}
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 sticky bottom-0 py-4 bg-background">
            {isEdit ? (
              <Button className="flex-1" onClick={() => setIsEdit(false)}>
                <Edit />
                Edit
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1" onClick={() => setIsEdit(false)}>
                    <Save />
                    Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Save Changes?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex-1">
                  <Trash2 /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Form>
    </div>
  );
}
