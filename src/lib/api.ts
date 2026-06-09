const BASE_URL = "https://api.stonebase.in/";

export const API_ENDPOINTS = {
  REGISTER: "intern",           // Correct endpoint as per your backend
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;

export type ApiRequestArgs = {
  endpoint: ApiEndpoint;
  data?: Record<string, any>;
  token?: string;
};

export async function apiRequest({ endpoint, data = {}, token }: ApiRequestArgs) {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS[endpoint]}`;
    console.log("FullAPI :",url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    const result = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(result?.message || `HTTP Error ${res.status}`);
    }

    return result;
  } catch (error: any) {
    console.error("API Error:", error?.message);
    throw error;
  }
}