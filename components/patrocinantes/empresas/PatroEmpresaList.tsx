import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import React, { FC } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import useSWR from "swr";

export const PatroEmpresaList = () => {
  const { data, error, isLoading } = useSWR(`/patrocinantes/empresa`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-5">
      {data.map((patro: any) => (
        <div key={patro.id} className="bg-accent-light p-5 rounded">
          <div className="flex items-baseline gap-2 mb-2">
            <Link
              href={"/patrocinante-empresa/" + patro.id}
              className="text-xl font-bold hover:underline text-secondary"
            >
              {patro.nombre}
            </Link>
            <small className="mt-2">{patro.email_contacto}</small>
          </div>
          <div className="flex flex-col gap-1">
            <small>{patro.mision}.</small>
            {patro.cod_int && (
              <small>
                +{patro.cod_int}&nbsp;
                {patro.cod_area}&nbsp;
                {patro.numero}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
