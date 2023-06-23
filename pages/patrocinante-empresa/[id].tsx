import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { FaPencilAlt } from "react-icons/fa";
import useSWR from "swr";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { PatroEmpresaModal } from "@/components/patrocinantes/empresas/PatroEmpresaModal";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";

interface Props {
  id: string;
}

const PatroEmpresaDetailPage: NextPage<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/patrocinantes/empresa/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;
  let empresa = data[0];
  let telefono = {
    cod_int: empresa.cod_int,
    cod_area: empresa.cod_area,
    numero: empresa.numero,
  };

  return (
    <AppLayout
      title={`${empresa.nombre} - Empresa`}
      pageDescription={`Toda la informacion que puedas desear sobre la empresa ${empresa.nombre}`}
    >
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-4xl">{empresa.nombre}</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
        >
          <FaPencilAlt />
        </button>
      </div>
      <h2 className="font-bold text-xl mt-5">MISIÓN</h2>
      <p>{empresa.mision}.</p>
      <h2 className="font-bold text-xl mt-5">EMAIL DE CONTACTO</h2>
      <p>{empresa.email_contacto}</p>
      <PatroEmpresaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        patroEmpresa={empresa}
      />

      <TelefonoUi id={id} telefono={telefono} tipo="empresa" />

      <p>{empresa.direccion_sede}</p>
      <button className="flex items-center text-error font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out">
        <FiTrash2 />
        Borrar Patrocinante
      </button>
    </AppLayout>
  );
};

export default PatroEmpresaDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};
