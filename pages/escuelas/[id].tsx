import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import {
  ColoresUi,
  EmpresasUi,
  EscuelaIntUi,
  EscuelaModal,
  EscuelasUi,
  EventosUi,
  PersonasUi,
  SambasUi,
  TitulosUi,
} from "@/components/escuelas";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";
import Link from "next/link";

interface Props {
  id: string;
}

const EscuelaDetailPage: NextPage<Props> = ({ id }) => {
  const { data, error, isLoading } = useSWR(`/escuelas/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  const {
    escuela: [escuela],
    colores,
    titulos,
    empresas,
    personas,
    eventos,
    integrantes,
    sambas,
  } = data;

  let telefono = {
    cod_int: escuela.cod_int,
    cod_area: escuela.cod_area,
    numero: escuela.numero,
  };

  return (
    <AppLayout
      title={`${escuela.nombre} - Escuela`}
      pageDescription={`Toda la informacion que puedas desear sobre la escuela ${escuela.nombre}`}
    >
      <EscuelasUi id={id} escuela={escuela} />

      <TelefonoUi id={id} telefono={telefono} tipo="escuela" />

      <ColoresUi colores={colores} />

      <EscuelaIntUi integrantes={integrantes} />

      <EventosUi eventos={eventos} />

      <TitulosUi titulos={titulos} />

      <SambasUi sambas={sambas} integrantes={integrantes} />

      <h2 className="font-bold text-xl mt-5 text-primary">PATROCINANTES</h2>
      <EmpresasUi empresas={empresas} />
      <PersonasUi personas={personas} />
    </AppLayout>
  );
};

export default EscuelaDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};
