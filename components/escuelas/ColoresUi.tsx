import { FC, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { ColoresModal } from "./ColoresModal";
import { fireToast } from "@/utils/fireToast";
import { sambaApi } from "@/api/sambaApi";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";
import { fireError } from "@/utils";

interface Props {
  colores: any[];
}

export const ColoresUi: FC<Props> = ({ colores }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const deleteColor = async(color_id: number) => {
    await sambaApi.patch(`/escuelas/color/${router.query.id}`, {color_id})
    .then(()=> fireToast("Color eliminado con éxito"))
    .catch(()=> fireError());
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-xl mt-5 text-primary">COLORES</h2>
      {colores[0] ? (
        <div className="flex gap-3 flex-wrap mt-3">
          {colores.map((color: any) => (
            <div
              className={`flex bg-accent-light p-3 rounded items-center hover:scale-105 transition ease-out shadow group hover:group-hover w-40`}
              key={color.id}
            >
              <h5 className="font-semibold mr-5">{color.nombre}</h5>
              <button
                onClick={() => deleteColor(color.id)}
                className="hover:scale-110 ml-auto h-fit transition ease-out hidden group-hover:flex text-error"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>NO TIENE</p>
      )}
      <button
        onClick={()=> setIsOpen(true)}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Color
      </button>
      <ColoresModal isOpen={isOpen}  onClose={()=> setIsOpen(false)}/>
    </div>
  );
};
