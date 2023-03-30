import Head from "next/head";
import { FC, PropsWithChildren } from "react";

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
      {/* <Navbar /> */}
      <main
      className="min-h-screen"
        style={{
          padding: "70px 20px",
        }}
      >
        {children}
      </main>
      <footer>{/* todo footer */}</footer>
    </>
  );
};
