import { getRessources } from "@/lib/services/ressources";

export default async function RessourcesPage() {
  const ressources = await getRessources();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="max-w-5xl mx-auto">
        {/* TITRE */}
        <h1 className="text-4xl font-bold mb-6 text-[var(--accent)]">Ressources santé</h1>

        {/* SOUS-TITRE */}
        <p className="text-lg mb-10 opacity-80 text-[var(--accent-dark)]">Une sélection de ressources fiables pour vous aider à mieux comprendre votre santé.</p>

        {/* LISTE */}
        <div className="grid gap-8 md:grid-cols-2">
          {ressources.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              className="
                block 
                rounded-[var(--radius)]
                p-6 
                shadow-[var(--shadow)]
                bg-[var(--card)]
                hover:shadow-xl 
                hover:-translate-y-1 
                transition-all
              "
            >
              <h2 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{r.titre}</h2>

              <p className="opacity-80 mb-4 text-[var(--foreground)]">{r.description}</p>

              <span className="font-medium underline text-[var(--accent-dark)]">Visiter le site →</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
