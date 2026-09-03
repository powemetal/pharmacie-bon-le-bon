import { prisma } from "@/lib/prisma";

export default async function Page() {
  return (
    <section className="space-y-10" style={{ color: "var(--foreground)" }}>

      {/* HERO */}
      <div
        className="rounded-xl p-10 shadow-lg"
        style={{
          background: "var(--accent)",
          color: "var(--background)"
        }}
      >
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue à la Pharmacie Bon Le Bon
        </h1>
        <p className="text-lg opacity-90">
          Votre pharmacie de quartier, maintenant accessible en ligne.
        </p>
      </div>

      {/* SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <a
          href="/catalogue"
          className="shadow-md rounded-xl p-6 hover:shadow-lg transition"
          style={{ background: "var(--card)" }}
        >
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--accent-dark)" }}
          >
            Catalogue
          </h2>
          <p style={{ color: "var(--foreground)" }}>
            Consultez nos produits disponibles.
          </p>
        </a>

        <a
          href="/panier"
          className="shadow-md rounded-xl p-6 hover:shadow-lg transition"
          style={{ background: "var(--card)" }}
        >
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--accent-dark)" }}
          >
            Panier
          </h2>
          <p style={{ color: "var(--foreground)" }}>
            Gérez les articles que vous souhaitez acheter.
          </p>
        </a>

        <a
          href="/circulaire"
          className="shadow-md rounded-xl p-6 hover:shadow-lg transition"
          style={{ background: "var(--card)" }}
        >
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--accent-dark)" }}
          >
            Circulaire
          </h2>
          <p style={{ color: "var(--foreground)" }}>
            Magasinez les articles à rabais.
          </p>
        </a>

      </div>

    </section>
  );
}
