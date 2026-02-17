import { fetchGet, fetchPatch } from "@/pages/auth/sendRequest";

export async function fetchUsers() {
  return await fetchGet("api/user");
}

export async function fetchUserById(id) {
  return await fetchGet(`api/user/${id}`);
}

export async function searchUsers(query) {
  return await fetchGet(`api/user/search?q=${encodeURIComponent(query)}`);
}

export async function updateUserProfile(data) {
  return await fetchPatch(data, "api/user/update");
}
export async function uploadAvatar(file) {
  const params = await fetchGet("api/upload/signature/avatar");

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

export async function uploadBackground(file) {
  const params = await fetchGet("api/upload/signature/background");

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
