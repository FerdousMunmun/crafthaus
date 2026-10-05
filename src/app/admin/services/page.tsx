import AdminServicesClient from "@/components/admin/AdminServicesClient";
import { getAdminServices } from "@/services/api";

export default async function AdminServicesPage() {
  const services = await getAdminServices();

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