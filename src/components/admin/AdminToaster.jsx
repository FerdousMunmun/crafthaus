"use client";

import { Toaster } from "sonner";

export default function AdminToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        style: {
          fontFamily: "Arial, Helvetica, sans-serif",
        },
      }}
    />
  );
}