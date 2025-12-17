export async function fetchGet() {
  try {
    const response = await fetch(`/users.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetchGet:", error);
    throw error;
  }
}

export function fetchPost(user, userId) {
  try {
    const response = fetch(`**********/${userId}`, {
      method: "POST",
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
