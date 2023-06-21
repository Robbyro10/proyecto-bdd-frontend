import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import React, { FC } from "react";
import useSWR from "swr";

export const EscuelasList = () => {
  const { data, error, isLoading } = useSWR(`/escuelas`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-5 mb-40">
      {data.map((escuela: any) => (
        <div key={escuela.id} className="bg-accent-light p-5 rounded">
          <div className="flex gap-2 items-baseline">
            <Link
              href={"/escuelas/" + escuela.id}
              className="font-bold text-xl text-secondary hover:underline"
            >
              {escuela.nombre}
            </Link>
            <h2>{escuela.nombre_lugar}</h2>
          </div>
          <small>
            <b>DIRECCIÓN:</b> {escuela.direccion_sede}
          </small>
          <small className="line-clamp-3 mt-2">{escuela.resumen_hist}</small>
        </div>
      ))}
    </div>
  );
};
