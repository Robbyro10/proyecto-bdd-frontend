import React, { FC, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { RolesModal } from "./RolesModal";
import { AddRolModal } from "./AddRolModal";

interface Props {
  roles: any[];
}

export const RolesUi: FC<Props> = ({ roles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRol, setIsOpenRol] = useState(false);
  const [activeRol, setActiveRol] = useState(undefined);
  const addRol = () => {
    setIsOpenRol(true);
  };

  const createRol = () => {
    setActiveRol(undefined);
    setIsOpen(true);
  };

  console.log(roles)

  return (
    <>
      <h1 className="font-bold text-xl text-primary mt-5">
        ROLES DESEMPEÑADOS
      </h1>
      <div className="flex flex-col gap-3 mt-2">
        {roles[0] ? (
          roles.map((rol: any) => (
            <div key={rol.año + rol.id} className="">
              <p className="text-sm">{rol.descripcion}.</p>
              <b className="text-sm">{rol.año.substring(0, 10)}</b>
            </div>
          ))
        ) : (
          <p>NO TIENE</p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={createRol}
          className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          Crear Rol
        </button>
        <button
          onClick={addRol}
          className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          <BiPlus />
          Rol
        </button>
      </div>
      <RolesModal isOpen={isOpen} onClose={()=> setIsOpen(false)} rol={activeRol} />
      <AddRolModal isOpen={isOpenRol} onClose={()=> setIsOpenRol(false)} />
    </>
  );
};
