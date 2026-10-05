"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";


import {
    createService,
    updateService,
    toggleServicePublished,
    deleteService,
} from "@/services/api";

import { uploadImage } from "@/services/image";

interface AdminService {
    _id: string;
    title: string;
    shortDescription: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
    published: boolean;
}

interface AdminServicesClientProps {
    serviceCount: number;
    services: AdminService[];
}

export default function AdminServicesClient({
    serviceCount,
    services = [],
}: AdminServicesClientProps) {
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] =
        useState<AdminService | null>(null);

    const [loading, setLoading] = useState(false);
    const [publishingId, setPublishingId] =
        useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [shortDescription, setShortDescription] =
        useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState("");

    const resetForm = () => {
        setTitle("");
        setSlug("");
        setShortDescription("");
        setDescription("");
        setIcon("");
        setImage(null);
        setCurrentImage("");
        setEditingService(null);
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

    const handleAddService = () => {
        resetForm();
        setShowForm(true);
    };

    const handleEditService = (service: AdminService) => {
        setEditingService(service);

        setTitle(service.title);
        setSlug(service.slug);
        setShortDescription(service.shortDescription);
        setDescription(service.description);
        setIcon(service.icon);
        setCurrentImage(service.image);
        setImage(null);

        setShowForm(true);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !title ||
            !slug ||
            !shortDescription ||
            !description
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!editingService && !image) {
            toast.error("Please select a service image.");
            return;
        }

        try {
            setLoading(true);

            let imageUrl = currentImage;

            if (image) {
                imageUrl = await uploadImage(image);
            }

            if (editingService) {
                await updateService(editingService._id, {
                    title,
                    slug,
                    shortDescription,
                    description,
                    icon,
                    image: imageUrl,
                });

                toast.success("Service updated successfully.");
            } else {
                await createService({
                    title,
                    slug,
                    shortDescription,
                    description,
                    icon,
                    image: imageUrl,
                    published: false,
                });

                toast.success("Service created successfully.");
            }

            resetForm();
            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error(
                editingService
                    ? "Failed to update service."
                    : "Failed to create service."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePublished = async (id: string) => {
        try {
            setPublishingId(id);

            const result = await toggleServicePublished(id);

            if (result.published) {
                toast.success("Service published successfully.");
            } else {
                toast.success("Service unpublished successfully.");
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to change publish status.");
        } finally {
            setPublishingId(null);
        }
    };

    const handleDeleteService = (
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
                        await deleteService(id);

                        toast.success("Service deleted successfully.");

                        router.refresh();
                    } catch (error) {
                        console.error(error);

                        toast.error("Failed to delete service.");
                    }
                },
            },
        });
    };
    return (
        <>
            {/* HEADER */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
                    onClick={handleAddService}
                    className="bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8895b]"
                >
                    + Add Service
                </button>
            </div>

            {/* FORM MODAL */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#f8f7f4] p-8">
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#b8895b]">
                                    {editingService
                                        ? "Edit Service"
                                        : "New Service"}
                                </p>

                                <h2 className="mt-2 text-3xl font-medium">
                                    {editingService
                                        ? "Edit Service"
                                        : "Add Service"}
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
                            {/* TITLE */}
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
                                    placeholder="Kitchen Renovation"
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
                                    placeholder="kitchen-renovation"
                                    className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                                />
                            </div>

                            {/* SHORT DESCRIPTION */}
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider">
                                    Short Description *
                                </label>

                                <input
                                    type="text"
                                    value={shortDescription}
                                    onChange={(e) =>
                                        setShortDescription(e.target.value)
                                    }
                                    placeholder="Functional kitchens designed around how you live."
                                    className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                                />
                            </div>

                            {/* DESCRIPTION */}
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
                                    placeholder="Describe the service in detail..."
                                    className="w-full resize-none border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                                />
                            </div>

                            {/* ICON */}
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider">
                                    Icon
                                </label>

                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) =>
                                        setIcon(e.target.value)
                                    }
                                    placeholder="home"
                                    className="w-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#b8895b]"
                                />
                            </div>

                            {/* CURRENT IMAGE */}
                            {editingService && currentImage && (
                                <div>
                                    <label className="mb-2 block text-xs uppercase tracking-wider">
                                        Current Image
                                    </label>

                                    <img
                                        src={currentImage}
                                        alt={editingService.title}
                                        className="h-40 w-full object-cover"
                                    />
                                </div>
                            )}

                            {/* IMAGE */}
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider">
                                    {editingService
                                        ? "Replace Image"
                                        : "Service Image *"}
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

                                {editingService && (
                                    <p className="mt-2 text-xs text-[#6f716d]">
                                        Leave empty to keep the current image.
                                    </p>
                                )}
                            </div>

                            {/* BUTTONS */}
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
                                        ? editingService
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingService
                                            ? "Update Service"
                                            : "Create Service"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* SERVICE LIST */}
            <div className="mt-12 overflow-hidden border border-black/10">
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
                            {/* NUMBER */}
                            <span className="text-xs text-[#b8895b]">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* SERVICE INFO */}
                            <div>
                                <h2 className="text-xl font-medium">
                                    {service.title}
                                </h2>

                                <p className="mt-1 text-sm text-[#6f716d]">
                                    {service.shortDescription}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.16em]">
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

                            {/* ACTIONS */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleTogglePublished(service._id)
                                    }
                                    disabled={
                                        publishingId === service._id
                                    }
                                    className="border border-black/10 px-4 py-2 text-xs transition hover:bg-[#24302b] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {publishingId === service._id
                                        ? "Updating..."
                                        : service.published
                                            ? "Unpublish"
                                            : "Publish"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEditService(service)
                                    }
                                    className="border border-black/10 px-4 py-2 text-xs transition hover:bg-black/5"
                                >
                                    Edit
                                </button>

                                <Link
                                    href={`/services/${service.slug}`}
                                    target="_blank"
                                    className="border border-black/10 px-4 py-2 text-xs transition hover:bg-black/5"
                                >
                                    View
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteService(
                                            service._id,
                                            service.title
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