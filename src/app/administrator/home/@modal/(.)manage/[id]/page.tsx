"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createScholarshipSchema } from "../../../create/page";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useScholarshipData from "@/lib/scholarship-data";
import { CheckCheck, PhilippinePeso, Plus, UsersRound, X } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
const options = [
  { label: "PDF", value: "pdf" },
  { label: "Word Document", value: "docx" },
  { label: "JPEG Image", value: "jpg" },
  { label: "PNG Image", value: "png" },
];
export default function InterceptManageScholarship() {
  const { data } = useScholarshipData();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(true);
  const id = params.id;
  const selected = data.find((meow) => meow.scholarshipId == id);
  console.log(selected);
  type FormData = z.infer<typeof createScholarshipSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: selected?.scholarshipTitle,
      providerName: "",
      scholarshipDescription: "",
      applicationDeadline: "",
      scholarshipAmount: "",
      scholarshipLimit: "",
      documents: [{ label: "", formats: [] }],
    },
  });
useEffect(() => {
  if (selected) {
    form.reset({
      scholarshipTitle: selected.scholarshipTitle || "",
      providerName: selected.scholarshipProvider || "",
      scholarshipDescription: selected.scholarshipDescription || "",
      applicationDeadline: selected.scholarshipDealine || "",
      scholarshipAmount: selected.scholarshipAmount?.toString() || "",
   
    });
  }
}, [selected, form]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "documents",
  });

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          router.back();
        }
      }}
    >
      <DrawerContent className="w-[900px] mx-auto h-[90vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-auto">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="account">Overview</TabsTrigger>
              <TabsTrigger value="password">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="">
                <div className="relative">
                  <div className="relative h-48 md:h-64 ">
                    <img
                      src={selected?.scholarshipCover}
                      alt="Scholarship Cover"
                      className="w-full h-full object-cover mask-gradient"
                    />
                    <div className="absolute flex items-end gap-3 -bottom-10 left-4 right-4">
                      <div className="size-35 rounded-full overflow-hidden">
                        <img
                          src={selected?.scholarshipLogo}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {selected?.scholarshipTitle}
                        </h1>
                        <p className="text-white/90 flex items-center gap-1">
                          by {selected?.scholarshipProvider}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 mt-20">
                  {/* Key Information */}
                  <div className="grid md:grid-cols-3 gap-4 mt-10">
                    <div className="flex items-center gap-3 border p-4 rounded-md">
                      <UsersRound size={20} />
                      <div>
                        <p className="text-2xl font-semibold">
                          {selected?.totalApplicants}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Applicants
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border p-4 rounded-md">
                      <CheckCheck className="w-8 h-8 " />
                      <div>
                        <p className="text-2xl font-semibold">
                          {selected?.totalApproved}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Approved
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border p-4 rounded-md">
                      <PhilippinePeso className="w-8 h-8" />
                      <div>
                        <p className="text-2xl font-semibold">
                          {selected?.scholarshipAmount}
                        </p>
                        <p className="text-sm text-muted-foreground">Amount</p>
                      </div>
                    </div>
                  </div>

                  {/* Scholarship Details */}

                  <div className=" mt-10 space-y-2">
                    <h2 className=" font-semibold">Details</h2>
                    <p className="text-muted-foreground leading-relaxed  px-4 border-l-2 border-green-800">
                      {selected?.scholarshipDescription}
                    </p>
                  </div>

                  <div className="mt-10 space-y-2">
                    <h1 className="font-semibold">
                      Required Documents (
                      {selected?.scholarshipDocuments.length})
                    </h1>
                    {selected?.scholarshipDocuments.map((docs) => (
                      <div
                        key={docs.label}
                        className="flex border justify-between items-center p-4 gap-5 rounded-sm"
                      >
                        <h1>{docs.label}</h1>

                        <p>{docs.formats.map((format) => format).join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password">
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
                              <Input {...field} />
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
                    <h2 className="font-semibold text-lg">
                      Required Documents
                    </h2>
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

                  <Button className="w-full">Submit</Button>
                </div>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter>
          <div className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="flex-1" variant="destructive">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="flex-1" variant="outline">
              Close
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
