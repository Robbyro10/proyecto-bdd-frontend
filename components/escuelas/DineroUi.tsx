import { fetcher } from '@/utils/fetcher';
import { FC } from 'react'
import useSWR from "swr";

interface Props {
    id: string;
}

export const DineroUi: FC<Props> = ({ id }) => {

    const { data, error, isLoading } = useSWR(`/escuelas/money/${id}`, fetcher, {
        refreshInterval: 1000,
      });
    
      if (isLoading) return <h1>Loading...</h1>;
    
      const {
        titulos,
        empresas,
        personas,
        eventos,
      } = data;

      console.log(data)

  return (
    <div>
        <h2 className="font-bold text-xl mt-5 text-primary">DINERO</h2>
        <h3 className="text-lg font-bold mt-3">EMPRESAS</h3>
        <h3 className="text-lg font-bold mt-3">TITULOS</h3>
        <h3 className="text-lg font-bold mt-3">PERSONAS</h3>
        <h3 className="text-lg font-bold mt-3">EVENTOS</h3>
    </div>
  )
}
