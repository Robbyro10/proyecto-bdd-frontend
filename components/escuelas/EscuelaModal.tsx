import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EscuelaModal: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    await sambaApi.post('/escuelas', data);
    onClose();
  };

  return (
    <div className="fixed z-20 inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm">
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
          <h1 className="font-bold text-3xl text-secondary">Agregar Escuela</h1>
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
              {errors.direccion?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Resumen Histórico</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Resumen Histórico"
                {...register("resumen_hist", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>

            <button className="bg-secondary text-white font-bold py-2 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
