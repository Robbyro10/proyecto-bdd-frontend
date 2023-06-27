import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import { fireToast } from "@/utils/fireToast";
import { fireError } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  samba?: any;
  integrantes: any[];
}

export const SambaModal: FC<Props> = ({
  isOpen,
  onClose,
  samba,
  integrantes,
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
    setValue("titulo", samba?.titulo);
    setValue("año_carnaval", samba?.año_carnaval);
    setValue("letra", samba?.letra);
    setValue("tipo", samba?.tipo);
    setValue("autor", samba?.autor);
  }, [samba]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, año_carnaval: parseInt(data.año_carnaval) };
    data = uppercaseStrings(data);
    if (parseInt(data.año_carnaval.substr(0, 4)) > 2023){
      return fireError();
    }
    if (samba) {
      await sambaApi.patch(`/sambas/${samba.id}`, data);
      fireToast("samba actualizada con éxito");
    } else {
      await sambaApi.post("/sambas", data);
      fireToast("samba agregada con éxito");
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
            {samba ? "Editar" : "Agregar"} Samba
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex gap-3 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Título</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="text"
                  placeholder="Título"
                  {...register("titulo", {
                    required: true,
                  })}
                />
                {errors.titulo?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
              {integrantes[0] ? (
                <div className="flex flex-col gap-1 relative w-full">
                  <label className="text-lg">Autor</label>
                  <BsChevronDown className="absolute right-4 bottom-3" />

                  <select
                    className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                    {...register("autor")}
                  >
                    {integrantes.map((int: any) => (
                      <option key={int.id} value={int.id}>
                        {int.primer_nombre}&nbsp;{int.primer_apellido}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <h2>Necesita agregar integrantes</h2>
              )}
            </div>
            <div className="flex gap-3 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Año de Carnaval</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="number"
                  placeholder="Año de Carnaval"
                  {...register("año_carnaval", {
                    required: true,
                  })}
                />
                {errors.año_carnaval?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
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
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Letra</label>
              <textarea
                className="px-3 resize-none h-40 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                placeholder="Letra"
                {...register("letra", {
                  required: true,
                })}
              />
              {errors.letra?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
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
