import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { TituloModal } from "./TituloModal";
import { BiPlus } from "react-icons/bi";
import { sambaApi } from "@/api/sambaApi";
import { fireToast } from "@/utils/fireToast";
import { fireError } from "@/utils";
import Swal from "sweetalert2";

interface Props {
  titulos: any[];
}

export const TitulosUi: FC<Props> = ({ titulos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTitulo, setActiveTitulo] = useState(undefined);
  const updateTitulo = (titulo: any) => {
    setActiveTitulo(titulo);
    setIsOpen(true);
  };

  const deleteTitulo = async (año: string) => {
    Swal.fire({
      title: "¿Borrar Título?",
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
            .delete("/escuelas/titulo/" + año.substring(0, 10))
            .then(() => fireToast("Título borrado con éxito"));
        } catch (error) {
          fireError();
        }
      }
    });
  };

  const addTitulo = () => {
    setActiveTitulo(undefined);
    setIsOpen(true);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mt-5 text-primary">TÍTULOS OBTENIDOS</h2>
      {titulos[0] ? (
        <div className="flex gap-3 flex-wrap my-5">
          {titulos.map((tit: any) => (
            <div
              key={tit.año}
              className="bg-accent-light p-3 rounded transition ease-out shadow group hover:group-hover w-60"
            >
              <div className="flex items-center mb-2">
                <h5 className="text-lg font-bold mr-5">
                  {tit.año.substring(0, 10)}
                </h5>
                <button
                  onClick={() => updateTitulo(tit)}
                  className="hover:scale-110 ml-auto h-fit transition ease-out text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => deleteTitulo(tit.año)}
                  className="hover:scale-110 h-fit transition ease-out text-error"
                >
                  <FiTrash2 />
                </button>
              </div>
              <p>
                GRUPO: <b>{tit.grupo}</b>
              </p>
              {tit.monto_ganado > 0 && <p>MONTO: {tit.monto_ganado} R$</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>NO TIENE</p>
      )}
      <TituloModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titulo={activeTitulo}
      />
      <button
        onClick={addTitulo}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Título
      </button>
    </div>
  );
};
