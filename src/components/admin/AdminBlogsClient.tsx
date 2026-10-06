"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createBlog,
  updateBlog,
  toggleBlogPublished,
  deleteBlog,
} from "@/services/api";

import { uploadImage } from "@/services/image";

interface AdminBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
}

interface AdminBlogsClientProps {
  blogCount: number;
  blogs: AdminBlog[];
}

export default function AdminBlogsClient({
  blogCount,
  blogs,
}: AdminBlogsClientProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] =
    useState<string | null>(null);

  const [editingBlog, setEditingBlog] =
    useState<AdminBlog | null>(null);

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
    setEditingBlog(null);
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

  const handleEditBlog = (blog: AdminBlog) => {
    setEditingBlog(blog);

    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setAuthor(blog.author);
    setImage(null);

    setShowForm(true);
  };
  const handleTogglePublished = async (
    id: string
  ) => {
    try {
      setPublishingId(id);

      const result =
        await toggleBlogPublished(id);

      if (result.published) {
        toast.success(
          "Blog published successfully."
        );
      } else {
        toast.success(
          "Blog unpublished successfully."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to change blog publish status."
      );
    } finally {
      setPublishingId(null);
    }
  };

  const handleDeleteBlog = (
    id: string,
    title: string
  ) => {
    toast.warning(`Delete "${title}"?`, {
      description: "This action cannot be undone.",
      duration: 8000,
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteBlog(id);

            toast.success(
              "Blog deleted successfully."
            );

            router.refresh();
          } catch (error) {
            console.error(error);

            toast.error(
              "Failed to delete blog."
            );
          }
        },
      },
    });
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
      !author
    ) {
      toast.error(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      let imageUrl = editingBlog?.image ?? "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (editingBlog) {
        await updateBlog(editingBlog._id, {
          title,
          slug,
          excerpt,
          content,
          author,
          image: imageUrl,
        });

        toast.success(
          "Blog updated successfully."
        );
      } else {
        if (!image) {
          toast.error(
            "Please select a blog image."
          );
          return;
        }

        await createBlog({
          title,
          slug,
          excerpt,
          content,
          author,
          image: imageUrl,
          published: false,
        });

        toast.success(
          "Blog created successfully."
        );
      }

      resetForm();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        editingBlog
          ? "Failed to update blog."
          : "Failed to create blog."
      );
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
          onClick={() => {
            setEditingBlog(null);
            setTitle("");
            setSlug("");
            setExcerpt("");
            setContent("");
            setAuthor("");
            setImage(null);
            setShowForm(true);
          }}
          className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b]"
        >
          + Add Blog
        </button>
      </div>

      {/* BLOG FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#f8f7f4] p-8">
            {/* MODAL HEADER */}
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                  {editingBlog
                    ? "Edit Blog"
                    : "New Blog"}
                </p>

                <h2 className="mt-2 text-3xl font-medium">
                  {editingBlog
                    ? "Edit Blog"
                    : "Add Blog"}
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

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    handleTitleChange(
                      e.target.value
                    )
                  }
                  placeholder="How We Choose Materials"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              {/* SLUG */}
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

              {/* EXCERPT */}
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
                  placeholder="Short description..."
                  className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              {/* CONTENT */}
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

              {/* AUTHOR */}
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

              {/* CURRENT IMAGE */}
              {editingBlog?.image && (
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider">
                    Current Image
                  </label>

                  <img
                    src={editingBlog.image}
                    alt={editingBlog.title}
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  {editingBlog
                    ? "Replace Image (Optional)"
                    : "Blog Image *"}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(
                      e.target.files?.[0] ??
                      null
                    )
                  }
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm"
                />
              </div>

              {/* ACTIONS */}
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
                    ? editingBlog
                      ? "Updating..."
                      : "Creating..."
                    : editingBlog
                      ? "Update Blog"
                      : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG LIST */}
      <div className="mt-12 overflow-hidden border border-black/10">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-[#6f716d]">
            No blogs found.
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={blog._id}
              className="grid gap-6 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[60px_180px_1fr_auto] md:items-center"
            >
              {/* NUMBER */}
              <span className="text-xs text-[#b8895b]">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              {/* IMAGE */}
              <div className="h-28 overflow-hidden bg-black/5">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* INFO */}
              <div>
                <h2 className="text-xl font-medium">
                  {blog.title}
                </h2>

                <p className="mt-1 text-sm text-[#6f716d]">
                  {blog.excerpt}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em]">
                  <span>
                    {blog.author}
                  </span>

                  <span
                    className={
                      blog.published
                        ? "text-green-700"
                        : "text-red-600"
                    }
                  >
                    {blog.published
                      ? "Published"
                      : "Unpublished"}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleTogglePublished(blog._id)
                  }
                  disabled={publishingId === blog._id}
                  className="border border-black/10 px-4 py-2 text-xs transition hover:bg-[#24302b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {publishingId === blog._id
                    ? "Updating..."
                    : blog.published
                      ? "Unpublish"
                      : "Publish"}
                </button>
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black/10 px-4 py-2 text-xs transition hover:bg-[#24302b] hover:text-white"
                >
                  View
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleEditBlog(blog)
                  }
                  className="border border-black/10 px-4 py-2 text-xs transition hover:bg-black/5"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteBlog(
                      blog._id,
                      blog.title
                    )
                  }
                  className="border border-red-200 px-4 py-2 text-xs text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}