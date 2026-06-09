 // /app/utils/api.ts

export interface ApiResponse {
  status: string;
  message?: string;
  token?: string;
  user?: any;
  data?: any;
}

const BASE_URL = "https://q2cp7g9m-8080.inc1.devtunnels.ms"; // ✅ fixed

// 🔐 Token helpers
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setSession = (token: string, user: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
export const getSession = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  }
  return null;
};
// 🚀 Single POST API handler
export const postAPI = async (
  endpoint: string,
  body: any,
  isAuthRequired: boolean = false
): Promise<ApiResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // ✅ Attach JWT token
  if (isAuthRequired) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST", // ✅ always POST
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};