import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import {
  ColoresUi,
  EmpresasUi,
  EscuelaModal,
  EscuelasUi,
  EventosUi,
  PersonasUi,
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

      <EventosUi eventos={eventos} />

      <TitulosUi titulos={titulos} />

      <h2 className="font-bold text-xl mt-5 text-primary">INTEGRANTES</h2>
      {integrantes ? (
        <ol className="list-disc mt-3">
          {integrantes.map((int: any) => (
            <li key={int.id} className="ml-5">
              <Link
                href={"/integrantes/" + int.id}
                className="hover:underline text-secondary"
              >
                {int.primer_nombre}&nbsp;
                {int.primer_apellido}&nbsp;
                {int.segundo_apellido}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p>NO TIENE</p>
      )}

      <h2 className="font-bold text-xl mt-5 text-primary">SAMBAS</h2>
      {sambas[0] ? (
        sambas.map((samba: any) => (
          <div
            key={samba.año_carnaval}
            className="bg-accent-light p-3 rounded shadow mt-3"
          >
            <h2 className="font-bold text-lg">
              {samba.titulo} -{" "}
              <small className="font-normal">{samba.tipo}</small>
            </h2>
            <p>
              <b>AUTOR:</b> {samba.primer_nombre}&nbsp;{samba.primer_apellido}
            </p>
            <p className="my-2">{samba.letra}</p>
            <p><b>AÑO DEL CARNAVAL:</b> {samba.año_carnaval}</p>
          </div>
        ))
      ) : (
        <p>No tiene</p>
      )}

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
