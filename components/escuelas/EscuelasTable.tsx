import { sambaApi } from "@/api/sambaApi";
import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";

interface Props {
  escuelas: any;
}

export const EscuelasTable: FC<Props> = ({ escuelas }) => {
  const handleDelete = async (id: number) => {
    await sambaApi.delete("/escuelas/" + id);
  };

  const handleEdit = (id: number) => {
    console.log("This will edit the school of id:" + id);
  };

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Direccion_sede</th>
          <th>Resumen_hist</th>
          <th>Id_lugar</th>
          <th></th>
        </tr>
        {escuelas.map((escuela: any) => (
          <tr key={escuela.id}>
            <td className="text-center">{escuela.id}</td>
            <td>{escuela.nombre}</td>
            <td>{escuela.direccion_sede}</td>
            <td>{escuela.resumen_hist}</td>
            <td>{escuela.id_lugar || "NULL"}</td>
            <td>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(escuela.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleEdit(escuela.id)}>
                  <HiPencil />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
