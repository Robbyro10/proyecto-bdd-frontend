import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  telefono?: any;
}

export const TelefonoModal: FC<Props> = ({
  isOpen,
  onClose,
  telefono,
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
    setValue("cod_int", telefono?.cod_int);
    setValue("cod_area", telefono?.cod_area);
    setValue("numero", telefono?.numero);

  }, [telefono]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, 
        doc_identidad: parseInt(data.doc_identidad),
     };
    if (telefono) {
      await sambaApi.patch(`/patrocinantes/persona/${telefono.id}`, data);
    } else await sambaApi.post("/patrocinantes/persona", data);
    onClose();
    console.log(data);
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
            {telefono ? "Editar" : "Agregar"} Teléfono
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1">
              <label className="text-lg">Teléfono</label>
              <div className="flex gap-3">
                <input
                  className="w-24 px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="number"
                  placeholder="Cód. Int"
                  {...register("cod_int", {
                    required: true,
                  })}
                />
                {errors.telefono?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
                <input
                  className="w-28 px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="number"
                  placeholder="Cód. área"
                  {...register("cod_area", {
                    required: true,
                  })}
                />
                {errors.telefono?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
                <input
                  className="w-full px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="number"
                  placeholder="Teléfono"
                  {...register("numero", {
                    required: true,
                  })}
                />
                {errors.telefono?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
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


