const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/order/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
