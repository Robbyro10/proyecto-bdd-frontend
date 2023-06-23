import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import React, { FC } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import useSWR from "swr";

export const PatroPersonaList = () => {
  const { data, error, isLoading } = useSWR(`/patrocinantes/persona`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col gap-5">
      {data.map((patro: any) => (
        <div key={patro.id} className="bg-accent-light p-5 rounded">
          <Link
            href={"/patrocinante-persona/" + patro.id}
            className="text-xl font-bold text-secondary hover:underline"
          >
            {patro.primer_nombre}&nbsp;
            {patro.segundo_nombre && patro.segundo_nombre + " "}
            {patro.primer_apellido}&nbsp;
            {patro.segundo_apellido}
          </Link>
          <p className="mt-1">{patro.email_contacto}</p>
          {patro.cod_int && (
              <p>
                +{patro.cod_int}&nbsp;
                {patro.cod_area}&nbsp;
                {patro.numero}
              </p>
            )}
        </div>
      ))}
    </div>
  );
};
