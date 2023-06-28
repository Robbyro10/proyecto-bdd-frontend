import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import { fireToast } from "@/utils/fireToast";
import { checkDates, fireError, uppercaseStrings } from "@/utils";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rol: any
}

export const RolesModal: FC<Props> = ({ isOpen, onClose, rol }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

//   useEffect(() => {
//     setValue("año", new Date().toISOString().substring(0, 10));
//     setValue("")
//   }, []);

  const { data, error, isLoading } = useSWR(`/escuelas/lugar`, fetcher, {
    refreshInterval: 1000,
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = uppercaseStrings(data);


    await sambaApi.post("escuelas/rol", data);
    fireToast("Rol agregado con éxito");
    
    onClose();
  };

  if (isLoading) return <h1>Loading...</h1>;

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
            {rol ? "Editar" : "Crear"} Rol
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            {/* <div className="flex flex-col gap-1 w-full">
                  <label className="text-lg">Año de desempeño</label>
                  <input
                    className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                    type="date"
                    {...register("año", {
                      required: true,
                    })}
                  />
                  {errors.año?.type === "required" && (
                    <p className="text-error mb-3">Campo obligatorio</p>
                  )}
                </div> */}
            <div className="flex flex-col gap-1">
              <label className="text-lg">Nombre</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Nombre"
                {...register("nombre", {required: true})}
              />
              {errors.nombre?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg">Descripción</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Descripción"
                {...register("descripcion", { required: true})}
              />
              {errors.descripcion?.type === "required" && (
                <p className="text-error mb-3">Campo obligatorio</p>
              )}
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
