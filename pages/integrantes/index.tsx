import { IntegrantesList } from "@/components/integrantes/IntegrantesList";
import { AppLayout } from "@/components/layouts";
import { Fab } from "@/components/ui/Fab";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { IntegranteModal } from "@/components/integrantes/IntegranteModal";
import Image from "next/image";

const IntegrantesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AppLayout
      title="Integrantes"
      pageDescription="Toda la informacion que puedas desear sobre los integrantes de las escuelas de samba"
    >
      <div className="flex items-end gap-2 w-fit mb-8">
        <Image
          src={"/multitud.png"}
          alt="icono de multitud"
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold">Integrantes</h1>
      </div>

      <IntegrantesList />
      <IntegranteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Fab handleClick={()=> setIsOpen(true)}>
        <AiOutlinePlus />
      </Fab>
    </AppLayout>
  );
};

export default IntegrantesPage;
