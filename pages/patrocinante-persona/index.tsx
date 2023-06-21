import { AppLayout } from "@/components/layouts";
import { Fab } from "@/components/ui/Fab";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import { PatroPersonaList } from "@/components/patrocinantes/personas/PatroPersonaList";
import { PatroPersonaModal } from "@/components/patrocinantes/personas/PatroPersonaModal";

const PatrocinantesPersonasPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AppLayout
      title="Personas Patrocinantes"
      pageDescription="Toda la informacion que puedas desear sobre los patrocinantes naturales de las escuelas de samba"
    >
      <div className="flex items-end gap-2 w-fit mb-8">
        <Image
          src={"/empresario.png"}
          alt="icono de empresario"
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold">Personas Patrocinantes</h1>
      </div>

      <PatroPersonaList />
      <PatroPersonaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Fab handleClick={()=> setIsOpen(true)}>
        <AiOutlinePlus />
      </Fab>
    </AppLayout>
  );
};

export default PatrocinantesPersonasPage;