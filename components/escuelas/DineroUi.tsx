import { fetcher } from "@/utils/fetcher";
import { FC } from "react";
import useSWR from "swr";

interface Props {
  id: string;
}

export const DineroUi: FC<Props> = ({ id }) => {
  const { data, error, isLoading } = useSWR(`/escuelas/money/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <h1>Loading...</h1>;

  const { titulos, empresas, personas, eventos } = data;

  console.log(data);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 text-primary">DINERO OBTENIDO</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold mt-3">EMPRESAS</h3>
          {empresas[0] ? (
            empresas.map((emp: any) => (
              <div className="mt-2">
                <p className="font-semibold">{emp.monto_r$} R$</p>
                <small>{emp.nombre}&nbsp;</small>
                <small>{emp.fecha.substring(0, 10)}</small>
              </div>
            ))
          ) : (
            <p>No tiene</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold mt-3">PERSONAS</h3>
          {personas[0] ? (
            personas.map((per: any) => (
              <div className="mt-2">
                <p className="font-semibold">{per.monto_r$} R$</p>
                <small>{per.primer_nombre}&nbsp;{per.primer_apellido}&nbsp;</small>
                <small>{per.fecha.substring(0, 10)}</small>
              </div>
            ))
          ) : (
            <p>No tiene</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold mt-3">TITULOS</h3>
          {titulos[0] ? (
            titulos.map((tit: any) => (
              <div className="mt-2 flex gap-2 items-center">
                <p className="font-semibold">{tit.monto_ganado} R$</p>
                <small>{tit.año.substring(0,10)}</small>
              </div>
            ))
          ) : (
            <p>No tiene</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold mt-3">EVENTOS</h3>
          {eventos[0] ? (
            eventos.map((eve: any) => (
              <div className="mt-2 flex items-center gap-2">
                <p className="font-semibold">{eve.ingresoTotal} R$</p>
                <small>{eve.nombre}-{eve.tipo}</small>
              </div>
            ))
          ) : (
            <p>No tiene</p>
          )}
        </div>
      </div>
    </div>
  );
};
