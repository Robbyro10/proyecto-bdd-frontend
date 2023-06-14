import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-secondary py-4 shadow">
      <div className="flex justify-between max-w-6xl mx-auto px-5">
        <div className="flex gap-2 items-center">
          <Image src={'/mascara.png'} alt={'icono de mascara de carnaval'} width={35} height={35}/>
          <Link href="/" className="font-bold text-2xl text-white">
            SambaExpress
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 font-bold text-white">
            <Link href="/" className="">
              Home
            </Link>
            <Link href="#" className="">
              About
            </Link>
            <Link href="#" className="">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
