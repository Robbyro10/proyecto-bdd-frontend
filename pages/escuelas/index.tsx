import { EscuelaModal } from '@/components/escuelas/EscuelaModal';
import { EscuelasTable } from '@/components/escuelas/EscuelasTable'
import { AppLayout } from '@/components/layouts'
import { fetcher } from '@/utils/fetcher';
import { useState } from 'react';
import useSWR from "swr";

const EscuelasPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSchool, setActiveSchool] = useState(null);

    const { data, error, isLoading } = useSWR(`/escuelas`, fetcher, {
        refreshInterval: 1000,
      });

      const handleAdd = () => {
        setActiveSchool(null);
        setIsOpen(true);
      }

      if (isLoading) return <div>cargando...</div>
      
  return (
    <AppLayout title='Escuelas de Samba' pageDescription='Toda la informacion que puedas desear sobre las escuelas de samba'>
      {
        data ? <EscuelasTable escuelas={data} /> : <h1>Oops!, no parece haber informacion</h1>
      }
        
      <button onClick={handleAdd} className='bg-secondary mt-5 text-white rounded px-3 py-2 font-bold shadow hover:-translate-y-1 transition ease-out'>Agregar Escuela</button>
      <EscuelaModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
    </AppLayout>
  )
}

export default EscuelasPage;