export async function fetchThreads(userId) {
  const response = await fetch("/mocks/threads.json");
  const data = await response.json();
  return data.filter((thread) =>
    thread.participants.some((participant) => participant.id === userId),
  );
}
