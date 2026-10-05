import Sidebar from "@/components/admin/Sidebar";
import AdminToaster from "@/components/admin/AdminToaster"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#f8f7f4]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>

      <AdminToaster />
    </div>
  );
}