import React, { FC, useState } from "react";
import { SambaModal } from "./SambaModal";
import { sambaApi } from "@/api/sambaApi";
import { fireError, fireToast } from "@/utils";
import { BiPlus } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

interface Props {
  sambas: any[];
  integrantes: any[];
}

export const SambasUi: FC<Props> = ({ sambas, integrantes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activeSamba, setActiveSamba] = useState(undefined);
  const updateSamba = (samba: any) => {
    setActiveSamba(samba);
    setIsOpen(true);
  };

  const deleteSamba = async (id: string) => {
    Swal.fire({
      title: "¿Borrar Samba?",
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
          await sambaApi.delete("/samba/" + id);
          fireToast("Samba borrada con éxito");
        } catch (error) {
          fireError();
        }
      }
    });
  };

  const createSamba = () => {
    setActiveSamba(undefined);
    setIsOpen(true);
  };

  const addSamba = () => {
    setIsOpenAdd(true);
  };
  return (
    <>
      <h2 className="font-bold text-xl mt-5 text-primary">SAMBAS</h2>
      {sambas[0] ? (
        sambas.map((samba: any) => (
          <div
            key={samba.año_carnaval}
            className="bg-accent-light p-3 rounded shadow mt-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg max-w-2xl">
                {samba.titulo} -{" "}
                <small className="font-normal">{samba.tipo}</small>
              </h2>
              <div>
                <button
                  onClick={() => updateSamba(samba)}
                  className="hover:scale-110 h-fit transition ease-out text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => deleteSamba(samba.id)}
                  className="hover:scale-110 h-fit transition ease-out text-error"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p>
              <b>AUTOR:</b> {samba.primer_nombre}&nbsp;{samba.primer_apellido}
            </p>

            <p className="my-2">{samba.letra}</p>
            <p>
              <b>AÑO DEL CARNAVAL:</b> {samba.año_carnaval}
            </p>
          </div>
        ))
      ) : (
        <p>No tiene</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={createSamba}
          className="flex h-fit items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          Crear Samba
        </button>
        <button
          onClick={addSamba}
          className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          <BiPlus />
          Samba
        </button>
      </div>
      <SambaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        samba={activeSamba}
      />
    </>
  );
};
