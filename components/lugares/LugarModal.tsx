import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { fireToast } from "@/utils/fireToast";
import { deleteFalsyAttributes, fireError, uppercaseStrings } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LugarModal: FC<Props> = ({ isOpen, onClose }) => {
  const { data, error, isLoading } = useSWR(`/escuelas/lugar`, fetcher);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = { ...data, id_lugar_padre: parseInt(data.id_lugar_padre) };
    data = uppercaseStrings(data);
    deleteFalsyAttributes(data);
    await sambaApi
      .post(`/escuelas/lugar`, data)
      .then(() => {
        fireToast("Lugar agregado con éxito");
        onClose();
      })
      .catch(() => {
        fireError();
      });
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
          <h1 className="font-bold text-3xl text-secondary">Crear Lugar</h1>
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
            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Tipo</label>
              <BsChevronDown className="absolute right-4 bottom-3" />

              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("tipo")}
              >
                <option value={"CIUDAD"}>CIUDAD</option>
                <option value={"ESTADO"}>ESTADO</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Lugar Padre</label>
              <BsChevronDown className="absolute right-4 bottom-3" />

              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("id_lugar_padre")}
              >
                <option></option>
                {data.map((lugar: any) =>
                  lugar.tipo === "ESTADO" ? (
                    <option key={lugar.id} value={lugar.id}>
                      {lugar.nombre}
                    </option>
                  ) : null
                )}
              </select>
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
