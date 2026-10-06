"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { sendContactMessage } from "@/services/api";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage({
        name,
        email,
        phone,
        message,
      });

      toast.success(
        "Your message has been sent successfully."
      );

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* HEADER */}
      <section className="border-b border-black/10">
        <div className="container-custom py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
            Contact / Start a Project
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-tight md:text-7xl">
            Let&apos;s build something
            <br />
            worth coming home to.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#6f716d]">
            Tell us about your renovation, carpentry,
            or interior project. We&apos;ll get back to
            you with the next steps.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section-padding">
        <div className="container-custom grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          {/* INFO */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl font-medium">
              Start the conversation.
            </h2>

            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6f716d]">
                  Email
                </p>

                <p className="mt-2">
                  hello@crafthaus.com
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6f716d]">
                  Phone
                </p>

                <p className="mt-2">
                  +880 1000 000 000
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6f716d]">
                  Studio
                </p>

                <p className="mt-2">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="border border-black/10 bg-white p-6 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full border border-black/10 bg-[#f8f7f4] px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Email *
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full border border-black/10 bg-[#f8f7f4] px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs uppercase tracking-wider">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="+880..."
                className="w-full border border-black/10 bg-[#f8f7f4] px-4 py-3 outline-none focus:border-[#b8895b]"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs uppercase tracking-wider">
                Message *
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                rows={8}
                placeholder="Tell us about your project..."
                className="w-full resize-none border border-black/10 bg-[#f8f7f4] px-4 py-3 outline-none focus:border-[#b8895b]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-[#24302b] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#b8895b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}