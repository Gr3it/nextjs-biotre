import type { Metadata } from "next";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verbali - BioTre GAS",
  description:
    "Verbali delle assemblee del Gruppo di Acquisto Solidale BioTre.",
};

export default async function VerbaliPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/verbali");
  }

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto w-full flex flex-col items-center text-center gap-8">
          <h1 className="text-h2 font-serif text-primary-dark">Verbali</h1>
          <p className="text-lg text-text-muted">Contenuto in arrivo.</p>
        </div>
      </section>
    </div>
  );
}
