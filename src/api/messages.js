export async function fetchMessages(threadId) {
  const response = await fetch("/mocks/messages.json");
  const data = await response.json();

  return data[threadId] ?? [];
}
