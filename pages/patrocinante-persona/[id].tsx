import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { FaPencilAlt } from "react-icons/fa";
import useSWR from "swr";
import { FiTrash2 } from "react-icons/fi";
import { PatroPersonaModal } from "@/components/patrocinantes/personas/PatroPersonaModal";
import { useState } from "react";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";

interface Props {
  id: string;
}

const PatroPersonaDetailPage: NextPage<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/patrocinantes/persona/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  let persona = data[0];
  let telefono = {
    cod_int: persona.cod_int,
    cod_area: persona.cod_area,
    numero: persona.numero,
  };

  return (
    <AppLayout
      title={`${persona.primer_nombre} ${persona.primer_apellido} - Persona`}
      pageDescription={`Toda la informacion que puedas desear sobre la persona ${persona.nombre}`}
    >
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-3xl">
          {persona.primer_nombre}&nbsp;
          {persona.segundo_nombre && persona.segundo_nombre + " "}
          {persona.primer_apellido}&nbsp;
          {persona.segundo_apellido}
        </h1>
        <button onClick={()=> setIsOpen(true)} className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center">
          <FaPencilAlt />
        </button>
      </div>
      <h2 className="font-bold text-xl mt-5">EMAIL DE CONTACTO</h2>
      <p>{persona.email_contacto}</p>
      <h2 className="font-bold text-xl mt-5">DOC. DE IDENTIDAD</h2>
      <p>{persona.doc_identidad}</p>

      <TelefonoUi id={id} telefono={telefono} />

      <PatroPersonaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        patroPersona={persona}
      />
      <button className="flex items-center text-error font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out">
        <FiTrash2 />
        Borrar Patrocinante
      </button>
    </AppLayout>
  );
};

export default PatroPersonaDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};
