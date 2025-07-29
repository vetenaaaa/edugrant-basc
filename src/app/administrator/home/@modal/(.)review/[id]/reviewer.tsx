import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserDocument } from "@/lib/types";
import { Expand } from "lucide-react";
export default function Reviewer({
  fileFormat,
  resourceType,
  fileUrl,
  document,
  cloudinaryId,
}: UserDocument) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Expand />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen !max-w-3/4">
        <DialogHeader className="sr-only">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex-1">
            <iframe
              className="h-full w-full object-contain flex justify-center items-center bg-background"
              src={
                resourceType === "image"
                  ? fileUrl
                  : `
                                  
                                  https://docs.google.com/viewer?url=${fileUrl}&embedded=true
                                  
                                                          
                                  `
              }
            ></iframe>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">Mark as Valid</Button>
            <Button className="flex-1">Open new tab</Button>
            <Button className="flex-1">Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
