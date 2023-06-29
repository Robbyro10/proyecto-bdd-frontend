import { sambaApi } from "@/api/sambaApi";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { EscuelaModal } from "./EscuelaModal";

interface Props {
    escuela: any;
    id: string;
}

export const EscuelasUi:FC<Props> = ({ escuela, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { replace } = useRouter();
  const handleDelete = async () => {
    Swal.fire({
      title: "¿Borrar Escuela?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sambaApi
          .delete("/escuelas/" + id)
          .then(() => replace("/escuelas"))
          .catch((error) => console.log(error));
      }
    });
  };
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-4xl text-primary">{escuela.nombre}</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
        >
          <FaPencilAlt />
        </button>
        {/* <button
          onClick={handleDelete}
          className="flex ml-auto items-center text-error font-bold gap-2 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out"
        >
          <FiTrash2 />
          Borrar Escuela
        </button> */}
      </div>
      <h2 className="font-bold text-xl mt-5">HISTORIA</h2>
      <p>{escuela.resumen_hist}</p>
      <h2 className="font-bold text-xl mt-5">UBICACIÓN</h2>
      <p>{escuela.nombre_lugar}</p>
      <h2 className="font-bold text-xl mt-5">DIRECCIÓN</h2>
      <p>{escuela.direccion_sede}</p>
      <EscuelaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        escuela={escuela}
      />
    </>
  );
};
