import Link from "next/link";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";

interface Props {
  personas: any[];
}

export const PersonasUi: FC<Props> = ({ personas }) => {
    const addPersona = () => {console.log('add persna')}
  return (
    <>
      <h3 className="text-lg font-bold mt-3">PERSONAS</h3>
      {personas[0] ? (
        <>
          {personas.map((per: any) => (
            <div key={per.id} className="flex flex-col">
              <Link
                href={"/patrocinante-persona/" + per.persona_id}
                className="w-fit font-semibold text-secondary hover:underline"
              >
                {per.primer_nombre} {per.primer_apellido}
              </Link>
              <p>
                {per.fecha_ini.substring(0, 10)} HASTA{" "}
                {per.fecha_fin?.substring(0, 10) || "ACTUALIDAD"}
              </p>
            </div>
          )) }
        </>
      ): <p>NO TIENE</p> }
      {/* <button
        onClick={addPersona}
        className="flex items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
      >
        <BiPlus />
        Persona
      </button> */}
    </>
  );
};
