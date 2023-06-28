import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";
import { PatroPersonaUi } from "@/components/patrocinantes/personas";
import { PatroEscuelasUi } from "@/components/patrocinantes/PatroEscuelasUi";

interface Props {
  id: string;
}

const PatroPersonaDetailPage: NextPage<Props> = ({ id }) => {

  const { data, error, isLoading } = useSWR(
    `/patrocinantes/persona/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  let {
    persona: [persona],
    escuelas, donaciones
  } = data;

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
      <PatroPersonaUi id={id} persona={persona} />
      <TelefonoUi id={id} telefono={telefono} tipo="persona" />
      <PatroEscuelasUi escuelas={escuelas} donaciones={donaciones} tipo="persona" />
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
