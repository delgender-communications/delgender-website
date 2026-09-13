import axios from "axios";
import { getDailyVisitorId } from "../utils/visitorId";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7123";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function trackPageView(path: string): Promise<void> {
  try {
    const visitorId = getDailyVisitorId();

    await api.post("/api/v1/analytics/track", {
      visitorId,
      path,
      referrer: document.referrer || undefined,
    });
  } catch (error) {
    console.warn("[analytics] failed to record page view", error);
  }
}
