import type { Project } from "@/types/project";
import type { Service } from "@/types/service";
import type { Blog } from "@/types/blog";
import { authClient } from "@/lib/auth-client";

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
  const { data: token } = await authClient.token();

  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin stats");
  }

  return response.json();
}


export async function getAdminServices(): Promise<Service[]> {
  const { data: token } = await authClient.token();
  const response = await fetch(`${API_URL}/admin/services`,{
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin services");
  }

  return response.json();
}

export async function createService(service: Omit<Service, "_id" | "createdAt">) {
    const { data: token } = await authClient.token();
  const response = await fetch(`${API_URL}/admin/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
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

  const { data: token } = await authClient.token();
  const response = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(service),
  });

  if (!response.ok) {
    throw new Error("Failed to update service");
  }

  return response.json();
}

export async function deleteService(id: string) {
  const { data: token } = await authClient.token();
  const response = await fetch(`${API_URL}/admin/services/${id}`, {
    method: "DELETE",
    headers: {
      
       Authorization: `Bearer ${token?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return response.json();
}

export async function toggleServicePublished(id: string) {
   const { data: token } = await authClient.token();
  const response = await fetch(
    `${API_URL}/admin/services/${id}/publish`,
    {
      method: "PATCH",
      headers: {
      
       Authorization: `Bearer ${token?.token}`,
    },
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

export async function updateProject(
  id: string,
  project: Partial<Project>
) {
  const response = await fetch(
    `${API_URL}/admin/projects/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(
    `${API_URL}/admin/projects/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return response.json();
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const response = await fetch(
    `${API_URL}/projects/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  return response.json();
}

//admin blog api 


export async function getAdminBlogs(): Promise<Blog[]> {
  const response = await fetch(
    `${API_URL}/admin/blogs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin blogs");
  }

  return response.json();
}

export async function createBlog(
  blog: Omit<Blog, "_id" | "createdAt">
) {
  const response = await fetch(
    `${API_URL}/admin/blogs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return response.json();
}

export async function updateBlog(
  id: string,
  blog: Partial<Blog>
) {
  const response = await fetch(
    `${API_URL}/admin/blogs/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  return response.json();
}
export async function toggleBlogPublished(
  id: string
) {
  const response = await fetch(
    `${API_URL}/admin/blogs/${id}/publish`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to change blog publish status"
    );
  }

  return response.json();
}

export async function deleteBlog(id: string) {
  const response = await fetch(
    `${API_URL}/admin/blogs/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return response.json();
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const response = await fetch(
    `${API_URL}/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to send contact message"
    );
  }

  return response.json();
}


//Admin message api 
export async function getAdminMessages() {
  const res = await fetch(`${API_URL}/admin/messages`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch admin messages");
  }

  return res.json();
}

export async function toggleAdminMessageRead(id: string) {
  const res = await fetch(`${API_URL}/admin/messages/${id}/read`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to update message status");
  }

  return res.json();
}


export async function deleteAdminMessage(id: string) {
  const res = await fetch(`${API_URL}/admin/messages/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete message");
  }

  return res.json();
}

export interface SEOSettings {
  _id?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  updatedAt?: string;
  seoSlug: string;
}

export async function getAdminSEO(): Promise<SEOSettings | null> {
  const { data: token } = await authClient.token();

  const response = await fetch(`${API_URL}/admin/seo`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch SEO settings");
  }

  return response.json();
}

export async function updateAdminSEO(
  seo: SEOSettings
): Promise<SEOSettings> {
  const { data: token } = await authClient.token();

  const response = await fetch(`${API_URL}/admin/seo`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(seo),
  });

  if (!response.ok) {
    throw new Error("Failed to update SEO settings");
  }

  return response.json();
}

export async function getSEO(): Promise<SEOSettings | null> {
  const response = await fetch(`${API_URL}/seo`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch SEO settings");
  }

  return response.json();
}