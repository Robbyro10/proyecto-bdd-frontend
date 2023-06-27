import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { FaPencilAlt } from "react-icons/fa";
import useSWR from "swr";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import {
  HabilidadesUi,
  IntEscuelaUi,
  IntegranteModal,
  IntegrantesUi,
} from "@/components/integrantes";
import { sambaApi } from "@/api/sambaApi";
import { Router, useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

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
  } = data;
  
  return (
    <AppLayout
      title={`${integrante.primer_nombre} ${integrante.primer_apellido} - Integrante`}
      pageDescription={`Toda la informacion que puedas desear sobre la integrante ${integrante.nombre}`}
    >
      <IntegrantesUi id={id} integrante={integrante} />

      <IntEscuelaUi escuela={escuela} />
      
      <HabilidadesUi habilidades={habilidades} />

      <h1 className="font-bold text-xl text-primary mt-5">
        ROLES DESEMPEÑADOS
      </h1>
      <div className="flex flex-col gap-3 mt-2">
        {roles[0] ? (
          roles.map((rol: any) => (
            <div key={rol.año} className="">
              <p className="text-sm">{rol.descripcion}.</p>
              <b className="text-sm">{rol.año.substring(0, 10)}</b>
            </div>
          ))
        ) : (
          <p>NO TIENE</p>
        )}
      </div>

      <h1 className="font-bold text-xl text-primary mt-5">PARIENTES</h1>
      <div className="flex flex-col gap-3 mt-2">
        {parientes[0] ? (
          parientes.map((par: any) => (
            <div key={par.integrante1 + par.integrante2} className="">
              <p className="text-sm">
                {par.relacion} DE{" "}
                <Link href={"/integrantes/" + par.integrante2} className="text-secondary hover:underline">
                  {par.primer_nombre} {par.primer_apellido}
                </Link>
              </p>
            </div>
          ))
        ) : (
          <p>NO TIENE</p>
        )}
      </div>
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
