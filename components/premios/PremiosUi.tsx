import { sambaApi } from "@/api/sambaApi";
import { fireToast, fireError } from "@/utils";
import React, { FC, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { PremioModal } from "./PremioModal";

interface Props {
  premios: any[];
  tipo: string;
}

export const PremiosUi: FC<Props> = ({ premios, tipo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activePremio, setActivePremio] = useState(undefined);
  const updatePremio = (Premio: any) => {
    setActivePremio(Premio);
    setIsOpen(true);
  };

  const deletePremio = async (año: string) => {
    Swal.fire({
      title: "¿Borrar Premio?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await sambaApi
            .delete("/escuelas/premio/" + año.substring(0, 10))
            .then(() => fireToast("Premio borrado con éxito"));
        } catch (error) {
          fireError();
        }
      }
    });
  };

  const createPremio = () => {
    setActivePremio(undefined);
    setIsOpen(true);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mt-5 text-primary">
        PREMIOS ESPECIALES
      </h2>
      {premios[0] ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-wrap my-5">
          {premios.map((premio: any) => (
            <div
              key={premio.año + premio.id}
              className="bg-accent-light p-3 rounded transition ease-out shadow group hover:group-hover"
            >
              <div className="flex items-center mb-2">
                <div className="flex gap-2 items-center">
                  <h5 className="text-lg font-bold">{premio.nombre}</h5>
                </div>
                <button
                  onClick={() => updatePremio(premio)}
                  className="hover:scale-110 ml-auto h-fit transition ease-out text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => deletePremio(premio.id)}
                  className="hover:scale-110 h-fit transition ease-out text-error"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p>DESCRIPCIÓN: {premio.descripcion}</p>
                  <p>TIPO: {premio.tipo}</p>
                  <small>{premio.año.substring(0, 10)}</small>
                </div>
                <small>{premio.nombrelugar}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>NO TIENE</p>
      )}
      <PremioModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        premio={activePremio}
        tipo={tipo}
      />
      <div className="flex gap-3">
        <button
          onClick={createPremio}
          className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          Crear Premio
        </button>
        <button
          onClick={() => setIsOpenAdd(true)}
          className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          <BiPlus />
          Premio
        </button>
      </div>
    </div>
  );
};
