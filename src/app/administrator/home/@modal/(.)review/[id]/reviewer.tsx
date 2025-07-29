import React, { useState, useRef } from "react";
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
import {
  Expand,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

export default function Reviewer({
  fileFormat, // jpg png pdf docx
  resourceType, // image or raw
  fileUrl, // cloudinary direct link
  document, //doc name
  cloudinaryId, // coudinary link id
}: UserDocument) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

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
        <div className="flex flex-col gap-3">
          {/* Document Viewer */}
          <div className="flex-1  overflow-hidden rounded-md border">
            <iframe
              ref={iframeRef}
              className="h-full w-full bg-black"
              src={
                resourceType === "image"
                  ? fileUrl
                  : `https://docs.google.com/viewer?url=${encodeURIComponent(
                      fileUrl
                    )}&embedded=true`
              }
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
              sandbox="allow-same-origin allow-scripts"
              title={`Document preview: ${document}`}
            />
          </div>

          <div className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-center font-medium min-w-16">{zoom}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>

              {resourceType === "image" && (
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="w-4 h-4" />
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button className="flex-1">Approve</Button>
              <Button className="flex-1">Reject</Button>
              <Button className="flex-1">Close</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
