import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import { fireToast } from "@/utils/fireToast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  evento?: any;
}

export const EventosModal: FC<Props> = ({ isOpen, onClose, evento }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("nombre", evento?.nombre);
    setValue("tipo", evento?.tipo);
    setValue("descripcion", evento?.descripcion);
    setValue("fecha_ini", evento?.fecha_ini);
    setValue("fecha_fin", evento?.fecha_fin);
    setValue("costo_unitario_r$", evento?.costo_unitario_r$);
    setValue("total_asistentes", evento?.total_asistentes);
  }, [evento]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, id_lugar: parseInt(data.id_lugar) };
    data = uppercaseStrings(data);
    if (evento) {
      await sambaApi.patch(`/escuelas/evento/${evento.id}`, data);
      fireToast("Evento actualizado con éxito");
    } else {
      await sambaApi.post("/escuelas/eventos", data);
      fireToast("Evento agregado con éxito");
    }
    onClose();
  };

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
          <h1 className="font-bold text-3xl text-secondary">
            {evento ? "Editar" : "Agregar"} Evento
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1">
              <label className="text-lg">Nombre del evento</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Nombre del evento"
                {...register("nombre", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Tipo</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Tipo"
                {...register("tipo", {
                  required: true,
                })}
              />
              {errors.tipo?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex gap-3 w-full">

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg">Fecha de Inicio</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="date"
                {...register("fecha_ini", {
                  required: true,
                })}
              />
              {errors.fecha_ini?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg">Fecha Fin</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="date"
                {...register("fecha_fin", {
                  required: true,
                })}
              />
              {errors.fecha_fin?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Descripción</label>
              <textarea
                className="px-3 resize-none h-20 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                placeholder="Descripción"
                {...register("descripcion", {
                  required: true,
                })}
              />
              {errors.descripcion?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex gap-3 w-full">

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg">Total de Asistentes</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="number"
                placeholder="Total de Asistentes"
                {...register("total_asistentes", {
                  required: true,
                })}
              />
              {errors.total_asistentes?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg">Costo Unitario (R$)</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="number"
                placeholder="Costo unitario (R$)"
                {...register("costo_unitario_r$", {
                  required: true,
                })}
              />
              {errors.costo_unitario_r$?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>
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
