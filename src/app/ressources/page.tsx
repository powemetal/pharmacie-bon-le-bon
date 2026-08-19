import { getRessources } from "@/lib/services/ressources";

export default async function RessourcesPage() {
  const ressources = await getRessources();

  return (
    <main className="">
      <section className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-green-200 mb-6">
          Ressources santé
        </h1>

        <p className="text-lg opacity-80 mb-10 !text-green-300">
          Une sélection de ressources fiables pour vous aider à mieux comprendre votre santé.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {ressources.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              className="block bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <h2 className="text-xl font-semibold mb-2">{r.titre}</h2>
              <p className="opacity-80 mb-4">{r.description}</p>
              <span className="text-green-700 font-medium underline">
                Visiter le site →
              </span>
            </a>
          ))}
        </div>

      </section>
    </main>
  );
}
