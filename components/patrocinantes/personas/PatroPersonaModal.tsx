import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import { fireToast } from "@/utils/fireToast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patroPersona?: any;
}

export const PatroPersonaModal: FC<Props> = ({
  isOpen,
  onClose,
  patroPersona,
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
    setValue("primer_nombre", patroPersona?.primer_nombre);
    setValue("segundo_nombre", patroPersona?.segundo_nombre);
    setValue("primer_apellido", patroPersona?.primer_apellido);
    setValue("segundo_apellido", patroPersona?.segundo_apellido);
    setValue("doc_identidad", patroPersona?.doc_identidad);
    setValue("email_contacto", patroPersona?.email_contacto);

  }, [patroPersona]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, 
        doc_identidad: parseInt(data.doc_identidad),
     };
    data = uppercaseStrings(data);
    if (patroPersona) {
      await sambaApi.patch(`/patrocinantes/persona/${patroPersona.id}`, data);
      fireToast('Patrocinante actualizado con éxito');
    } else {
      await sambaApi.post("/patrocinantes/persona", data);
      fireToast('Patrocinante agregado con éxito');
    }
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
            {patroPersona ? "Editar" : "Agregar"} Persona Patrocinante
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
              <label className="text-lg">Doc. de Identidad</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="number"
                max={99999999}
                placeholder="Doc. de Identidad"
                {...register("doc_identidad")}
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
