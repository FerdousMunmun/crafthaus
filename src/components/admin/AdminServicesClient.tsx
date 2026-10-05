"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createService } from "@/services/api";
import { uploadImage } from "@/services/image";

interface AdminServicesClientProps {
  serviceCount: number;
}

export default function AdminServicesClient({
  serviceCount,
}: AdminServicesClientProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);

    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !slug || !shortDescription || !description || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(image);

      await createService({
        title,
        slug,
        shortDescription,
        description,
        icon,
        image: imageUrl,
        published: false,
      });

      alert("Service created successfully.");

      setShowForm(false);

      setTitle("");
      setSlug("");
      setShortDescription("");
      setDescription("");
      setIcon("");
      setImage(null);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
            Admin / Services
          </p>

          <h1 className="mt-4 text-4xl font-medium md:text-5xl">
            Services
          </h1>

          <p className="mt-3 text-sm text-[#6f716d]">
            {serviceCount} services in the database.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b]"
        >
          + Add Service
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f8f7f4] p-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                  New Service
                </p>

                <h2 className="mt-2 text-3xl font-medium">
                  Add Service
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-2xl text-[#6f716d]"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Kitchen Renovation"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Slug *
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="kitchen-renovation"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Short Description *
                </label>

                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Functional kitchens designed around how you live."
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Description *
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Describe the service in detail..."
                  className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Icon
                </label>

                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="home"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Service Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-black/10 px-6 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}