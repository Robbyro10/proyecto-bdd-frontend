import { EscuelasTable } from "@/components/escuelas/EscuelasTable";
import { AppLayout } from "@/components/layouts";

const EscuelasPage = () => {

  return (
    <AppLayout
      title="Escuelas de Samba"
      pageDescription="Toda la informacion que puedas desear sobre las escuelas de samba"
    >
      <EscuelasTable />
    </AppLayout>
  );
};

export default EscuelasPage;
