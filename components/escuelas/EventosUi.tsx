import { FC, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { EventosModal } from "./EventosModal";
import { FaPencilAlt } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { sambaApi } from "@/api/sambaApi";
import { fireError, fireToast } from "@/utils";

interface Props {
  eventos: any[];
}

export const EventosUi: FC<Props> = ({ eventos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEvento, setActiveEvento] = useState(undefined);

  const updateEvento = (evento: any) => {
    setActiveEvento(evento);
    setIsOpen(true);
  }

  const addEvento = () => {
    setActiveEvento(undefined);
    setIsOpen(true);
  }

  const deleteEvento = (id: string) => {
    Swal.fire({
      title: "¿Borrar Evento?",
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
            .delete("/escuelas/evento/" + id)
            .then(() => fireToast("Evento borrado con éxito"));
        } catch (error) {
          fireError();
        }
      }
    });
  }

  return (
    <>
      <h3 className="text-xl font-bold my-3 text-primary">
        EVENTOS DE LA ESCUELA
      </h3>

      {eventos && (
        <div className="flex flex-col gap-3">
          {eventos.map((evento: any) => (
            <div key={evento.id} className="flex flex-col shadow p-3 bg-accent-light rounded">
              <div className="flex items-center justify-between">
              <h5 className="text-lg">
                <b>{evento.nombre}</b> - {evento.tipo}
              </h5>
              <div>
                <button
                  onClick={()=> updateEvento(evento)}
                  className="hover:scale-110 h-fit transition ease-out text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => deleteEvento(evento.id)}
                  className="hover:scale-110 h-fit transition ease-out text-error"
                >
                  <FiTrash2 />
                </button>
              </div>

              </div>
              <small className="mb-2">
                {evento.fecha_ini.substring(0, 10)} HASTA{" "}
                {evento.fecha_fin.substring(0, 10)}
              </small>
              <p>{evento.descripcion}</p>
              <p>{evento.costo_unitario_r$}$</p>
              <p className="flex gap-2 items-center">
                <HiUsers />
                {evento.total_asistentes}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={addEvento}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Evento
      </button>
      <EventosModal isOpen={isOpen} onClose={()=> setIsOpen(false)} evento={activeEvento} />
    </>
  );
};
