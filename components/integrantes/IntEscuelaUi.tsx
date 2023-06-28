import Link from "next/link";
import React, { FC, useState } from "react";
import { IntEscuelaModal } from "./IntEscuelaModal";

interface Props {
  escuela: any[];
}

export const IntEscuelaUi: FC<Props> = ({ escuela }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1 className="font-bold text-2xl text-primary mt-3">ESCUELAS</h1>
      <div className="flex flex-col mt-2">
        {escuela[0] ? (
          escuela.map((escuela: any) => (
            <div key={escuela.fecha_ini}>
              <div className="flex gap-3 items-center">
                <Link
                  href={"/escuelas/" + escuela.id}
                  className="hover:underline text-secondary font-bold w-fit"
                >
                  {escuela.nombre}
                </Link>
                {escuela.autoridad === "SI" && <p>(AUTORIDAD)</p>}
              </div>
              <p>
                {escuela.fecha_ini.substring(0, 10)} -{" "}
                {escuela.fecha_fin
                  ? escuela.fecha_fin.substring(0, 10)
                  : "ACTUALIDAD"}
              </p>
            </div>
          ))
        ) : (
          <p>NO TIENE</p>
        )}
      </div>
      <IntEscuelaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        Agregar Escuela
      </button>
    </>
  );
};
