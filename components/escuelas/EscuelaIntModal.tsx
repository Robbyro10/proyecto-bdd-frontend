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
  integrante?: any;
}

export const EscuelaIntModal: FC<Props> = ({ isOpen, onClose, integrante }) => {
  const { data, error, isLoading } = useSWR(`/integrantes`, fetcher);
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
      integrante?.fecha_ini.substring(0, 10) ||
        new Date().toISOString().substring(0, 10)
    );
    setValue("autoridad", integrante?.autoridad === "SI" ? true : false);
    setValue("agjid_integrante", integrante?.id);
    setValue(
      "fecha_fin",
      integrante?.fecha_fin ? integrante?.fecha_fin.substring(0, 10) : null
    );
  }, [integrante]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = {
      ...data,
      agjid_escuela: parseInt(router.query.id as string),
      agjid_integrante: parseInt(data.agjid_integrante),
    };
    if (data.autoridad === true) {
      data.autoridad = "SI";
    } else {
      data.autoridad = "NO";
    }
    if (data.fecha_fin === "" || !data.fecha_fin) {
      delete data.fecha_fin;
    }
    if (checkDates(data.fecha_ini, data.fecha_fin)) {
      if (integrante) {
        console.log(data)
        await sambaApi
          .patch(
            `/integrantes/int-escuela/` + data.fecha_ini,
            data
          )
          .then(() => {
            fireToast("Escuela actualizada con éxito");
            onClose();
          })
          
      } else {
        await sambaApi
          .post(`/integrantes/int-escuela`, data)
          .then(() => {
            fireToast("Escuela agregada con éxito");
            onClose();
          })
          .catch(() => fireError());
      }
    } else {
      fireError("Fechas inválidas");
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
            {integrante ? "Cerrar Histórico" : "Agregar Integrante"}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            {integrante ? (
              <p>
                INTEGRANTE: {integrante.primer_nombre}&nbsp;
                {integrante.primer_apellido}
              </p>
            ) : (
              <div className="flex flex-col gap-1 relative">
                <label className="text-lg">Seleccione un Integrante</label>
                <BsChevronDown className="absolute right-4 bottom-3" />
                <select
                  className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                  {...register("agjid_integrante")}
                >
                  {data.map((integrante: any) => (
                    <option key={integrante.id} value={integrante.id}>
                      {integrante.primer_nombre}&nbsp;
                      {integrante.primer_apellido}
                      &nbsp;{integrante.segundo_apellido}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex gap-3 w-full">
              {integrante ? (
                <p>FECHA INI: {integrante.fecha_ini.substring(0, 10)}</p>
              ) : (
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
              )}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-lg">Fecha Fin</label>
                <input
                  className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                  type="date"
                  {...register("fecha_fin")}
                />
              </div>
            </div>
            {integrante ? (
              <p>{integrante.autoridad ? "Es autoridad" : "No es autoridad"}</p>
            ) : (
              <div className="flex gap-3 w-full items-center">
                <label className="text-lg">Es Autoridad</label>
                <input
                  className="accent-secondary"
                  type="checkbox"
                  {...register("autoridad")}
                />
              </div>
            )}

            <button className="mt-5 bg-secondary hover:bg-purple-500 transition ease-out text-white font-bold py-2 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
