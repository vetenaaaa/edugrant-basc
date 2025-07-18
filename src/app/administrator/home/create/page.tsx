"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { MultiSelect } from "@/components/ui/multi-select";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/dark-mode";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LoaderCircleIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import DynamicHeaderAdmin from "../dynamic-header";

const options = [
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
          <div className="space-y-8">
            {/* Scholarship Fields */}
            <div className="grid grid-cols-3 lg:gap-y-10 gap-y-6 gap-x-5 mt-10">
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
                        <Input placeholder="e.g. CHED Scholarship" {...field} />
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
                        <Input placeholder="e.g. CHED" {...field} />
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
                        <Textarea
                          placeholder="Detailed information about the scholarship..."
                          {...field}
                        />
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
                        <Input type="date" {...field} />
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
                        <Input
                          type="number"
                          placeholder="e.g. 5,000"
                          {...field}
                        />
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
                        <Input
                          type="number"
                          placeholder="e.g. 100"
                          {...field}
                        />
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
                            <MultiSelect
                              options={options}
                              selected={field.value || []}
                              onChange={field.onChange}
                              placeholder="Choose formats"
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

            <Button
              onClick={form.handleSubmit(validateAndOpenDrawer)}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>

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
                <p className="text-sm text-gray-500">No documents specified</p>
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
  );
}
