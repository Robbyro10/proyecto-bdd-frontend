import { sambaApi } from "@/api/sambaApi";
import { fetcher } from "@/utils/fetcher";
import React, { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import useSWR from "swr";
import { EscuelaModal } from "./EscuelaModal";
import Swal from "sweetalert2";

export const EscuelasTable: FC = () => {
  const { data, error, isLoading } = useSWR(`/escuelas`, fetcher, {
    refreshInterval: 1000,
  });

  const [lugares, setLugares] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSchool, setActiveSchool] = useState(null);

  useEffect(() => {
    sambaApi
      .get("/escuelas/lugar")
      .then((res) => {
        setLugares(res.data);
      })
      .catch((err) => console.log(err));
  }, [isOpen]);

  const handleAdd = () => {
    setActiveSchool(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: '¿Borrar Registro?',
      text: "Esta acción es irreversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar' 
    }).then((result) => {
      if (result.isConfirmed) {
          sambaApi.delete("/escuelas/" + id);
        }
      })
  };

  const handleEdit = (escuela: any) => {
    setActiveSchool(escuela);
    setIsOpen(true);
  };

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
    { data.length > 0 ? (
      <table className="w-full bg-purple-100">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Direccion_sede</th>
            <th>Resumen_hist</th>
            <th>Id_lugar</th>
            <th></th>
          </tr>
          {data.map((escuela: any) => (
            <tr key={escuela.id}>
              <td className="text-center">{escuela.id}</td>
              <td>{escuela.nombre}</td>
              <td>{escuela.direccion_sede}</td>
              <td>{escuela.resumen_hist}</td>
              <td className="text-center">{escuela.id_lugar}</td>
              <td>
                <div className="flex justify-center gap-3">
                  <button onClick={() => handleDelete(escuela.id)}>
                    <FaTrash />
                  </button>
                  <button onClick={() => handleEdit(escuela)}>
                    <HiPencil />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
    : (
      <h1 className="text-2xl text-center">No hay Escuelas, agrega una!</h1>
    )}
      {lugares.length > 0 ? (
        <>
          <button
            onClick={handleAdd}
            className="bg-secondary mt-5 text-white rounded px-3 py-2 font-bold shadow hover:scale-105 transition ease-out"
          >
            Agregar Escuela
          </button>

          <EscuelaModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            escuela={activeSchool}
          />
        </>
      ) : (
        <h3>Agregue lugares para poder agregar Escuelas de Samba</h3>
      )}
    </>
  );
};
