import Link from "next/link";
import React, { FC } from "react";

interface Props {
  donaciones: any[];
}

export const DonacionesUi: FC<Props> = ({ donaciones }) => {
  console.log(donaciones);
  return (
    <>
      <h1 className="font-bold text-2xl text-primary mt-5">DONACIONES</h1>
      {donaciones[0] ? (
        donaciones.map((donacion: any) => (
          <div
            key={donacion.fecha}
            className="mt-3 flex justify-between bg-accent-light rounded shadow p-3 max-w-2xl"
          >
            <div>
              <h2 className="text-lg">
                <b>MONTO: </b>
                {donacion.monto_r$} R$
              </h2>
              <p>{donacion.fecha.substring(0, 10)}</p>
            </div>
            <Link
              href={"/escuelas/" + donacion.id}
              className="hover:underline text-secondary text-xs mt-auto"
            >
              {donacion.nombre}
            </Link>
          </div>
        ))
      ) : (
        <p>NO TIENE</p>
      )}
    </>
  );
};
