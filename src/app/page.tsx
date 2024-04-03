import Image from "next/image";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-bold">Welcome to Next.js</h1>
        <p className="mt-3 text-2xl">
          Get started by editing <code>pages/index.js</code>
        </p>
      </div>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </main>
  );
}
