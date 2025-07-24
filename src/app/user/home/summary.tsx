import { Activity, CheckCheck, CloudUpload, TrendingUp } from "lucide-react";

export default function SummaryClient() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="space-y-2 bg-background/30 flex flex-col justify-center px-3 py-2 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <TrendingUp />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-blue-600">
            3 pending review
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">All Application</p>
          <p className="text-3xl font-semibold text-blue-600">2</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/30 flex flex-col justify-center px-3 py-2 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <CheckCheck />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-green-600">
            + 0 today
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-semibold text-green-600">0</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/30 flex flex-col justify-center px-3 py-2 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <CloudUpload />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-yellow-500">
            Avg. 14 days review
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-semibold text-yellow-500">0</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/30 flex flex-col justify-center px-3 py-2 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <Activity />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-gray-800/10 text-gray-600">
            Above average
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-3xl font-semibold text-gray-600">2</p>
        </div>
      </div>
    </div>
  );
}
