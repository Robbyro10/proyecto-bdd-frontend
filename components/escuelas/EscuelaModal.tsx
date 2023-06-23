import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from 'react-icons/bs'
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import { fireToast } from "@/utils/fireToast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  escuela?: any;
}

export const EscuelaModal: FC<Props> = ({ isOpen, onClose, escuela }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, error, isLoading } = useSWR(`/escuelas/lugar`, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    setValue('nombre', escuela?.nombre);
    setValue('direccion_sede', escuela?.direccion_sede);
    setValue('resumen_hist', escuela?.resumen_hist);
    setValue('id_lugar', escuela?.id_lugar);
  }, [escuela])
  
  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = {...data, id_lugar: parseInt(data.id_lugar) }
    data = uppercaseStrings(data);
    if (escuela) {
      await sambaApi.patch(`/escuelas/${escuela.id}`, data);
      fireToast('Escuela actualizada con éxito');
    } else {
      await sambaApi.post('/escuelas', data);
      fireToast('Escuela agregada con éxito');
    }
    onClose();
  };

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="fixed bg-black z-20 inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm">
      <div
        tabIndex={0}
        className="bg-white shadow p-6 rounded-lg w-[500px] relative mx-2"
      >
        <button
          onClick={onClose}
          className="text-secondary text-2xl text-right rounded-full p-1 absolute top-0 right-0 my-5 mx-6 hover:bg-secondary hover:bg-opacity-20 transition ease-out"
        >
          <IoCloseSharp />
        </button>
        <div>
          <h1 className="font-bold text-3xl text-secondary">{escuela ? "Editar" : "Agregar"} Escuela</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1">
              <label className="text-lg">Nombre de la Escuela</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Nombre de la Escuela"
                {...register("nombre", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Dirección de Sede</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Dirección de Sede"
                {...register("direccion_sede", {
                  required: true,
                })}
              />
              {errors.direccion_sede?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Resumen Histórico</label>
              <textarea
                className="px-3 resize-none h-40 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                placeholder="Resumen Histórico"
                {...register("resumen_hist", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1 relative">
                <label className="text-lg">Lugar</label>
                <BsChevronDown className="absolute right-4 bottom-3" />

                <select
                  className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                  {...register("id_lugar")}
                >
                  {
                    data.map( (lugar: any) => (<option key={lugar.id} value={lugar.id} >{lugar.nombre}</option>))
                  }
                </select>
              </div>
            <button className="bg-secondary mt-5 hover:bg-purple-500 transition ease-out text-white font-bold py-2 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
