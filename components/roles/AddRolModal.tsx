import React, { FC, useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import { fireToast } from "@/utils/fireToast";
import {
  checkDates,
  fireError,
  isDateBetween,
  uppercaseStrings,
} from "@/utils";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRolModal: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [historicos, setHistoricos] = useState([]);

  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `/integrantes/rol`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    try {
      sambaApi
        .get(`integrantes/hist/` + router.query.id)
        .then((res) => setHistoricos(res.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
        const parts = data.escuelaFecha_ini.split("/");
      data = {
        ...data,
        hist_int_agjid_integrante: parseInt(router.query.id as string),
        agjid_rol: parseInt(data.agjid_rol),
        hist_int_agjid_escuela: parseInt(parts[0]),
        hist_int_fecha_ini: parts[1].substring(0, 10),
      };
      delete data.escuelaFecha_ini;
    //   console.log(data)
      if (parseInt(data.año.substr(0, 4)) > 2023) {
        return fireError("Año inválido");
      } else {
        await sambaApi.post(`integrantes/rol`, data);
        fireToast("Rol agregado con éxito");
        onClose();
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
            Agregar Rol a Integrante
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col w-full gap-1 relative">
              <label className="text-lg">Rol</label>
              <BsChevronDown className="absolute right-4 bottom-3" />
              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("agjid_rol")}
              >
                {data.map((rol: any) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>
              <div className="flex flex-col w-full gap-1 relative">
                <label className="text-lg">Seleccione Histórico</label>
                <BsChevronDown className="absolute right-4 bottom-3" />
                <select
                  className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                  {...register("escuelaFecha_ini")}
                >
                  {historicos.map((hist: any) => (
                    <option
                      key={hist.fecha_ini + hist.id}
                      value={
                        hist.agjid_escuela +
                        "/" +
                        hist.fecha_ini.substring(0, 10)
                      }
                    >
                      {hist.nombre} ({hist.fecha_ini.substring(0, 10)} a{" "}
                      {hist.fecha_fin
                        ? hist.fecha_fin.substring(0, 10)
                        : "ACTUALIDAD"}
                      )
                    </option>
                  ))}
                </select>
              </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Año</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="date"
                placeholder="Año"
                {...register("año", {
                  required: true,
                })}
              />
              {errors.año?.type === "required" && (
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
