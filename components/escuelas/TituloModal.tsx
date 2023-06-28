import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import { fireToast } from "@/utils/fireToast";
import { useRouter } from "next/router";
import { checkDates, fireError } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  titulo?: any;
}

export const TituloModal: FC<Props> = ({ isOpen, onClose, titulo }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    setValue("monto_ganado", titulo?.monto_ganado);
    setValue("grupo", titulo?.grupo);
    setValue("año", new Date().toISOString().substring(0, 10));
  }, [titulo]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    if (!data.monto_ganado) {
      data.monto_ganado = 0;
    }
    data = {
      ...data,
      monto_ganado: parseInt(data.monto_ganado),
      agjid_escuela: parseInt(router.query.id as string),
    };
    if (parseInt(data.año.substr(0, 4)) > 2023){
      return fireError("Año inválido");
    }
    if (titulo) {
      await sambaApi.patch(
        `/escuelas/titulo/${data.año.substring(0, 10)}`,
        data
      );
      fireToast("Título actualizado con éxito");
    } else {
      await sambaApi.post("/escuelas/titulo", data);
      fireToast("Titulo agregado con éxito");
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
            {titulo ? "Editar" : "Agregar"} Título de Carnaval
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            {titulo ? (
              <h1>Año del titulo: {titulo.año.substring(0, 10)}</h1>
            ) : (
              <div className="flex flex-col gap-1">
                <label className="text-lg">Año</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="date"
                  required
                  {...register("año")}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-lg">Monto Ganado</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="number"
                placeholder="Monto Ganado"
                {...register("monto_ganado")}
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Grupo</label>
              <BsChevronDown className="absolute right-4 bottom-3" />

              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("grupo")}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="Ac">Ac</option>
                <option value="E">E</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
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
