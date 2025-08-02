// // hooks/useApproveApplication.ts
// "use client";
// import StyledToast from "@/components/ui/toast-styled";
// import axios from "axios";
// import { useState } from "react";

// export default function useApproveApplication() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const approve = async (id: string) => {
//     try {
//       StyledToast(
//         "checking",
//         "Processing Approval...",
//         "Please wait while we approve the application."
//       );

//       setLoading(true);
//       setError(false);
//       setSuccess(false);

   

//       if (res.status === 200) {
//         setSuccess(true);
//         console.log("Approved successfully");
//         StyledToast(
//           "success",
//           "Application Approved",
//           "The applicant has been notified and granted access."
//         );
//       }
//     } catch (err) {
//       setError(true);
//       if (axios.isAxiosError(err) && err.message === "Network Error") {
//         StyledToast(
//           "error",
//           "Network Error",
//           "Please check your connection and try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, success, approve };
// }
