import Link from "next/link";
import React, { useState, FC } from "react";
import { EscuelaIntModal } from "./EscuelaIntModal";
import { BiPlus } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";

interface Props {
  integrantes: any[];
}

export const EscuelaIntUi: FC<Props> = ({ integrantes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeInt, setActiveInt] = useState(undefined);

  const updateHist = (escuela: any) => {
    setActiveInt(escuela);
    setIsOpen(true);
  };

  const addInt = () => {
    setActiveInt(undefined);
    setIsOpen(true);
  };

  console.log(integrantes)

  return (
    <>
      <h2 className="font-bold text-xl mt-5 text-primary">INTEGRANTES</h2>
      {integrantes ? (
        <ol className="list-disc mt-3">
          {integrantes.map((int: any) => (
            <li key={int.id} className="ml-5 mb-2">
              <div className="flex gap-3 items-center">
                <Link
                  href={"/integrantes/" + int.id}
                  className="hover:underline font-semibold text-lg text-secondary"
                >
                  {int.primer_nombre}&nbsp;
                  {int.primer_apellido}&nbsp;
                  {int.segundo_apellido}
                </Link>
                <p>{int.autoridad === "SI" && "(AUTORIDAD)"}</p>
                {!int.fecha_fin && (
                  <button
                    onClick={() => updateHist(int)}
                    className="hover:scale-110 h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
                  >
                    <FaPencilAlt />
                  </button>
                )}
              </div>
              <p>
                {int.fecha_ini.substring(0, 10)} -{" "}
                {int.fecha_fin ? int.fecha_fin.substring(0, 10) : "ACTUALIDAD"}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p>NO TIENE</p>
      )}
      <EscuelaIntModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        integrante={activeInt}
      />
      <button
        onClick={addInt}
        className="flex items-center text-secondary font-bold gap-2 mb-10 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Integrante
      </button>
    </>
  );
};
