import { proyectoApi } from "@/api/proyectoApi";

export const fetcher = (url: string) => proyectoApi.get(url).then(res => res.data);