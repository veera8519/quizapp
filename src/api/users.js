
import axios from "axios";


const BASE = "https://localhost:64292" || "https://fullcsharpapi20251125183243.azurewebsites.net";





export const submitForm = async (data) => {
  return axios.post(`${BASE}/api/your-endpoint`, data);
};



const endpoints = {
  getAll: `${BASE}/api/Users`,
  add: `${BASE}/api/Users`,           
  byId: (id) => `${BASE}/api/Users/${id}`,
  byQuery: (id) => `${BASE}/api/Users?Id=${id}`,
};

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
 
  try { return await res.json(); } catch { return null; }
}

export function getUsers() {
  return request(endpoints.getAll, { method: "GET" });
}

export function getUserById(id) {
  
  return request(endpoints.byId(id), { method: "GET" })
    .catch(() => request(endpoints.byQuery(id), { method: "GET" }));
}

export function addUser(userData, useUsersa = false) {
  const url = useUsersa ? `${BASE}/api/Usersa` : endpoints.add;
  return request(url, {
    method: "POST",
    body: JSON.stringify(userData)
  });
}

export function updateUser(id, userData) {
  
  return request(endpoints.byId(id), {
    method: "PUT",
    body: JSON.stringify(userData)
  });
}

export function deleteUser(id) {
  return request(endpoints.byId(id), { method: "DELETE" });
}
