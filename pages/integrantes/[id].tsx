import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { FaPencilAlt } from "react-icons/fa";
import useSWR from "swr";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { IntegranteModal } from "@/components/integrantes/IntegranteModal";

interface Props {
  id: string;
}

const IntegranteDetailPage: NextPage<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, isLoading } = useSWR(`/integrantes/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  let { integrante, habilidades } = data;

  return (
    <AppLayout
      title={`${integrante[0].primer_nombre} ${integrante[0].primer_apellido} - Integrante`}
      pageDescription={`Toda la informacion que puedas desear sobre la integrante ${integrante.nombre}`}
    >
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-3xl">
          {integrante[0].primer_nombre}&nbsp;
          {integrante[0].segundo_nombre && integrante[0].segundo_nombre + " "}
          {integrante[0].primer_apellido}&nbsp;
          {integrante[0].segundo_apellido}
        </h1>
        <button onClick={()=> setIsOpen(true)} className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center">
          <FaPencilAlt />
        </button>
      </div>
      <h2 className="font-bold mt-5">NACIONALIDAD</h2>
      <p>{integrante[0].nacionalidad}</p>
      <h2 className="font-bold mt-5">FECHA DE NACIMIENTO</h2>
      <p>{integrante[0].fecha_nac}</p>
      <h2 className="font-bold mt-5">APODO</h2>
      {integrante[0].apodo ? <p>{integrante[0].apodo}</p> : <p>NO TIENE</p>}
      <h2 className="font-bold mt-5">DOC. DE IDENTIDAD</h2>
      {integrante[0].doc_identidad ? (
        <p>{integrante[0].doc_identidad}</p>
      ) : (
        <p>NO TIENE</p>
      )}
      <IntegranteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        integrante={integrante[0]}
      />

      <h2 className="font-bold text-2xl mt-5 mb-2">HABILIDADES</h2>
      {habilidades[0] ? (
        <ol className="list-disc">
          {habilidades.map((hab: any) => (
            <li className="ml-5" key={hab.id_habilidad}>
              {hab.nombre_habilidad}
            </li>
          ))}
        </ol>
      ) : (
        <p>NO TIENE</p>
      )}

      <button className="flex items-center text-error font-bold gap-2 mt-10 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out">
        <FiTrash2 />
        Borrar Integrante
      </button>
    </AppLayout>
  );
};

export default IntegranteDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};
