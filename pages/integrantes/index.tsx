import { IntegrantesList } from "@/components/integrantes/IntegrantesList";
import { AppLayout } from "@/components/layouts";
import { Fab } from "@/components/ui/Fab";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { IntegranteModal } from "@/components/integrantes/IntegranteModal";
import Image from "next/image";
import { HabilidadesModal } from "@/components/integrantes";

const IntegrantesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHabilidad, setIsOpenHabilidad] = useState(false);

  return (
    <AppLayout
      title="Integrantes"
      pageDescription="Toda la informacion que puedas desear sobre los integrantes de las escuelas de samba"
    >
      <div className="flex justify-between">
        <div className="flex items-end gap-2 w-fit mb-8">
          <Image
            src={"/multitud.png"}
            alt="icono de multitud"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold">Integrantes</h1>
        </div>
        <button
          onClick={() => setIsOpenHabilidad(true)}
          className="flex h-fit items-center text-secondary font-bold gap-2 mt-3 bg-white rounded-md px-3 py-1 bg-secondary hover:bg-secondary border border-secondary hover:text-white transition ease-out"
        >
          Agregar Habilidad
        </button>
      </div>

      <IntegrantesList />
      <HabilidadesModal isOpen={isOpenHabilidad} onClose={()=> setIsOpenHabilidad(false)} />
      <IntegranteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Fab handleClick={() => setIsOpen(true)}>
        <AiOutlinePlus />
      </Fab>
    </AppLayout>
  );
};

export default IntegrantesPage;
