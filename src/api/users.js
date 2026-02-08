export async function fetchUsers() {
  const response = await fetch("/mocks/users.json");
  const data = await response.json();
  return data;
}
