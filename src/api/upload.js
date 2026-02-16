import { fetchGet } from "@/pages/auth/sendRequest";

export async function uploadPostImage(file) {
  const params = await fetchGet("api/upload/signature/post");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", params.apiKey);
  formData.append("timestamp", params.timestamp);
  formData.append("signature", params.signature);
  formData.append("folder", params.folder);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadResponse.ok) {
    throw new Error("Upload to Cloudinary failed");
  }

  const result = await uploadResponse.json();
  return result.secure_url;
}
