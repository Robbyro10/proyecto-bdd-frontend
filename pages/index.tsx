import { AppLayout } from "@/components/layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <AppLayout title="Home" pageDescription="Esta es la pagina principal">
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={"/mascara.png"}
          alt="macara de carnaval"
          width={100}
          height={100}
        />
        <h1 className="text-5xl font-bold capitalize">Samba Express</h1>
        <h5>Conoce toda la informacion sobre los carnavales de Brazil</h5>
      </div>

      <div className="flex justify-around flex-wrap gap-5 mt-10">
        <div className="flex flex-col gap-5">
          <Link href={"/escuelas"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/colegio.png"}
              alt="icono de colegio"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">
              Escuelas de Samba
            </h1>
          </Link>
          <Link href={"/integrantes"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/multitud.png"}
              alt="icono de multitud"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">Integrantes</h1>
          </Link>
          <Link href={"/samba"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/guitarra.png"}
              alt="icono de guitarra y musica"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">Samba</h1>
          </Link>

          <Link href={"/empresa"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/empresa.png"}
              alt="icono de empresa"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">
              Patrocinante Empresa
            </h1>
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={"/persona"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/empresario.png"}
              alt="icono de empresario"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">
              Patrocinante Persona
            </h1>
          </Link>
          <Link href={"/telefonos"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/llamada.png"}
              alt="icono de telefono"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold hover:underline">Teléfonos</h1>
          </Link>
          <Link href={"/donacion"} className="flex items-end gap-2 w-fit">
            <Image
              src={"/donacion.png"}
              alt="icono de flujo de donacion"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold hover:underline">Donación</h1>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
