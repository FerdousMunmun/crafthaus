
import { getAdminMessages, toggleAdminMessageRead } from "@/services/api";

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
        <div className="mt-10 space-y-4">
  {messages.map((message: any) => (
    <div
      key={message._id}
      className="border border-black/10 bg-white p-6"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-lg text-[#24302b]">
            {message.name}
          </h2>

          <p className="mt-1 text-sm text-[#6f716d]">
            {message.email}
          </p>
        </div>

        <span className="text-xs text-[#6f716d]">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>

      {message.phone && (
        <p className="mt-4 text-sm text-[#6f716d]">
          Phone: {message.phone}
        </p>
      )}

      <p className="mt-4 text-sm leading-7 text-[#24302b]">
        {message.message}
      </p>
      <button
  onClick={async () => {
    await toggleAdminMessageRead(message._id);
    window.location.reload();
  }}
  className="mt-5 border border-black/10 px-4 py-2 text-xs transition hover:bg-[#24302b] hover:text-white"
>
  {message.read ? "Mark as Unread" : "Mark as Read"}
</button>
    </div>
  ))}
</div>
      </div>
    </main>
  );
}