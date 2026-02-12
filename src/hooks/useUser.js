import { useState, useEffect } from "react";

import { fetchUserById } from "@/api/users";

const cache = {};

export default function useUser(userId) {
  const [user, setUser] = useState(() => cache[userId] || null);
  const [loading, setLoading] = useState(() => !cache[userId] && !!userId);

  useEffect(() => {
    if (!userId || cache[userId]) return;

    fetchUserById(userId)
      .then((data) => {
        cache[userId] = data;
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}
