"use client";
import { ChevronDownIcon, Save, X } from "lucide-react";
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
import { useState } from "react";
import { EditScholarshipTypes } from "@/lib/types";
import { useEditScholarshipForm } from "@/lib/use-edit-scholarship-form";
import { useScholarshipSubmission } from "@/lib/edit-scholarship-submission";
export default function EditScholarship({
  data,
  setEditMode,
}: {
  data: EditScholarshipTypes;
  setEditMode: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { form, schema } = useEditScholarshipForm(data);
  const { handleSubmit } = useScholarshipSubmission();

  return (
    <div className="p-4 ">
      <Form {...form}>
        <div className="space-y-6">
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
      </Form>
      <div className="flex gap-3 w-full absolute bottom-0 left-0 p-4">
        <Button
          onClick={form.handleSubmit(handleSubmit)}
          className="flex-1 bg-green-800 text-white hover:bg-green-700"
        >
          <Save /> Save
        </Button>

        <Button
          onClick={() => setEditMode(false)}
          className="flex-1"
          variant="outline"
        >
          <X />
          Cancel
        </Button>
      </div>
    </div>
  );
}
