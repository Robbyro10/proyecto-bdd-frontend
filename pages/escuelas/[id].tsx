import { AppLayout } from "@/components/layouts";
import { fetcher } from "@/utils/fetcher";
import { GetServerSideProps, NextPage } from "next";
import { FaPencilAlt } from "react-icons/fa";
import useSWR from "swr";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { EscuelaModal } from "@/components/escuelas";
import Swal from "sweetalert2";
import { sambaApi } from "@/api/sambaApi";
import { useRouter } from "next/router";
import { TelefonoUi } from "@/components/telefonos/TelefonoUi";

interface Props {
  id: string;
}

const EscuelaDetailPage: NextPage<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { replace } = useRouter();
  const { data, error, isLoading } = useSWR(`/escuelas/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Borrar Escuela?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sambaApi.delete("/escuelas/" + id);
        replace("/escuelas");
      }
    });
  };

  if (isLoading) return <h1>Loading...</h1>;
  let escuela = data[0];

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
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-4xl">{escuela.nombre}</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:scale-110 text-xl h-fit transition ease-out flex text-secondary gap-2 font-bold px-4 py-1 rounded-md items-center"
        >
          <FaPencilAlt />
        </button>
      </div>
      <EscuelaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        escuela={escuela}
      />
      <h2 className="font-bold text-xl mt-5">HISTORIA</h2>
      <p>{escuela.resumen_hist}</p>
      <h2 className="font-bold text-xl mt-5">UBICACIÓN</h2>
      <p>{escuela.nombre_lugar}</p>
      <p>{escuela.direccion_sede}</p>

      <TelefonoUi id={id} telefono={telefono} tipo="escuela" />

      <button
        onClick={handleDelete}
        className="flex items-center text-error font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-error hover:bg-error border border-error hover:text-white transition ease-out"
      >
        <FiTrash2 />
        Borrar Escuela
      </button>
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
