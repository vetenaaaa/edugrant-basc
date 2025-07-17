// // /app/administrator/home
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function AdminHomePage() {
//   const router = useRouter();
//   const [isAuthenticated] = useState(true);
//   const [loading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "https://edugrant-express-server-production.up.railway.app/administrator/adminLogout",
//         {},
//         { withCredentials: true }
//       );
//       router.replace("/administrator");
//     } catch (error) {
//       console.error("Logout failed", error);
//       // Still redirect even if logout fails
//       router.push("/administrator");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Checking authentication...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-lg">Redirecting...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Your admin content goes here */}

//       </div>
//     </>
//   );
// }
