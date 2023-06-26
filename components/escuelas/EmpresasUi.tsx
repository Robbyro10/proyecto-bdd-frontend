import Link from "next/link";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";

interface Props {
  empresas: any[];
}

export const EmpresasUi: FC<Props> = ({ empresas }) => {
    const addEmpresa = () => {console.log('add empresa')}
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold mt-3">EMPRESAS</h3>
      {empresas && (
        <>
          {empresas.map((emp: any) => (
            <div key={emp.id} className="flex flex-col">
              <Link
                href={"/patrocinante-empresa/" + emp.empresa_id}
                className="w-fit font-semibold text-secondary hover:underline"
              >
                {emp.nombre}
              </Link>
              <p>
                {emp.fecha_ini.substring(0, 10)} HASTA{" "}
                {emp.fecha_fin ? emp.fecha_fin.substring(0, 10) : "ACTUALIDAD"}
              </p>
            </div>
          ))}
        </>
      )}
      <button
        onClick={addEmpresa}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Empresa
      </button>
    </div>
  );
};
