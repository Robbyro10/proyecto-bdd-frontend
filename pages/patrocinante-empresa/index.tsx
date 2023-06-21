import { AppLayout } from "@/components/layouts";
import { Fab } from "@/components/ui/Fab";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import { PatroEmpresaList } from "@/components/patrocinantes/empresas/PatroEmpresaList";
import { PatroEmpresaModal } from "@/components/patrocinantes/empresas/PatroEmpresaModal";

const PatrocinanteEmpresasPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AppLayout
      title="Empresas Patrocinantes"
      pageDescription="Toda la informacion que puedas desear sobre las empresas patrocinantes de las escuelas de samba"
    >
      <div className="flex items-end gap-2 w-fit mb-8">
        <Image
          src={"/empresa.png"}
          alt="icono de empresa"
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold">Empresas Patrocinantes</h1>
      </div>

      <PatroEmpresaList />
      <PatroEmpresaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <Fab handleClick={()=> setIsOpen(true)}>
        <AiOutlinePlus />
      </Fab>
    </AppLayout>
  );
};

export default PatrocinanteEmpresasPage;