import { CircleCheck, LoaderCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function StyledToast(
  status: string,
  title: string,
  description: string
) {
  if (status === "success") {
    toast.custom(() => (
      <div className="flex items-center gap-4 p-4 border border-green-800 bg-green-900 text-white rounded-md shadow-md w-sm">
        <CircleCheck className="text-green-300 size-6" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs text-green-100">{description}</span>
        </div>
      </div>
    ));
  }

  if (status === "error") {
    toast.custom(() => (
      <div className="flex items-center gap-4 p-4 border border-red-800 bg-red-900 text-white rounded-md shadow-md w-sm">
        <XCircle className="text-red-300 size-6" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs text-red-100">{description}</span>
        </div>
      </div>
    ));
  }

  if (status === "checking") {
    toast.custom(() => (
      <div className="flex items-center gap-4 p-4 border border-green-950/80 bg-black text-foreground rounded-md shadow-md w-sm">
        <LoaderCircle className="animate-spin text-green-600 size-8" />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </div>
    ));
  }
}
