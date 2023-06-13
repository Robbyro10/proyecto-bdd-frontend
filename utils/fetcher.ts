import { sambaApi } from "@/api/sambaApi";

export const fetcher = (url: string) => sambaApi.get(url).then(res => res.data);