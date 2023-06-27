import Link from 'next/link';
import React, { FC, useState } from 'react'
import { PatroEscuelaModal } from './PatroEscuelaModal';

interface Props {
    escuelas: any[];
    tipo: string;
}

export const PatroEscuelasUi: FC<Props> = ({ escuelas, tipo }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        Agregar Escuela
      </button>
      <PatroEscuelaModal isOpen={isOpen} onClose={()=> setIsOpen(false)} tipo={tipo} />
    </>
  )
}
