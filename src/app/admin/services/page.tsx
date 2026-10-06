// import AdminServicesClient from "@/components/admin/AdminServicesClient";
// import { getAdminServices } from "@/services/api";

// export default async function AdminServicesPage() {
//   const services = await getAdminServices();

//   return (
//     <main className="min-h-screen bg-[#f8f7f4]">
//       <div className="border-b border-black/10">
//         <div className="container-custom py-12">
//           <AdminServicesClient
//             serviceCount={services.length}
//             services={services}
//           />
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import AdminServicesClient from "@/components/admin/AdminServicesClient";
import { getAdminServices } from "@/services/api";
import type { Service } from "@/types/service";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getAdminServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load admin services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7f4]">
        <div className="container-custom py-12">
          <p className="text-sm text-[#6f716d]">
            Loading services...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="border-b border-black/10">
        <div className="container-custom py-12">
          <AdminServicesClient
            serviceCount={services.length}
            services={services}
          />
        </div>
      </div>
    </main>
  );
}