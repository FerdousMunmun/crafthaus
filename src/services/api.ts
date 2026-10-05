import type { Project } from "@/types/project";
import type { Service } from "@/types/service";
import type { Blog } from "@/types/blog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}




export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`);

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
}

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_URL}/blogs`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
}

export interface AdminStats {
  services: number;
  projects: number;
  blogs: number;
}
// Admin service api
export async function getAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${API_URL}/admin/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin stats");
  }

  return response.json();
}


export async function getAdminServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/admin/services`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin services");
  }

  return response.json();
}

export async function createService(service: Omit<Service, "_id" | "createdAt">) {
  const response = await fetch(`${API_URL}/admin/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!response.ok) {
    throw new Error("Failed to create service");
  }

  return response.json();
}

export async function updateService(
  id: string,
  service: Partial<Service>
) {
  const response = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
  });

  if (!response.ok) {
    throw new Error("Failed to update service");
  }

  return response.json();
}

export async function deleteService(id: string) {
  const response = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return response.json();
}

export async function toggleServicePublished(id: string) {
  const response = await fetch(
    `${API_URL}/admin/services/${id}/publish`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to change service publish status");
  }

  return response.json();
}
// Admin Project Api
export async function getAdminProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/admin/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin projects");
  }

  return response.json();
}

export async function createProject(
  project: Omit<Project, "_id" | "createdAt">
) {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function toggleProjectPublished(
  id: string
) {
  const response = await fetch(
    `${API_URL}/admin/projects/${id}/publish`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to change project publish status"
    );
  }

  return response.json();
}