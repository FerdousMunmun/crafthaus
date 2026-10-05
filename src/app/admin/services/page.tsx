import AdminServicesClient from "@/components/admin/AdminServicesClient";
import { getAdminServices } from "@/services/api";

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="border-b border-black/10">
        <div className="container-custom py-12">
          <AdminServicesClient serviceCount={services.length} />
        </div>
      </div>

      <section className="section-padding pt-12">
        <div className="container-custom">
          <div className="overflow-hidden border border-black/10">
            {services.length === 0 ? (
              <div className="p-12 text-center text-[#6f716d]">
                No services found.
              </div>
            ) : (
              services.map((service, index) => (
                <div
                  key={service._id}
                  className="grid gap-6 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[60px_1fr_auto] md:items-center"
                >
                  <span className="text-xs text-[#b8895b]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="text-xl font-medium">
                      {service.title}
                    </h2>

                    <p className="mt-1 text-sm text-[#6f716d]">
                      {service.shortDescription}
                    </p>

                    <div className="mt-3 flex gap-3 text-[10px] uppercase tracking-[0.16em]">
                      <span>{service.slug}</span>

                      <span
                        className={
                          service.published
                            ? "text-green-700"
                            : "text-red-600"
                        }
                      >
                        {service.published
                          ? "Published"
                          : "Unpublished"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="border border-black/10 px-4 py-2 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="border border-red-200 px-4 py-2 text-xs text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}