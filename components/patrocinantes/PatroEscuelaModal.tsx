import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";
import { checkDates, fireError, fireToast } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tipo: string;
  escuela: any;
}

export const PatroEscuelaModal: FC<Props> = ({
  isOpen,
  onClose,
  tipo,
  escuela,
}) => {
  const { data, error, isLoading } = useSWR(`/escuelas`, fetcher);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    setValue(
      "fecha_ini",
      escuela?.fecha_ini.substring(0, 10) ||
        new Date().toISOString().substring(0, 10)
    );
    setValue('agjid_escuela', escuela?.id);
    setValue(
      "fecha_fin",
      escuela?.fecha_fin ? escuela?.fecha_fin.substring(0, 10) : null
    );
  }, [escuela]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = {
      ...data,
      patrocinante_id: parseInt(router.query.id as string),
      agjid_escuela: parseInt(data.agjid_escuela),
    };
    if (data.fecha_fin === "" || data.fecha_fin === null) {
      delete data.fecha_fin;
    }
    if (checkDates(data.fecha_ini, data.fecha_fin)) {
      if (escuela) {
        console.log(data)
        await sambaApi
          .patch(`/patrocinantes/${tipo}/escuela/${escuela.hist_id}`, data)
          .then(() => {
            fireToast("Patrocinio actualizado con éxito");
            onClose();
          })
          
      } else {
        await sambaApi
          .post(`/patrocinantes/${tipo}/escuela`, data)
          .then(() => {
            fireToast("Patrocinio agregado con éxito");
            onClose();
          })
          .catch(() => fireError());
      }
    } else {
      fireError();
    }
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
            {escuela ? "Editar" : "Agregar"} Patrocinio
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            {escuela ? (
              <p>ESCUELA: {escuela.nombre}</p>
            ) : (
              <div className="flex flex-col gap-1 relative">
                <label className="text-lg">Seleccione una Escuela</label>
                <BsChevronDown className="absolute right-4 bottom-3" />

                <select
                  className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                  {...register("agjid_escuela")}
                >
                  {data.map((escuela: any) => (
                    <option key={escuela.id} value={escuela.id}>
                      {escuela.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
                  {...register("fecha_fin")}
                />
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
