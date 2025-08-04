"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, LoaderCircleIcon, PenLine, Plus, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import DynamicHeaderAdmin from "../dynamic-header";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DragAndDropArea } from "@/app/user/home/@modal/(.)scholarships/[id]/reusable";
import StyledToast from "@/components/ui/toast-styled";

const options: Option[] = [
  { label: "PDF", value: "application/pdf" },
  {
    label: "Word Document",
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { label: "JPEG Image", value: "image/jpeg" },
  { label: "PNG Image", value: "image/png" },
];

const documentsSchema = z.object({
  label: z.string().min(3, "Requireds"),
  formats: z.array(z.string()).min(1, "Required"),
});

const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  applicationDeadline: z.date({
    message: "Required",
  }),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string(),
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

type FormData = z.infer<typeof createScholarshipSchema>;

export default function Create() {
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: "",
      providerName: "",
      scholarshipDescription: "",
      applicationDeadline: undefined,
      scholarshipAmount: "",
      scholarshipLimit: "",
      documents: [{ label: "", formats: [] }],
    },
  });

  const formData = form.watch();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();

      formDataToSend.append("newScholarTitle", data.scholarshipTitle);
      formDataToSend.append("newScholarProvider", data.providerName);
      formDataToSend.append(
        "newScholarDescription",
        data.scholarshipDescription
      );
      formDataToSend.append("applicationStartDate", today);
      formDataToSend.append(
        "newScholarDeadline",
        formData.applicationDeadline.toISOString()
      );
      formDataToSend.append("scholarshipAmount", data.scholarshipAmount);
      formDataToSend.append("scholarshipLimit", data.scholarshipLimit);

      if (data.detailsImage) {
        formDataToSend.append("coverImg", data.detailsImage);
      }

      if (data.sponsorImage) {
        formDataToSend.append("sponsorLogo", data.sponsorImage);
      }

      formDataToSend.append("requirements", JSON.stringify(data.documents));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/adminAddScholarships`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        form.reset({
          scholarshipTitle: "",
          providerName: "",
          scholarshipDescription: "",
          applicationDeadline: undefined,
          scholarshipAmount: "",
          scholarshipLimit: "",
          detailsImage: undefined,
          sponsorImage: undefined,
          documents: [{ label: "", formats: [] }],
        });

        StyledToast(
          "success",
          "Scholarship Created",
          "The scholarship has been added successfully."
        );

        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      StyledToast(
        "error",
        "Creation Failed",
        "We couldn’t create the scholarship. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <DynamicHeaderAdmin first="Scholarship" second="Create" />

      <div className="mx-auto lg:w-[70%] w-[95%] py-10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <PenLine />
          Create a New Scholarship Opportunity
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new scholarship.
        </p>
        <Form {...form}>
          <div className="space-y-5 mt-10">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="scholarshipTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Title <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Provider Name <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="scholarshipAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Amount <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="applicationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center justify-between">
                        Deadline <FormMessage />
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full  text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <div className="">
                <FormField
                  control={form.control}
                  name="scholarshipLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        Scholarship Limit (optional)
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Leave blank if no limit"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

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
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="space-y-5 mt-10">
            <div className="w-full flex gap-5">
              {/* Backdrop Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="detailsImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg">
                        Details Cover
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
                          label="backdrop image"
                          accept={["image/png", "image/jpeg", "image/jpg"]}
                          onFilesChange={(files) => field.onChange(files[0])} // Single file
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sponsor Logo Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="sponsorImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg">
                        Sponsor Logo/Image
                      </FormLabel>
                      <FormControl>
                        <DragAndDropArea
                          label="sponsor logo"
                          accept={["image/png", "image/jpeg", "image/jpg"]}
                          onFilesChange={(files) => field.onChange(files[0])} // Single file
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Required Documents */}
          <div className="space-y-5 mt-10">
            <div className="w-full flex items-center justify-end ">
              <Button
                type="button"
                size="sm"
                onClick={() => append({ label: "", formats: [] })}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                More requirements
              </Button>
            </div>

            <div className="space-y-5">
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
                            <Input placeholder="e.g. COR" {...field} />
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
                              className="bg-white/5"
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
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full mt-15">
                Submit Scholarship
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit this scholarship?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading}
                  className="flex-1"
                  variant="outline"
                >
                  {loading && (
                    <LoaderCircleIcon
                      className="-ms-1 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                  )}
                  {loading ? "Submitting..." : "Yes, Submit"}
                </Button>

                <AlertDialogCancel className="flex items-center gap-1">
                  <X />
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Form>
      </div>
    </div>
  );
}
