import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";

interface Props {
  eventos: any[];
}

export const EventosUi: FC<Props> = ({ eventos }) => {
  const addEvento = () => {
    console.log("add persna");
  };
  return (
    <>
      <h3 className="text-xl font-bold my-3 text-primary">
        EVENTOS DE LA ESCUELA
      </h3>

      {eventos && (
        <div className="flex flex-col gap-3">
          {eventos.map((evento: any) => (
            <div key={evento.id} className="flex flex-col shadow p-3 bg-accent-light rounded">
              <h5 className="text-lg">
                <b>{evento.nombre}</b> - {evento.tipo}
              </h5>
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
    </>
  );
};
