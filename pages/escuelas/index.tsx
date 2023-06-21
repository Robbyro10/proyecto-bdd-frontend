import { EscuelaModal } from "@/components/escuelas";
import { EscuelasList } from "@/components/escuelas/EscuelasList";
import { AppLayout } from "@/components/layouts";
import { Fab } from "@/components/ui/Fab";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const EscuelasPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppLayout
      title="Escuelas de Samba"
      pageDescription="Toda la informacion que puedas desear sobre las escuelas de samba"
    >
      <div className="flex items-end gap-2 w-fit mb-8">
        <Image
          src={"/colegio.png"}
          alt="icono de colegio"
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold">Escuelas de Samba</h1>
      </div>

      <EscuelasList />
      <EscuelaModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Fab handleClick={()=> setIsOpen(true)}>
        <AiOutlinePlus />
      </Fab>
    </AppLayout>
  );
};

export default EscuelasPage;
