import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import {
  HabilidadesUi,
  IntEscuelaUi,
  IntegranteModal,
  IntegrantesUi,
} from "@/components/integrantes";
import Link from "next/link";
import { PremiosUi } from "@/components/premios";
import { RolesUi } from "@/components/roles/RolesUi";
import { ParentescoUi } from "@/components/parentesco/ParentescoUi";

interface Props {
  id: string;
}

const IntegranteDetailPage: NextPage<Props> = ({ id }) => {
  const { data, error, isLoading } = useSWR(`/integrantes/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;
  let {
    integrante: [integrante],
    habilidades,
    escuela,
    roles,
    parientes,
    premios
  } = data;
  
  return (
    <AppLayout
      title={`${integrante.primer_nombre} ${integrante.primer_apellido} - Integrante`}
      pageDescription={`Toda la informacion que puedas desear sobre la integrante ${integrante.nombre}`}
    >
      <IntegrantesUi id={id} integrante={integrante} />

      <IntEscuelaUi escuela={escuela} />
      
      <HabilidadesUi habilidades={habilidades} />

      <RolesUi roles={roles} />

      <PremiosUi premios={premios} tipo={"I"} />

      <ParentescoUi parientes={parientes} />
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
