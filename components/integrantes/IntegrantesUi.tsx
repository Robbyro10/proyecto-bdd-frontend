import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IntegranteModal } from "./IntegranteModal";
import { sambaApi } from "@/api/sambaApi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export interface Props {
  integrante: any;
  id: string;
}

export const IntegrantesUi: FC<Props> = ({ integrante, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { replace } = useRouter();
  const handleDelete = async () => {
    Swal.fire({
      title: "¿Borrar Integrante?",
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
          .delete("/integrantes/" + id)
          .then(() => replace("/integrantes"))
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-3xl text-primary">
          {integrante.primer_nombre}&nbsp;
          {integrante.segundo_nombre && integrante.segundo_nombre + " "}
          {integrante.primer_apellido}&nbsp;
          {integrante.segundo_apellido}
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={handleDelete}
          className="flex ml-auto items-center text-error font-bold gap-2 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out"
        >
          <FiTrash2 />
          Borrar Integrante
        </button>
      </div>
      <h2 className="font-bold mt-5">NACIONALIDAD</h2>
      <p>{integrante.nacionalidad}</p>
      <h2 className="font-bold mt-5">FECHA DE NACIMIENTO</h2>
      <p>{integrante.fecha_nac}</p>
      <h2 className="font-bold mt-5">APODO</h2>
      {integrante.apodo ? <p>{integrante.apodo}</p> : <p>NO TIENE</p>}
      <h2 className="font-bold mt-5">DOC. DE IDENTIDAD</h2>
      {integrante.doc_identidad ? (
        <p>{integrante.doc_identidad}</p>
      ) : (
        <p>NO TIENE</p>
      )}
      <IntegranteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        integrante={integrante}
      />
    </>
  );
};
