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
import { useRouter } from "next/router";
import { fireError } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentescoModal: FC<Props> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { data, error, isLoading } = useSWR(`/integrantes`, fetcher, {
    refreshInterval: 1000,
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = {
        ...data,
      integrante1: parseInt(router.query.id as string),
      integrante2: parseInt(data.integrante2 as string),
    };
    if (data.integrante1 === data.integrante2) {
      fireError();
    }
    data = uppercaseStrings(data);
    console.log(data)
    await sambaApi.post("/integrantes/parentesco", data);
    fireToast("Parentesco agregado con éxito");
    onClose();
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
            Agregar Parentesco
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Integrante</label>
              <BsChevronDown className="absolute right-4 bottom-3" />
              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("integrante2")}
              >
                {data.map((int: any) => (
                  <option key={int.id} value={int.id}>
                    {int.primer_nombre}&nbsp;{int.primer_apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-lg">Relación</label>
              <input
                className="px-3 py-2 rounded-lg border-2 hover:border-secondary transition ease-out"
                type="text"
                placeholder="Relación"
                {...register("relacion", {
                  required: true,
                })}
              />
              {errors.relacion?.type === "required" && (
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
