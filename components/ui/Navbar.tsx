import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar = () => {
  const { asPath } = useRouter();

  return (
    <nav className="bg-secondary py-4 shadow">
      <div className="flex justify-between max-w-6xl mx-auto px-5">
        <Link href="/" className="flex gap-2 items-center">
          <Image src={'/mascara.png'} alt={'icono de mascara de carnaval'} width={35} height={35}/>
          <h2 className="font-bold text-2xl text-white">
            SambaExpress
          </h2>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center font-bold text-white">
            <Link href="/escuelas" className={`hover:bg-white hover:text-secondary rounded-md px-2 py-1 transition ${asPath.includes('/escuelas') ? 'text-secondary bg-white' : ''}`}>
              Escuelas
            </Link>
            <Link href="/integrantes" className={`hover:bg-white hover:text-secondary rounded-md px-2 py-1 transition ${asPath.includes('/integrantes') ? 'text-secondary bg-white' : ''}`}>
              Integrantes
            </Link>
            <Link href="/patrocinante-empresa" className={`hover:bg-white hover:text-secondary rounded-md px-2 py-1 transition ${asPath.includes('/patrocinante-empresa') ? 'text-secondary bg-white' : ''}`}>
              Empresas
            </Link>
            <Link href="/patrocinante-persona" className={`hover:bg-white hover:text-secondary rounded-md px-2 py-1 transition ${asPath.includes('/patrocinante-persona') ? 'text-secondary bg-white' : ''}`}>
              Personas
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
