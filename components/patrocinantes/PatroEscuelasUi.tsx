import Link from 'next/link';
import React, { FC, useState } from 'react'
import { PatroEscuelaModal } from './PatroEscuelaModal';
import { DonacionesUi } from './DonacionesUi';
import { FaPencilAlt } from 'react-icons/fa';

interface Props {
    escuelas: any[];
    donaciones: any[];
    tipo: string;
}

export const PatroEscuelasUi: FC<Props> = ({ escuelas, donaciones, tipo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEscuela, setActiveEscuela] = useState(undefined);

  const updateHist = (escuela: any) => {
    setActiveEscuela(escuela);
    setIsOpen(true);
  }

  const addHist = () => {
    setActiveEscuela(undefined);
    setIsOpen(true);
  }

  return (
    <>
    <h1 className="font-bold text-2xl text-primary mt-5">PATROCINIOS</h1>
      {escuelas[0] ? (
        escuelas.map((escuela: any) => (
          <div key={escuela.id} className="mt-2">
            <div className='flex gap-3'>
            <Link
              href={"/escuelas/" + escuela.id}
              className="hover:underline text-secondary font-semibold text-lg"
            >
              {escuela.nombre}
            </Link>
            <button
              onClick={() => updateHist(escuela)}
              className="hover:scale-110 h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
            >
              <FaPencilAlt />
            </button>

            </div>
            <p className="">
              {escuela.fecha_ini.substring(0, 10)} HASTA{" "}
              {escuela.fecha_fin?.substring(0, 10) || "ACTUALIDAD"}
            </p>
            <small className='text-gray-400'>ID DE PATROCINIO: {escuela.hist_id}</small>
          </div>
        ))
      ) : (
        <p>NO TIENE</p>
      )}
      <button
        onClick={addHist}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        Agregar Patrocinio
      </button>
      <DonacionesUi donaciones={donaciones} tipo={tipo} escuelas={escuelas} />
      <PatroEscuelaModal isOpen={isOpen} onClose={()=> setIsOpen(false)} tipo={tipo} escuela={activeEscuela} />
    </>
  )
}
