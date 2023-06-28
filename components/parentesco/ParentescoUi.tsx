import Link from "next/link";
import { FC, useState } from "react";
import { ParentescoModal } from "./ParentescoModal";

interface Props {
    parientes: any[];
}

export const ParentescoUi: FC<Props> = ({ parientes }) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1 className="font-bold text-xl text-primary mt-5">PARIENTES</h1>
      <div className="flex flex-col gap-3 mt-2">
        {parientes[0] ? (
          parientes.map((par: any) => (
            <div key={par.integrante1 + par.integrante2} className="">
              <p className="text-sm">
                {par.relacion} DE{" "}
                <Link
                  href={"/integrantes/" + par.integrante2}
                  className="text-secondary hover:underline"
                >
                  {par.primer_nombre} {par.primer_apellido}
                </Link>
              </p>
            </div>
          ))
        ) : (
          <p>NO TIENE</p>
        )}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        Agregar Parentesco
      </button>
      <ParentescoModal isOpen={isOpen} onClose={()=> setIsOpen(false)} />
    </div>
  );
};
