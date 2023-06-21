import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patroEmpresa?: any;
}

export const PatroEmpresaModal: FC<Props> = ({
  isOpen,
  onClose,
  patroEmpresa,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("nombre", patroEmpresa?.nombre);
    setValue("email_contacto", patroEmpresa?.email_contacto);
    setValue("mision", patroEmpresa?.mision);

  }, [patroEmpresa]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = uppercaseStrings(data);
    if (patroEmpresa) {
      await sambaApi.patch(`/patrocinantes/empresa/${patroEmpresa.id}`, data);
    } else await sambaApi.post("/patrocinantes/empresa", data);
    onClose();
  };

  return (
    <div className="fixed bg-black z-20 inset-0 bg-opacity-30 flex justify-center items-center backdrop-blur-sm">
      <div
        tabIndex={0}
        className="bg-white shadow p-6 rounded-lg w-[550px] relative mx-2"
      >
        <button
          onClick={onClose}
          className="text-secondary text-2xl text-right rounded-full p-1 absolute top-0 right-0 my-5 mx-6 hover:bg-secondary hover:bg-opacity-20 transition ease-out"
        >
          <IoCloseSharp />
        </button>
        <div>
          <h1 className="font-bold text-3xl text-secondary">
            {patroEmpresa ? "Editar" : "Agregar"} Empresa Patrocinante
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
              <div className="flex flex-col gap-1">
                <label className="text-lg">Nombre</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre", {
                    required: true,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Email de Contacto</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="email"
                placeholder="Email de Contacto"
                {...register("email_contacto", {
                  required: true,
                })}
              />
              {errors.email_contacto?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg">Misión</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Misión"
                {...register("mision")}
              />
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
