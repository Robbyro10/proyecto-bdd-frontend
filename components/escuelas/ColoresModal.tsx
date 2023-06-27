import React, { FC, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { sambaApi } from "@/api/sambaApi";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { fireToast } from "@/utils/fireToast";
import { useRouter } from "next/router";
import { fireError } from "@/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ColoresModal: FC<Props> = ({ isOpen, onClose }) => {
  const { data, error, isLoading } = useSWR(`/escuelas/color`, fetcher);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    data = {escuela_id: parseInt(router.query.id as string), color_id: parseInt(data.color_id)};
    await sambaApi.post(`/escuelas/color`, data)
    .then(()=> {
      fireToast("Color agregado con éxito");
      onClose();
    }).catch(()=> fireError());
  };

  if (isLoading) return <h1>Loading...</h1>

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
          <h1 className="font-bold text-3xl text-secondary">Agregar Color</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex flex-col gap-1 relative">
              <label className="text-lg">Seleccione un Color</label>
              <BsChevronDown className="absolute right-4 bottom-3" />

              <select
                className="px-3 py-2 rounded-lg border-2 focus:outline-secondary hover:border-secondary transition ease-out appearance-none"
                {...register("color_id")}
              >
                {data.map((color: any) => (
                  <option key={color.id} value={color.id}>
                    {color.nombre}
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
