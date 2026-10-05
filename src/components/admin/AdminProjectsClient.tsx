"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createProject,
  toggleProjectPublished,
} from "@/services/api";

import { uploadImage } from "@/services/image";

interface AdminProject {
  _id: string;
  title: string;
  shortDescription?: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  image: string;
  published: boolean;
}

interface AdminProjectsClientProps {
  projectCount: number;
  projects: AdminProject[];
}

export default function AdminProjectsClient({
  projectCount,
  projects = [],
}: AdminProjectsClientProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] =
    useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("");
    setYear("");
    setDescription("");
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
      !category ||
      !year ||
      !description ||
      !image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(image);

      await createProject({
        title,
        slug,
        category,
        year,
        description,
        image: imageUrl,
        published: false,
      });

      toast.success("Project created successfully.");

      resetForm();

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublished = async (
    id: string
  ) => {
    try {
      setPublishingId(id);

      const result =
        await toggleProjectPublished(id);

      if (result.published) {
        toast.success(
          "Project published successfully."
        );
      } else {
        toast.success(
          "Project unpublished successfully."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to change project publish status."
      );
    } finally {
      setPublishingId(null);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
            Admin / Projects
          </p>

          <h1 className="mt-4 text-4xl font-medium md:text-5xl">
            Projects
          </h1>

          <p className="mt-3 text-sm text-[#6f716d]">
            {projectCount} projects in the database.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b]"
        >
          + Add Project
        </button>
      </div>

      {/* ADD PROJECT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f8f7f4] p-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                  New Project
                </p>

                <h2 className="mt-2 text-3xl font-medium">
                  Add Project
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
                  placeholder="Oak Residence"
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
                  placeholder="oak-residence"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Category *
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  placeholder="Full Renovation"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Year *
                </label>

                <input
                  type="text"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value)
                  }
                  placeholder="2026"
                  className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Description *
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={6}
                  placeholder="Describe the project..."
                  className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider">
                  Project Image *
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
                    : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT LIST */}
      <div className="mt-12 overflow-hidden border border-black/10">
        {projects.length === 0 ? (
          <div className="p-12 text-center text-[#6f716d]">
            No projects found.
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project._id}
              className="grid gap-6 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-[60px_180px_1fr_auto] md:items-center"
            >
              <span className="text-xs text-[#b8895b]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="h-28 overflow-hidden bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-medium">
                  {project.title}
                </h2>

                <p className="mt-1 text-sm text-[#6f716d]">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em]">
                  <span>{project.category}</span>

                  <span>{project.year}</span>

                  <span
                    className={
                      project.published
                        ? "text-green-700"
                        : "text-red-600"
                    }
                  >
                    {project.published
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
                    handleTogglePublished(
                      project._id
                    )
                  }
                  disabled={
                    publishingId === project._id
                  }
                  className="border border-black/10 px-4 py-2 text-xs transition hover:bg-[#24302b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {publishingId === project._id
                    ? "Updating..."
                    : project.published
                      ? "Unpublish"
                      : "Publish"}
                </button>

                <button
                  type="button"
                  className="border border-black/10 px-4 py-2 text-xs transition hover:bg-black/5"
                >
                  Edit
                </button>

                <button
                  type="button"
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