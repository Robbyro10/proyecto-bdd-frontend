import { AppLayout } from "@/components/layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <AppLayout title="Home" pageDescription="Esta es la pagina principal">
      <div className="mx-auto w-fit my-5">
        <Image
          src={"/mascara.png"}
          alt="macara de carnaval"
          width={100}
          height={100}
        />
      </div>
      <h1 className="text-5xl font-bold text-center capitalize">
        Samba Express
      </h1>

      <div className="flex flex-col gap-5">
        <Link href={"/escuelas"} className="flex items-end gap-2  w-fit">
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
        <Link href={"/integrantes"} className="flex items-end gap-2  w-fit">
          <Image
            src={"/multitud.png"}
            alt="icono de multitud"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold hover:underline">Integrantes</h1>
        </Link>
        <Link href={"/samba"} className="flex items-end gap-2  w-fit">
          <Image
            src={"/guitarra.png"}
            alt="icono de guitarra y musica"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold hover:underline">Samba</h1>
        </Link>
        <Link href={"/empresa"} className="flex items-end gap-2  w-fit">
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
        <Link href={"/telefonos"} className="flex items-end gap-2  w-fit">
          <Image
            src={"/llamada.png"}
            alt="icono de telefono"
            width={40}
            height={50}
          />
          <h1 className="text-2xl font-bold hover:underline">Teléfonos</h1>
        </Link>
      </div>
    </AppLayout>
  );
}
