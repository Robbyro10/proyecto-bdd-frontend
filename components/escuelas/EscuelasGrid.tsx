import React, { FC } from "react";

interface Props {
  escuelas: any;
}

export const EscuelasGrid: FC<Props> = ({ escuelas }) => {

  return (

    <table className="w-full">
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Direccion_sede</th>
            <th>Resumen_hist</th>
            <th>Id_lugar</th>
        </tr>
        {
            escuelas.map((escuela: any) => (
                <tr >
                    <td>{escuela.id}</td>
                    <td>{escuela.nombre}</td>
                    <td>{escuela.direccion_sede}</td>
                    <td>{escuela.resumen_hist}</td>
                    <td>{escuela.id_lugar || "NULL"}</td>
                </tr>
            ))
        }
    </table>
  );
};
