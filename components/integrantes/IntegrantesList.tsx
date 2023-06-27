import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import React, { FC } from "react";
import useSWR from "swr";

export const IntegrantesList = () => {
  const { data, error, isLoading } = useSWR(`/integrantes`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-5">
      {data.map((integrante: any) => (
        <div key={integrante.id} className="bg-accent-light p-5 rounded">
          <div className="flex gap-3 items-baseline text-xl mb-2">
            <Link href={'/integrantes/'+ integrante.id} className={`font-bold hover:underline ${integrante.genero === "M" ? ("text-primary") : ("text-pink-600")}`  }>
              {integrante.primer_nombre}&nbsp;
              {integrante.segundo_nombre && integrante.segundo_nombre + " "}
              {integrante.primer_apellido}&nbsp;
              {integrante.segundo_apellido}
            </Link>
            <h2>{integrante.nacionalidad}</h2>
          </div>
          <p>FECHA NAC: {integrante.fecha_nac.substring(0,10)}</p>
          {integrante.apodo && <p>APODO: {integrante.apodo}</p>}
        </div>
      ))}
    </div>
  );
};
