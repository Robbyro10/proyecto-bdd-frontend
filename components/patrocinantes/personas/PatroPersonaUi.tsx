import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { sambaApi } from "@/api/sambaApi";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { PatroPersonaModal } from "./PatroPersonaModal";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  persona: any;
  id: string;
}

export const PatroPersonaUi: FC<Props> = ({ persona, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { replace } = useRouter();

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Borrar Patrocinante?",
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
          .delete("/patrocinantes/persona/" + id)
          .then(() => replace("/patrocinante-persona"))
          .catch((error) => console.log(error));
      }
    });
  };
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-3xl text-primary">
          {persona.primer_nombre}&nbsp;
          {persona.segundo_nombre && persona.segundo_nombre + " "}
          {persona.primer_apellido}&nbsp;
          {persona.segundo_apellido}
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
        >
          <FaPencilAlt />
        </button>

        {/* <button
          onClick={handleDelete}
          className="flex ml-auto items-center text-error font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out"
        >
          <FiTrash2 />
          Borrar Patrocinante
        </button> */}
      </div>
      <h2 className="font-bold text-xl mt-5">EMAIL DE CONTACTO</h2>
      <p>{persona.email_contacto}</p>
      <h2 className="font-bold text-xl mt-5">DOC. DE IDENTIDAD</h2>
      <p>{persona.doc_identidad}</p>

      <PatroPersonaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        patroPersona={persona}
      />
    </>
  );
};
