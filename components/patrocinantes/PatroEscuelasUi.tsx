import Link from 'next/link';
import React, { FC } from 'react'

interface Props {
    escuelas: any[];
}

export const PatroEscuelasUi: FC<Props> = ({ escuelas }) => {
  return (
    <>
    <h1 className="font-bold text-2xl text-primary mt-5">ESCUELAS QUE PATROCINA</h1>
      {escuelas[0] ? (
        escuelas.map((escuela: any) => (
          <div key={escuela.id} className="mt-2">
            <Link
              href={"/escuelas/" + escuela.id}
              className="hover:underline text-secondary font-semibold text-lg"
            >
              {escuela.nombre}
            </Link>
            <p className="text-sm">
              {escuela.fecha_ini.substring(0, 10)} HASTA{" "}
              {escuela.fecha_fin?.substring(0, 10) || "ACTUALIDAD"}
            </p>
          </div>
        ))
      ) : (
        <p>NO TIENE</p>
      )}
    </>
  )
}
