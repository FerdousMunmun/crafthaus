"use client";

import { useEffect, useState } from "react";
import {
  getAdminSEO,
  updateAdminSEO,
  SEOSettings,
} from "@/services/api";
import { toast } from "sonner";

const emptySEO: SEOSettings = {
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  seoSlug: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
};

export default function SEOPage() {
  const [seo, setSeo] = useState<SEOSettings>(emptySEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSEO = async () => {
      try {
        const data = await getAdminSEO();

        if (data) {
          setSeo(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load SEO settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSEO();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSeo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getSEOScore = () => {
    let score = 0;

    if (seo.metaTitle.trim()) score += 15;
    if (seo.metaDescription.trim()) score += 15;
    if (seo.keywords.trim()) score += 10;
    if (seo.seoSlug.trim()) score += 15;
    if (seo.ogTitle.trim()) score += 10;
    if (seo.ogDescription.trim()) score += 10;
    if (seo.ogImage.trim()) score += 10;
    if (seo.canonicalUrl.trim()) score += 15;

    return score;
  };

  const seoScore = getSEOScore();

  const seoSuggestions: string[] = [];

  if (!seo.metaTitle.trim()) {
    seoSuggestions.push("Add a meta title for the page.");
  }

  if (!seo.metaDescription.trim()) {
    seoSuggestions.push(
      "Add a meta description that clearly describes the page."
    );
  }

  if (!seo.keywords.trim()) {
    seoSuggestions.push(
      "Add relevant keywords related to the page content."
    );
  }

  if (!seo.seoSlug.trim()) {
    seoSuggestions.push(
      "Create a short and SEO-friendly URL slug."
    );
  }

  if (!seo.ogTitle.trim()) {
    seoSuggestions.push(
      "Add an Open Graph title for social sharing."
    );
  }

  if (!seo.ogDescription.trim()) {
    seoSuggestions.push(
      "Add an Open Graph description for social sharing."
    );
  }

  if (!seo.ogImage.trim()) {
    seoSuggestions.push(
      "Add an Open Graph image for better social previews."
    );
  }

  if (!seo.canonicalUrl.trim()) {
    seoSuggestions.push(
      "Add a canonical URL to avoid duplicate URL issues."
    );
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateAdminSEO(seo);

      toast.success("SEO settings updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update SEO settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-sm text-[#6f716d]">
          Loading SEO settings...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs tracking-[0.25em] text-[#b8895b]">
          ADMIN / SEO
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#24302b]">
          SEO Management
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#6f716d]">
          Manage the website metadata and social sharing information
          from the admin dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6 rounded-2xl border border-[#dedbd4] bg-white p-6"
      >
        {/* Meta Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#24302b]">
            Meta Title
          </label>

          <input
            name="metaTitle"
            value={seo.metaTitle}
            onChange={handleChange}
            placeholder="CraftHaus | Premium Home Renovation & Carpentry"
            className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#24302b]">
            Meta Description
          </label>

          <textarea
            name="metaDescription"
            value={seo.metaDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Describe CraftHaus and its services..."
            className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#24302b]">
            Keywords
          </label>

          <input
            name="keywords"
            value={seo.keywords}
            onChange={handleChange}
            placeholder="home renovation, carpentry, interior design"
            className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
          />
        </div>

        {/* SEO Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#24302b]">
            SEO-Friendly Slug
          </label>

          <input
            name="seoSlug"
            value={seo.seoSlug}
            onChange={handleChange}
            placeholder="premium-home-renovation-dhaka"
            className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
          />

          <p className="mt-2 text-xs text-[#6f716d]">
            Use a short, descriptive URL-friendly slug.
          </p>
        </div>

        {/* Open Graph */}
        <div className="border-t border-[#dedbd4] pt-6">
          <h2 className="mb-5 text-lg font-semibold text-[#24302b]">
            Open Graph
          </h2>

          <div className="space-y-5">
            {/* OG Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#24302b]">
                OG Title
              </label>

              <input
                name="ogTitle"
                value={seo.ogTitle}
                onChange={handleChange}
                placeholder="CraftHaus | Crafted Spaces"
                className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
              />
            </div>

            {/* OG Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#24302b]">
                OG Description
              </label>

              <textarea
                name="ogDescription"
                value={seo.ogDescription}
                onChange={handleChange}
                rows={3}
                placeholder="A short description for social sharing..."
                className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
              />
            </div>

            {/* OG Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#24302b]">
                OG Image URL
              </label>

              <input
                name="ogImage"
                value={seo.ogImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
              />
            </div>
          </div>
        </div>

        {/* Canonical URL */}
        <div className="border-t border-[#dedbd4] pt-6">
          <label className="mb-2 block text-sm font-medium text-[#24302b]">
            Canonical URL
          </label>

          <input
            name="canonicalUrl"
            value={seo.canonicalUrl}
            onChange={handleChange}
            placeholder="https://your-domain.com"
            className="w-full rounded-lg border border-[#dedbd4] px-4 py-3 text-sm outline-none focus:border-[#b8895b]"
          />
        </div>

        {/* SEO Score */}
        <div className="border-t border-[#dedbd4] pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#24302b]">
                SEO Score
              </h2>

              <p className="mt-1 text-xs text-[#6f716d]">
                Complete the fields to improve your page SEO.
              </p>
            </div>

            <div className="text-2xl font-semibold text-[#b8895b]">
              {seoScore}/100
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 overflow-hidden rounded-full bg-[#dedbd4]">
            <div
              className="h-full bg-[#b8895b] transition-all"
              style={{ width: `${seoScore}%` }}
            />
          </div>

          {/* Checklist */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Meta title", !!seo.metaTitle.trim()],
              ["Meta description", !!seo.metaDescription.trim()],
              ["Keywords", !!seo.keywords.trim()],
              ["SEO-friendly slug", !!seo.seoSlug.trim()],
              ["OG title", !!seo.ogTitle.trim()],
              ["OG description", !!seo.ogDescription.trim()],
              ["OG image", !!seo.ogImage.trim()],
              ["Canonical URL", !!seo.canonicalUrl.trim()],
            ].map(([label, complete]) => (
              <div
                key={label as string}
                className="flex items-center justify-between rounded-lg border border-[#dedbd4] px-4 py-3"
              >
                <span className="text-sm text-[#24302b]">
                  {label as string}
                </span>

                <span
                  className={`text-xs font-medium ${
                    complete
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {complete ? "Complete" : "Missing"}
                </span>
              </div>
            ))}
          </div>

          {/* SEO Suggestions */}
          {seoSuggestions.length > 0 && (
            <div className="mt-6 rounded-xl border border-[#dedbd4] bg-[#f8f7f4] p-5">
              <h3 className="text-base font-semibold text-[#24302b]">
                SEO Suggestions
              </h3>

              <p className="mt-1 text-xs text-[#6f716d]">
                Improve these areas to make the page more SEO-friendly.
              </p>

              <ul className="mt-4 space-y-3">
                {seoSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="flex gap-3 text-sm text-[#6f716d]"
                  >
                    <span className="mt-0.5 text-[#b8895b]">
                      •
                    </span>

                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end border-t border-[#dedbd4] pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#24302b] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8f6845] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save SEO Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}