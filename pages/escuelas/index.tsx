import { EscuelasGrid } from '@/components/escuelas/EscuelasGrid'
import { AppLayout } from '@/components/layouts'
import { fetcher } from '@/utils/fetcher';
import useSWR from "swr";

const EscuelasPage = () => {

    const { data, error, isLoading } = useSWR(`/escuelas`, fetcher, {
        refreshInterval: 1000,
      });

      if (isLoading) return <div>cargando...</div>
      
  return (
    <AppLayout title='Escuelas de Samba' pageDescription='Toda la informacion que puedas desear sobre las escuelas de samba'>
      {
        data ? <EscuelasGrid escuelas={data} /> : <h1>Oops!, no parece haber informacion</h1>
      }
        
      <button className='bg-secondary mt-5 text-white rounded px-3 py-2 font-bold shadow hover:-translate-y-1 transition ease-out'>Agregar Escuela</button>
    </AppLayout>
  )
}

export default EscuelasPage;