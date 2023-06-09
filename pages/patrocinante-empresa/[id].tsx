import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";
import { PatroEmpresaUi } from "@/components/patrocinantes/empresas";
import Link from "next/link";
import { DonacionesUi } from "@/components/patrocinantes/DonacionesUi";
import { PatroEscuelasUi } from "@/components/patrocinantes/PatroEscuelasUi";
interface Props {
  id: string;
}

const PatroEmpresaDetailPage: NextPage<Props> = ({ id }) => {
  const { data, error, isLoading } = useSWR(
    `/patrocinantes/empresa/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;
  let {
    empresa: [empresa],
    escuelas, donaciones
  } = data;
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
      <PatroEmpresaUi empresa={empresa} id={id} />
      <TelefonoUi id={id} telefono={telefono} tipo="empresa" />
      <PatroEscuelasUi escuelas={escuelas} donaciones={donaciones} tipo="empresa" />

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
