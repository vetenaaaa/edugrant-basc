"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import SpotlightBorderWrapper from "@/components/ui/border";
function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function DragAndDropArea({
  label,
  accept,
  onFilesChange,
}: {
  label: string;
  accept: string[];
  onFilesChange: (files: File[]) => void;
}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const maxSize = 2 * 1024 * 1024; // 2MB

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles(acceptedFiles);
      onFilesChange(acceptedFiles);
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxSize: 2 * 1024 * 1024,
      accept: accept.reduce((acc, type) => {
        acc[type] = [];

        return acc;
      }, {} as Record<string, string[]>),
      disabled: uploadedFiles.length > 0, // ✅ Disable dropzone if files exist
    });
  // const clearAllFiles = () => {
  //   setUploadedFiles([]);
  //   onFilesChange([]);
  // };
  return (
    <SpotlightBorderWrapper>
      <div className="space-y-3">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border border-dashed rounded-lg p-6 text-center transition bg-green-950/20
  ${
    uploadedFiles.length > 0
      ? "cursor-not-allowed opacity-70 text-muted-foreground/20 bg-muted/20  hover:bg-muted/20"
      : "cursor-pointer"
  }
  ${
    isDragActive && uploadedFiles.length === 0
      ? "border-primary bg-accent/30"
      : "border-card hover:bg-green-950/30"
  }
`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-13 h-13 text-muted-foreground mb-2 border p-3 rounded-full" />
          <p className="text-muted-foreground text-sm">
            {isDragActive
              ? `Drop your ${label} file here...`
              : `Drag & drop or click to upload ${label} `}
          </p>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-2 space-y-1 text-sm text-red-700 text-center">
            {fileRejections.map(({ file, errors }) =>
              errors.map((e) => (
                <p key={`${file.name}-${e.code}`}>
                  {e.code === "file-too-large"
                    ? `${
                        file.name
                      } is too large. Max allowed size is ${formatBytes(
                        maxSize
                      )}.`
                    : e.message}
                </p>
              ))
            )}
          </div>
        )}

        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const previewUrl = isImage ? URL.createObjectURL(file) : null;

            return (
              <div
                key={file.name}
                className="flex items-center gap-3 justify-between border border-border rounded-lg p-2 mb-2"
              >
                {/* Preview */}
                <div className="flex items-center gap-3">
                  {isImage ? (
                    <img
                      src={previewUrl!}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xl">
                      📄
                    </div>
                  )}
                  {/* File name */}
                  <span className="text-sm break-all max-w-[200px] truncate">
                    {file.name}
                  </span>
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newFiles = uploadedFiles.filter(
                      (_, i) => i !== index
                    );
                    setUploadedFiles(newFiles);
                    onFilesChange(newFiles);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
      </div>
    </SpotlightBorderWrapper>
  );
}
// "use client";

// import { Input } from "@/components/ui/input";
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
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { ScholarshipTypes } from "@/lib/get-scholar-by-id";
// import axios from "axios";
// import { FileInput, X } from "lucide-react";
// import { useUserStore } from "@/store/useUserStore";

// export default function UploadDocs({
//   data,
//   setIsApply,
// }: {
//   data: ScholarshipTypes;
//   setIsApply: (value: boolean) => void;
// }) {
//   const user = useUserStore((state) => state.user);
//   const userId = user?.userId;
//   const scholarId = data.scholarshipId;
//   const formSchema = z.object({
//     documents: z
//       .array(
//         z
//           .instanceof(File, { message: "Please upload a file" })
//           .refine((file) => file.size > 0, "File cannot be empty")
//       )
//       .length(data.scholarshipDocuments.length, {
//         message: `Please upload all ${data.scholarshipDocuments.length} required documents`,
//       }),
//   });

//   type FormSchemaType = z.infer<typeof formSchema>;
//   console.log(data);

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       documents: [],
//     },
//   });

//   const onSubmit = async (values: FormSchemaType) => {
//     try {
//       const formData = new FormData();
//       formData.append("userId", String(userId));
//       formData.append("scholarshipId", String(scholarId));

//       values.documents.forEach((file, index) => {
//         const label = data.scholarshipDocuments[index]?.label;
//         if (label && file) {
//           formData.append(label, file);
//         }
//       });

//       console.log("sending to backend:");
//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const res = await axios.post(
//         "https://edugrant-express-server-production.up.railway.app/user/applyScholarship",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.status === 200) {
//         console.log("Upload success:", res.data);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   const uploadedCount = form.watch("documents").filter(Boolean).length;

//   return (
//     <Form {...form}>
//       <div className="p-4 space-y-5">
//         {/* <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <h1 className="text-2xl font-bold">Apply for Scholarship</h1>
//           </div>
//           <p className="text-muted-foreground">
//             Complete your application by uploading the required documents below.
//           </p>
//         </div>

//         <Separator /> */}

//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h1>Required Documents</h1>
//             <h1>
//               {uploadedCount}/{data.scholarshipDocuments.length}
//             </h1>
//           </div>

//           {data.scholarshipDocuments.map((doc, index) => (
//             <FormField
//               key={doc.label}
//               control={form.control}
//               name={`documents.${index}`}
//               render={() => (
//                 <FormItem>
//                   <div className="flex justify-between items-center">
//                     <FormLabel>
//                       {index + 1}. {doc.label}
//                     </FormLabel>
//                     <p className="text-sm text-muted-foreground">
//                       {doc.formats.join(", ")}
//                     </p>
//                   </div>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept={doc.formats.join(",")}
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           const currentDocs = form.getValues("documents") || [];
//                           currentDocs[index] = file;
//                           form.setValue("documents", currentDocs);
//                           form.trigger(`documents.${index}`);
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="flex gap-3 p-4 absolute bottom-0 w-full left-0">
//         <Button
//           className="flex-1 bg-green-900 text-foreground hover:bg-green-900 cursor-pointer"
//           onClick={form.handleSubmit(onSubmit)}
//         >
//           <FileInput />
//           Apply Now
//         </Button>
//         <Button
//           className="flex-1 cursor-pointer"
//           variant="destructive"
//           onClick={() => setIsApply(false)}
//         >
//           <X />
//           Cancel Apply
//         </Button>
//       </div>
//     </Form>
//   );
// }
