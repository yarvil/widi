const BASE_URL = "https://step-project-api.onrender.com";
export async function fetchGet(url, options = {}) {
  const { token, credentials } = options;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers,
      credentials: credentials ? "include" : "omit",
    });

    if (!response.ok) {
      const error = new Error(response.status, response.statusText);
      error.response = {
        status: response.status,
        message: response.statusText,
      };
      throw error;
    }
    const data = await response.json();
    console.log(data);

    return data;
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

export async function fetchPost(user, url) {
  console.log(JSON.stringify(user));

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} ${errorText}`);
  }

  const data = await response.text();
  console.log(data);
  return data;
}

export function fetchPut(user, userId) {
  try {
    const response = fetch(`**********/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
  } catch (error) {
    console.error("Error fetchPost:", error);
    throw error;
  }
}

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

    return await response.json();
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
