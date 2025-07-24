// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { ScholarshipTypes } from "@/lib/client-scholarship";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useForm, useFieldArray } from "react-hook-form";
// const documentsSchema = z.object({});

// type Meow = {
//   selected: ScholarshipTypes | undefined;
// };
// export default function UploadDocs({ selected }: Meow) {
//   console.log(selected);
//   const documentsLength = selected?.scholarshipDocuments.length;

//   return (
//     <div className="p-4 space-y-5">
//       <div className="space-y-2">
//         <div className="flex items-center gap-2">
//           <h1 className="text-2xl font-bold">Apply for Scholarship</h1>
//         </div>
//         <p className="text-muted-foreground">
//           Complete your application by uploading the required documents below.
//         </p>
//       </div>
//       <Separator />
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <h1>Required Documents</h1>
//           <h1>/ {documentsLength}</h1>
//         </div>
//         {selected?.scholarshipDocuments.map((doc, index) => (
//           <div key={doc.label} className="space-y-1">
//             <div className="flex justify-between items-center">
//               <h1>
//                 {index + 1}. {doc.label}
//               </h1>
//               <p>{doc.formats.join(", ")}</p>
//             </div>
//             <Input type="file" accept={doc.formats.join(",")}></Input>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  scholarshipDocumentTypes,
  ScholarshipTypes,
} from "@/lib/client-scholarship";
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
import { useState } from "react";


const createDocumentsSchema = (
  scholarshipDocuments: scholarshipDocumentTypes[]
) => {
  const schemaFields: Record<string, z.ZodType> = {};

  scholarshipDocuments.forEach((doc, index) => {
    schemaFields[`document_${index}`] = z
      .instanceof(FileList)
      .refine((files) => files.length > 0, {
        message: `${doc.label} is required`,
      })
      .refine(
        (files) => {
          if (files.length === 0) return false;
          const file = files[0];
          // 10MB file size limit
          return file.size <= 10 * 1024 * 1024;
        },
        {
          message: "File size must be less than 10MB",
        }
      );
  });

  return z.object(schemaFields);
};

type Meow = {
  selected: ScholarshipTypes | undefined;
};

export default function UploadDocs({ selected }: Meow) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selected) {
    return <div>No scholarship selected</div>;
  }

  const documentsLength = selected.scholarshipDocuments.length;
  const documentsSchema = createDocumentsSchema(selected.scholarshipDocuments);

  type DocumentsFormValues = z.infer<typeof documentsSchema>;

  const form = useForm<DocumentsFormValues>({
    resolver: zodResolver(documentsSchema),
  });

  const onSubmit = async (data: DocumentsFormValues) => {
    setIsSubmitting(true);
    try {
    
      console.log("Form data:", data);

     
      const formData = new FormData();
      Object.entries(data).forEach(([key, fileList]) => {
        if (fileList instanceof FileList && fileList.length > 0) {
          formData.append(key, fileList[0]);
        }
      });

    
    } catch (error) {
      console.error("Error uploading documents:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUploadedFileCount = () => {
    const values = form.watch();
    return Object.values(values).filter(
      (fileList) => fileList instanceof FileList && fileList.length > 0
    ).length;
  };

  return (
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between items-center">
            <h1>Required Documents</h1>
            <span className="text-sm text-muted-foreground">
              {getUploadedFileCount()} / {documentsLength}
            </span>
          </div>

          {selected.scholarshipDocuments.map((doc, index) => (
            <FormField
              key={doc.label}
              control={form.control}
              name={`document_${index}` as keyof DocumentsFormValues}
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem className="space-y-1">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base font-medium">
                      {index + 1}. {doc.label}
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {doc.formats.join(", ")}
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept={doc.formats.join(",")}
                      onChange={(e) => onChange(e.target.files)}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Uploading..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
