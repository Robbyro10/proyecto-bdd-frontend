import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { HabilidadesModal } from "./HabilidadesModal";
import { useRouter } from "next/router";
import { sambaApi } from "@/api/sambaApi";
import { fireToast } from "@/utils/fireToast";
import Swal from "sweetalert2";

interface Props {
  habilidades: any[];
}

export const HabilidadesUi: FC<Props> = ({ habilidades }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const editHabilidad = () => {
    console.log("edit habliasd");
  };

  const deleteHabilidad = async (id_habilidad: number) => {
    await sambaApi
      .patch(`/integrantes/remove-habilidad/${router.query.id}`, {
        id_habilidad,
      }).then(() => fireToast("Habilidad eliminada del integrante"))
  };

  return (
    <>
      <h2 className="font-bold text-xl text-primary mt-5">HABILIDADES</h2>
      {habilidades[0] ? (
        <div className="flex gap-3 flex-wrap mt-3">
          {habilidades.map((hab: any) => (
            <div
              className="flex bg-accent-light p-3 rounded items-center hover:scale-105 transition ease-out shadow group hover:group-hover w-52"
              key={hab.id_habilidad}
            >
              <h5 className="font-semibold mr-5">{hab.nombre_habilidad}</h5>
              {/* <button
                onClick={editHabilidad}
                className="hover:scale-110 h-fit ml-auto transition ease-out hidden group-hover:flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
              >
                <FaPencilAlt />
              </button> */}
              <button
                onClick={() => deleteHabilidad(hab.id_habilidad)}
                className="hover:scale-110 ml-auto h-fit transition ease-out hidden group-hover:flex text-error"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>NO TIENE</p>
      )}
      <HabilidadesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id_integrante={router.query.id}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        Agregar Habilidad
      </button>
    </>
  );
};
