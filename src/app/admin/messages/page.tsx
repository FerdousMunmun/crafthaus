
import { getAdminMessages, toggleAdminMessageRead } from "@/services/api";
import AdminMessagesClient from "@/components/admin/AdminMessagesClient";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="container-custom py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#b8895b]">
          Messages
        </p>

        <h1 className="mt-3 text-4xl text-[#24302b]">
          Contact Messages
        </h1>

        <p className="mt-4 text-[#6f716d]">
          {messages.length} message{messages.length !== 1 ? "s" : ""} received.
        </p>
   <AdminMessagesClient messages={messages} />
      </div>
    </main>
  );
}