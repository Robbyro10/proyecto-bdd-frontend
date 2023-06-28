import Link from "next/link";
import React, { FC, useState } from "react";
import { DonacionModal } from "./DonacionModal";

interface Props {
  donaciones: any[];
  escuelas: any[];
  tipo: string;
}

export const DonacionesUi: FC<Props> = ({ donaciones, escuelas, tipo }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h1 className="font-bold text-2xl text-primary mt-5">DONACIONES</h1>
      {donaciones[0] ? (
        donaciones.map((donacion: any) => (
          <div
            key={donacion.fecha}
            className="mt-3 flex justify-between bg-accent-light rounded shadow p-3 max-w-2xl"
          >
            <div>
              <h2 className="text-lg">
                <b>MONTO: </b>
                {donacion.monto_r$} R$
              </h2>
              <p>{donacion.fecha.substring(0, 10)}</p>
            </div>
            <Link
              href={"/escuelas/" + donacion.id}
              className="hover:underline text-secondary text-xs mt-auto"
            >
              {donacion.nombre}
            </Link>
          </div>
        ))
      ) : (
        <p>NO TIENE</p>
      )}
      {
        escuelas[0] ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
          >
            Agregar Donacion
          </button>
        ) : <p className="text-sm text-gray-400">AGREGUE UNA ESCUELA PARA AGREGAR DONACIONES</p>
      }
      <DonacionModal isOpen={isOpen} onClose={()=> setIsOpen(false)} escuelas={escuelas} />
    </>
  );
};
