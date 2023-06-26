import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui/Navbar";

interface Props extends PropsWithChildren {
  title: string;
  pageDescription: string;
}

export const AppLayout: FC<Props> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>
      <Navbar />
      <main className="min-h-screen max-w-6xl mx-auto p-5 pb-28">
        {children}
      </main>
      <footer>{/* todo footer */}</footer>
    </>
  );
};
