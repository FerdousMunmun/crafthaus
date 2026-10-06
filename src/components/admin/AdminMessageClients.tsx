"use client";

import { toggleAdminMessageRead } from "@/services/api";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesClient({
  messages,
}: {
  messages: Message[];
}) {
  return (
    <div className="mt-10 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`border bg-white p-6 ${
            message.read
              ? "border-black/10"
              : "border-[#b8895b]"
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg text-[#24302b]">
                  {message.name}
                </h2>

                {!message.read && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#b8895b]">
                    New
                  </span>
                )}
              </div>

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
  );
}