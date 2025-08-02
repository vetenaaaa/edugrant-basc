// // hooks/useDeclineApplication.ts
// "use client";
// import StyledToast from "@/components/ui/toast-styled";
// import axios from "axios";
// import { useState } from "react";

// export default function useDeclineApplication() {
//   const [loadingDecline, setLoading] = useState(false);
//   const [errorDecline, setError] = useState("");
//   const [successDecline, setSuccess] = useState(false);

//   const decline = async (id: string) => {
//     try {
//       StyledToast(
//         "checking",
//         "Processing Rejection...",
//         "Please wait while we update the application status."
//       );

//       setLoading(true);
//       setError("");
//       setSuccess(false);

//       const res = await axios.post(
//         "https://edugrant-express-server-production.up.railway.app/administrator/declineApplication",
//         { applicationId: id },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         setSuccess(true);
//         console.log("Rejected successfully");
//         StyledToast(
//           "success",
//           "Application Rejected",
//           "The applicant has been notified of the rejection."
//         );
//       }
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.message === "Network Error") {
//         setError("No network connection");
//         StyledToast(
//           "error",
//           "Network Error",
//           "Please check your connection and try again."
//         );
//       } else {
//         setError("Failed to reject application");
//         StyledToast(
//           "error",
//           "Rejection Failed",
//           "There was an error processing the request. Please try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loadingDecline, errorDecline, successDecline, decline };
// }
