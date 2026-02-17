const BASE_URL = "https://step-project-api.onrender.com";

export async function apiRequest(method, url, body = null) {
  const token = localStorage.getItem("token");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    credentials: token ? "omit" : "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, options);

    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }

    if (response.status === 204) return null;

    const contentType = response.headers.get("content-type");
    const text = await response.text();
    if (!text || text.trim() === "") return null;

    if (contentType && contentType.includes("text/plain")) {
      return text.trim();
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text.trim();
    }
  } catch (error) {
    if (!error.response) {
      error.response = {
        status: 0,
        message: "Перевірте інтернет підключення",
      };
    }
    throw error;
  }
}

export async function fetchGet(url) {
  return apiRequest("GET", url);
}

export async function fetchPost(body, url) {
  return apiRequest("POST", url, body);
}

export async function fetchPut(body, url) {
  return apiRequest("PUT", url, body);
}

export async function fetchPatch(body, url) {
  return apiRequest("PATCH", url, body);
}

export async function fetchDelete(url) {
  return apiRequest("DELETE", url);
}
