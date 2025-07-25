"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
const createScholarshipSchema = z.object({
  scholarshipTitle: z.string().min(3, "Required"),
  providerName: z.string().min(3, "Required"),
  scholarshipDescription: z.string().min(3, "Required"),
  applicationDeadline: z.string().min(1, "Required"),
  scholarshipAmount: z.string().min(1, "Required"),
  scholarshipLimit: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof createScholarshipSchema>;
export type EditScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  scholarshipDealine: string;
  scholarshipDescription: string;
  scholarshipAmount: string;
  scholarshipLimit: string;
};
export default function EditScholarship({
  data,
}: {
  data: EditScholarshipTypes;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<FormData>({
    resolver: zodResolver(createScholarshipSchema),
    defaultValues: {
      scholarshipTitle: data.scholarshipTitle,
      providerName: data.scholarshipProvider,
      scholarshipDescription: data.scholarshipDescription,
      applicationDeadline: data.scholarshipDealine,
      scholarshipAmount: data.scholarshipAmount.toString(),
      scholarshipLimit: data.scholarshipLimit.toString(),
    },
  });

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <div className="p-8 space-y-5 pt-10">
      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="scholarshipTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  Title <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="scholarshipDescription"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="flex justify-between items-center">
                  Description <FormMessage />
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center gap-3">
            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="px-1 flex justify-between items-center">
                    Deadline <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            if (date) {
                              field.onChange(date.toISOString());
                            }
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholarshipLimit"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex justify-between items-center">
                    Application Limit <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="scholarshipAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  Amount <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button onClick={form.handleSubmit(handleSubmit)}>Edit</Button>
      </Form>
    </div>
  );
}
