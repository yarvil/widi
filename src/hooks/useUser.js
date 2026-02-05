// import { useState, useEffect } from "react";
// import { apiRequest } from "@/pages/auth/sendRequest";

// const cache = {};

// export default function useUser(userId) {
//   const [user, setUser] = useState(() => cache[userId] || null);
//   const [loading, setLoading] = useState(() => !cache[userId] && !!userId);

//   useEffect(() => {
//     if (!userId || cache[userId]) return;

//     apiRequest("GET", `api/user/${userId}`)
//       .then((data) => {
//         cache[userId] = data;
//         setUser(data);
//       })
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, [userId]);

//   return { user, loading };
// }

import { useState, useEffect } from "react";

const cache = {};

export default function useUser(userId) {
  const [user, setUser] = useState(() => cache[userId] || null);
  const [loading, setLoading] = useState(() => !cache[userId] && !!userId);

  useEffect(() => {
    if (!userId || cache[userId]) return;

    fetch("/mocks/users.json")
      .then((res) => res.json())
      .then((data) => {
        if (data[userId]) {
          cache[userId] = data[userId];
          setUser(data[userId]);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading };
}
