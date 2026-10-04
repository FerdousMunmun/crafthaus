const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.data.url;
}