"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createBlog } from "@/services/api";
import { uploadImage } from "@/services/image";

interface AdminBlogsClientProps {
  blogCount: number;
}

export default function AdminBlogsClient({
  blogCount,
}: AdminBlogsClientProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setAuthor("");
    setImage(null);
    setShowForm(false);
  };

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !title ||
      !slug ||
      !excerpt ||
      !content ||
      !author ||
      !image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(image);

      await createBlog({
        title,
        slug,
        excerpt,
        content,
        image: imageUrl,
        author,
        published: false,
      });

      toast.success("Blog created successfully.");

      resetForm();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
            Admin / Blogs
          </p>

          <h1 className="mt-4 text-4xl font-medium md:text-5xl">
            Blogs
          </h1>

          <p className="mt-3 text-sm text-[#6f716d]">
            {blogCount} blogs in the database.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b]"
        >
          + Add Blog
        </button>
      </div>

      {/* CREATE BLOG MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#f8f7f4] p-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                  New Blog
                </p>

                <h2 className="mt-2 text-3xl font-medium">
                  Add Blog
                </h2>
              </div>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="text-2xl text-[#6f716d] transition hover:text-black"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value)
                  }
                  placeholder="How We Choose Materials for Every Project"
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
                  onChange={(e) =>
                    setSlug(e.target.value)
                  }
                  placeholder="how-we-choose-materials"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Excerpt *
                </label>

                <textarea
                  value={excerpt}
                  onChange={(e) =>
                    setExcerpt(e.target.value)
                  }
                  rows={3}
                  placeholder="Short description of the blog..."
                  className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Content *
                </label>

                <textarea
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  rows={10}
                  placeholder="Write the full blog content..."
                  className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Author *
                </label>

                <input
                  type="text"
                  value={author}
                  onChange={(e) =>
                    setAuthor(e.target.value)
                  }
                  placeholder="CraftHaus Team"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Blog Image *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(
                      e.target.files?.[0] ?? null
                    )
                  }
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="border border-black/10 px-6 py-3 text-sm transition hover:bg-black/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Creating..."
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}