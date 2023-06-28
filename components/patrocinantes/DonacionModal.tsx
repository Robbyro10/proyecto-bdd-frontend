import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import { fireToast } from "@/utils/fireToast";
import { useRouter } from "next/router";
import { checkDates, deleteFalsyAttributes, fireError } from "@/utils";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  donacion?: any;
  escuelas: any[];
}

export const DonacionModal: FC<Props> = ({
  isOpen,
  onClose,
  donacion,
  escuelas,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("monto_r$", donacion?.monto_r$);
    setValue("fecha", new Date().toISOString().substring(0, 10));
  }, [donacion]);

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    const [hist_patrocinio_agjid_escuela, hist_patrocinio_id] = data.ids.split("-");
    delete data.ids;
    data = {...data, 
        monto_r$: parseInt(data.monto_r$),
        hist_patrocinio_agjid_escuela: parseInt(hist_patrocinio_agjid_escuela), 
        hist_patrocinio_id: parseInt(hist_patrocinio_id) 
    } 
    if (parseInt(data.fecha.substr(0, 4)) > 2023){ return fireError(); }
    if (donacion) { //not ready
      await sambaApi.patch(
        `/escuelas/donacion/${data.fecha.substring(0, 10)}`,
        data
      );
      fireToast("Donacion actualizada con éxito");
    } else {
      await sambaApi.post("/patrocinantes/donacion", data);
      fireToast("Donacion agregado con éxito");
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
            {donacion ? "Editar" : "Agregar"} Donación
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1">
              <label className="text-lg">Fecha</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="date"
                required
                {...register("fecha", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg">Monto</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="number"
                placeholder="Monto"
                {...register("monto_r$", {required:true})}
              />
              {errors.monto_r$?.type === "required" && (
                  <p className="text-error mb-3">Campo obligatorio</p>
                )}
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Patrocinio Correspondiente</label>
              <BsChevronDown className="absolute right-4 bottom-3" />

              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("ids")}
              >
                {escuelas.map((escuela: any) => (
                  <option
                    key={escuela.id}
                    value={escuela.id + "-" + escuela.hist_id}
                  >
                    {escuela.nombre} ({escuela.fecha_ini.substring(0, 10)} HASTA{" "}
                    {escuela.fecha_fin
                      ? escuela.fecha_fin.substring(0, 10)
                      : "ACTUALIDAD"}
                    )
                  </option>
                ))}
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
