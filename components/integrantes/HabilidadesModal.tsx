import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { uppercaseStrings } from "@/utils/uppercaseStrings";
import { fireToast } from "@/utils/fireToast";
import Swal from "sweetalert2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id_integrante?: any;
}

export const HabilidadesModal: FC<Props> = ({
  isOpen,
  onClose,
  id_integrante,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, error, isLoading } = useSWR(`/integrantes/habilidad`, fetcher, {
    refreshInterval: 1000,
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = uppercaseStrings(data);
    if (id_integrante) {
      data = { id_habilidad: parseInt(data.id_habilidad) };
      await sambaApi.patch(`/integrantes/habilidad/${id_integrante}`, data)
      .then(()=> {
        fireToast("Integrante actualizado con éxito");
        onClose();
      })
      .catch(() => Swal.fire('Error', 'Agregue una habilidad diferente', 'error') )
    } else {
      await sambaApi.post("/integrantes/habilidad", data);
      fireToast("Habilidad agregada con éxito");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

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
            {id_integrante ? "Seleccionar" : "Agregar"} Habilidad
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1">
              {id_integrante ? (
                <div className="flex flex-col gap-1 relative">
                  <label className="text-lg">Seleccione una Habilidad</label>
                  <BsChevronDown className="absolute right-4 bottom-3" />

                  <select
                    className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                    {...register("id_habilidad")}
                  >
                    {data.map((hab: any) => (
                      <option key={hab.id} value={hab.id}>
                        {hab.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Habilidad</label>
                  <input
                    className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                    type="text"
                    placeholder="Habilidad"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  {errors.nombre?.type === "required" && (
                    <p className="text-error mb-3">Campo obligatorio</p>
                  )}
                </div>
              )}
            </div>

            { !id_integrante &&
              <>
                <p>Habilidades Agregadas:</p>
                <div className="flex -mt-3 flex-wrap">
                  {data.map((hab: any) => (
                    <small key={hab.id} className=" text-gray-600">
                      - {hab.nombre}&nbsp;
                    </small>
                  ))}
                </div>
              </>
            }

            <button className="bg-secondary mt-5 hover:bg-purple-500 transition ease-out text-white font-bold py-2 rounded-lg">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
