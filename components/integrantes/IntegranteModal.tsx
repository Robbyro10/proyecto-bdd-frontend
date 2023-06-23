import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import Swal from "sweetalert2";
import { fireToast } from "@/utils/fireToast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  integrante?: any;
}

export const IntegranteModal: FC<Props> = ({ isOpen, onClose, integrante }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("primer_nombre", integrante?.primer_nombre);
    setValue("segundo_nombre", integrante?.segundo_nombre);
    setValue("primer_apellido", integrante?.primer_apellido);
    setValue("segundo_apellido", integrante?.segundo_apellido);
    setValue("genero", integrante?.genero);
    setValue("apodo", integrante?.apodo);
    setValue("doc_identidad", integrante?.doc_identidad);
    setValue("nacionalidad", integrante?.nacionalidad);
    setValue("fecha_nac", integrante?.fecha_nac);
  }, [integrante]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, doc_identidad: parseInt(data.doc_identidad) };
    data = uppercaseStrings(data);
    if (!data.fecha_nac){
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Agregue la fecha de nacimiento',
      })
    }
    if (integrante) {
      await sambaApi.patch(`/integrantes/${integrante.id}`, data);
      fireToast('Integrante actualizado con éxito');
    } else {
      await sambaApi.post("/integrantes", data);
      fireToast('Integrante agregado con éxito');
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
            {integrante ? "Editar" : "Agregar"} Integrante
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Primer Nombre</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Primer Nombre"
                  {...register("primer_nombre", {
                    required: true,
                  })}
                />
                {errors.primer_nombre?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Segundo Nombre</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Segundo Nombre"
                  {...register("segundo_nombre")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Primer Apellido</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Primer Apellido"
                  {...register("primer_apellido", {
                    required: true,
                  })}
                />
                {errors.primer_apellido?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Segundo Apellido</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Segundo Apellido"
                  {...register("segundo_apellido", {
                    required: true,
                  })}
                />
                {errors.segundo_apellido?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
            </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Fecha de Nacimiento</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  {...register("fecha_nac")}
                />
              </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Doc. de Identidad</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="number"
                  placeholder="Doc. de Identidad"
                  {...register("doc_identidad")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Nacionalidad</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Nacionalidad"
                  {...register("nacionalidad", {
                    required: true,
                  })}
                />
                {errors.nacionalidad?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Apodo</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Apodo"
                  {...register("apodo")}
                />
              </div>
              <div className="flex flex-col gap-1 relative">
                <label className="text-lg">Genero</label>
                <BsChevronDown className="absolute right-4 bottom-3" />
                <select
                  className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                  {...register("genero", { required: true})}
                >
                  <option value={"M"}>Masculino</option>
                  <option value={"F"}>Femenino</option>
                </select>
              </div>
            </div>

            <button className="mt-5 bg-secondary hover:bg-purple-500 transition ease-out text-white font-bold py-2 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
