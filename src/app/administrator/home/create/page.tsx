"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
  AlertCircleIcon,
  ArrowLeft,
  ImageUpIcon,
  LoaderCircleIcon,
  Plus,
  X,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import DynamicHeaderAdmin from "../dynamic-header";
import { useFileUpload } from "@/lib/use-file-upload";

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

type FormData = z.infer<typeof createScholarshipSchema>;

export default function Create() {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;

  // Separate file upload hooks for each image
  const [
    {
      files: detailsFiles,
      isDragging: detailsIsDragging,
      errors: detailsErrors,
    },
    {
      handleDragEnter: detailsHandleDragEnter,
      handleDragLeave: detailsHandleDragLeave,
      handleDragOver: detailsHandleDragOver,
      handleDrop: detailsHandleDrop,
      openFileDialog: detailsOpenFileDialog,
      removeFile: detailsRemoveFile,
      getInputProps: detailsGetInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const [
    {
      files: sponsorFiles,
      isDragging: sponsorIsDragging,
      errors: sponsorErrors,
    },
    {
      handleDragEnter: sponsorHandleDragEnter,
      handleDragLeave: sponsorHandleDragLeave,
      handleDragOver: sponsorHandleDragOver,
      handleDrop: sponsorHandleDrop,
      openFileDialog: sponsorOpenFileDialog,
      removeFile: sponsorRemoveFile,
      getInputProps: sponsorGetInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const detailsPreviewUrl = detailsFiles[0]?.preview || null;
  const sponsorPreviewUrl = sponsorFiles[0]?.preview || null;

  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    if (detailsFiles[0]?.file) {
      form.setValue("detailsImage", detailsFiles[0].file);
      form.clearErrors("detailsImage");
    }
  }, [detailsFiles, form]);

  useEffect(() => {
    if (sponsorFiles[0]?.file) {
      form.setValue("sponsorImage", sponsorFiles[0].file);
      form.clearErrors("sponsorImage");
    }
  }, [sponsorFiles, form]);
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
      console.log("scholarshipTitle:", data.scholarshipTitle);

      formDataToSend.append("newScholarProvider", data.providerName);
      console.log("providerName:", data.providerName);

      formDataToSend.append(
        "newScholarDescription",
        data.scholarshipDescription
      );
      console.log("scholarshipDescription:", data.scholarshipDescription);

      formDataToSend.append("applicationStartDate", today);
      console.log("startDate:", today);
      formDataToSend.append("newScholarDeadline", data.applicationDeadline);
      console.log("applicationDeadline:", data.applicationDeadline);

      formDataToSend.append("scholarshipAmount", data.scholarshipAmount);
      console.log("scholarshipAmount:", data.scholarshipAmount);

      formDataToSend.append("scholarshipLimit", data.scholarshipLimit);
      console.log("scholarshipLimit:", data.scholarshipLimit);

      if (data.detailsImage) {
        formDataToSend.append("coverImg", data.detailsImage);
        console.log("detailsImage file:", data.detailsImage);
        console.log("Image name:", data.detailsImage.name);
        console.log("Image type:", data.detailsImage.type);
        console.log("Image size (bytes):", data.detailsImage.size);
      } else {
        console.warn("No image file selected");
      }
      if (data.sponsorImage) {
        formDataToSend.append("sponsorLogo", data.sponsorImage);
        console.log("sponsorImage file:", data.sponsorImage);
        console.log("Image name:", data.sponsorImage.name);
        console.log("Image type:", data.sponsorImage.type);
        console.log("Image size (bytes):", data.sponsorImage.size);
      } else {
        console.warn("No image file selected");
      }

      formDataToSend.append("requirements", JSON.stringify(data.documents));

      const res = await axios.post(
        `https://edugrant-express-server-production.up.railway.app/administrator/adminAddScholarships`,
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
          applicationDeadline: "",
          scholarshipAmount: "",
          scholarshipLimit: "",
          detailsImage: undefined,
          sponsorImage: undefined,
          documents: [{ label: "", formats: [] }],
        });

        console.log("Scholarship created successfully!");
        toast("Scholarship has been created", {
          description:
            "The scholarship opportunity has been successfully added to the system.",
        });

        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const validateAndOpenDrawer = () => {
    setOpen(true);
  };
  const getFileDisplayName = (file: File | undefined) => {
    if (!file) return "No file selected";
    return file.name;
  };
  const getFormatsDisplay = (formats: string[]) => {
    if (!formats || formats.length === 0) return "No formats selected";
    return options
      .filter((option) => formats.includes(option.value))
      .map((option) => option.label)
      .join(", ");
  };

  return (
    <div className="pl-1 pr-2 your-class">
      <DynamicHeaderAdmin first="Scholarship" second="Create" />

      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">
          Create a New Scholarship Opportunity
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the form below to add a new scholarship.
        </p>
        <Form {...form}>
          <div className="space-y-5 mt-10">
            {/* Scholarship Fields */}
            <div className="space-y-5  border p-4 rounded-md bg-background/30">
              <div className="w-full ">
                <h2 className="font-semibold text-lg">Scholarship Details</h2>
              </div>
              <div className="grid grid-cols-3 gap-5">
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
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Application Deadline <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
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
                          Scholarship Limit (0 = unlimited) <FormMessage />
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
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

            <div className="w-full flex gap-5  border p-4 rounded-md bg-background/30">
              {/* Backdrop Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="detailsImage"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg flex justify-between">
                        Backdrop Image <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div
                            role="button"
                            onClick={() => {
                              detailsOpenFileDialog();
                            }}
                            onDragEnter={detailsHandleDragEnter}
                            onDragLeave={detailsHandleDragLeave}
                            onDragOver={detailsHandleDragOver}
                            onDrop={(e) => {
                              detailsHandleDrop(e);
                              // Update form field when file is dropped
                              setTimeout(() => {
                                if (detailsFiles[0]?.file) {
                                  onChange(detailsFiles[0].file);
                                }
                              }, 0);
                            }}
                            data-dragging={detailsIsDragging || undefined}
                            className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-35 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                          >
                            <input
                              {...detailsGetInputProps()}
                              className="sr-only"
                              aria-label="Upload backdrop image"
                            />
                            {detailsPreviewUrl ? (
                              <div className="absolute inset-0">
                                <img
                                  src={detailsPreviewUrl}
                                  alt={
                                    detailsFiles[0]?.file?.name ||
                                    "Backdrop image"
                                  }
                                  className="size-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                <div
                                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                  aria-hidden="true"
                                >
                                  <ImageUpIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">
                                  Drop your backdrop image here or click to
                                  browse
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  Max size: {maxSizeMB}MB
                                </p>
                              </div>
                            )}
                          </div>
                          {detailsPreviewUrl && (
                            <div className="absolute top-4 right-4">
                              <button
                                type="button"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  detailsRemoveFile(detailsFiles[0]?.id);
                                  onChange(undefined);
                                }}
                                aria-label="Remove backdrop image"
                              >
                                <XIcon className="size-4" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      {detailsErrors.length > 0 && (
                        <div
                          className="text-destructive flex items-center gap-1 text-xs"
                          role="alert"
                        >
                          <AlertCircleIcon className="size-3 shrink-0" />
                          <span>{detailsErrors[0]}</span>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Sponsor Logo Image */}
              <div className="flex flex-col flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="sponsorImage"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-lg flex justify-between">
                        Logo Image
                        <FormMessage />
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div
                            role="button"
                            onClick={() => {
                              sponsorOpenFileDialog();
                            }}
                            onDragEnter={sponsorHandleDragEnter}
                            onDragLeave={sponsorHandleDragLeave}
                            onDragOver={sponsorHandleDragOver}
                            onDrop={(e) => {
                              sponsorHandleDrop(e);
                              // Update form field when file is dropped
                              setTimeout(() => {
                                if (sponsorFiles[0]?.file) {
                                  onChange(sponsorFiles[0].file);
                                }
                              }, 0);
                            }}
                            data-dragging={sponsorIsDragging || undefined}
                            className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-35 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                          >
                            <input
                              {...sponsorGetInputProps()}
                              className="sr-only"
                              aria-label="Upload sponsor logo"
                            />
                            {sponsorPreviewUrl ? (
                              <div className="absolute inset-0">
                                <img
                                  src={sponsorPreviewUrl}
                                  alt={
                                    sponsorFiles[0]?.file?.name ||
                                    "Sponsor logo"
                                  }
                                  className="size-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                <div
                                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                  aria-hidden="true"
                                >
                                  <ImageUpIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">
                                  Drop your logo image here or click to browse
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  Max size: {maxSizeMB}MB
                                </p>
                              </div>
                            )}
                          </div>
                          {sponsorPreviewUrl && (
                            <div className="absolute top-4 right-4">
                              <button
                                type="button"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sponsorRemoveFile(sponsorFiles[0]?.id);
                                  onChange(undefined);
                                }}
                                aria-label="Remove sponsor logo"
                              >
                                <XIcon className="size-4" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </FormControl>

                      {sponsorErrors.length > 0 && (
                        <div
                          className="text-destructive flex items-center gap-1 text-xs"
                          role="alert"
                        >
                          <AlertCircleIcon className="size-3 shrink-0" />
                          <span>{sponsorErrors[0]}</span>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Dynamic Required Documents */}
            <div className="space-y-5 border p-4 rounded-md bg-background/30">
              <div className="w-full flex items-center justify-between ">
                <h2 className="font-semibold text-lg">Required Documents</h2>
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

            <Button
              onClick={form.handleSubmit(validateAndOpenDrawer)}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Form>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="w-3/4 mx-auto h-[85vh]">
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold">
                Review & Submit Scholarship
              </DrawerTitle>
              <DrawerDescription>
                Please review the scholarship details before submitting.
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm overflow-y-auto">
              <div className="flex gap-3 items-center">
                <h1 className="text-muted-foreground font-semibold w-[120px]">
                  Scholarship Title
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {" "}
                  {formData.scholarshipTitle || "Not specified"}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Provider Name
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {formData.providerName || "Not specified"}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Description
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {formData.scholarshipDescription || "No description provided"}
                </p>
              </div>
              <div className="flex gap-3 items-center ">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Amount
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {formData.scholarshipAmount || "Not specified"}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Start Date
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {today}
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Deadline
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {formData.applicationDeadline || "Not specified"}
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Limit
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {formData.scholarshipLimit || "Not specified"}
                </p>
              </div>

              <div className="flex gap-3 items-center ">
                <h1 className="text-muted-foreground font-semibold  w-[120px]">
                  Backdrop Image
                </h1>
                <p className="text-lg font-bold border p-2 rounded flex-1">
                  {getFileDisplayName(formData.detailsImage)}
                </p>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-3 mt-5">
                <h1 className="col-span-2 text-xl font-mono">
                  Required Documents
                </h1>
                {formData.documents && formData.documents.length > 0 ? (
                  formData.documents.map((doc, index) => (
                    <div className="flex gap-3 items-center " key={index}>
                      <h1 className="text-muted-foreground font-semibold  w-[120px]">
                        Document {index + 1}
                      </h1>
                      <div className=" border p-2 rounded flex-1 space-y-1">
                        <div className="font-semibold">
                          {doc.label || "Untitled Document"}
                        </div>
                        <p className="text-green-600">
                          Formats: {getFormatsDisplay(doc.formats)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No documents specified
                  </p>
                )}
              </div>
            </div>
            <DrawerFooter>
              <div className="w-full flex justify-end">
                <div className="flex gap-3 w-1/2 justify-end">
                  <Button
                    className="flex-1"
                    onClick={() => setOpen(false)}
                    disabled={loading}
                  >
                    <ArrowLeft /> Back
                  </Button>
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
                    {loading ? "Submitting..." : "Submit Scholarship"}
                  </Button>
                </div>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

//  <FormField
//                 control={form.control}
//                 name="detailsImage"
//                 render={({ field: { onChange, onBlur, name, ref } }) => (
//                   <FormItem>
//                     <FormLabel className="flex justify-between items-center">
//                       Backdrop Image <FormMessage />
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         accept="image/*"
//                         name={name}
//                         onBlur={onBlur}
//                         ref={ref}
//                         onChange={(e) => onChange(e.target.files?.[0])}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="sponsorImage"
//                 render={({ field: { onChange, onBlur, name, ref } }) => (
//                   <FormItem>
//                     <FormLabel className="flex justify-between items-center">
//                       Sponsor Image <FormMessage />
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         accept="image/*"
//                         name={name}
//                         onBlur={onBlur}
//                         ref={ref}
//                         onChange={(e) => onChange(e.target.files?.[0])}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
