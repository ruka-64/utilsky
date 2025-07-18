import { fetchAPI } from "../utils/fetchapi.ts";

export async function AccChecker(tokens: string[]) {
  const res = await fetchAPI.POST("/i");
  if (res.success) {
  }
}
