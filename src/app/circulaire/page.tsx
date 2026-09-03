import Link from "next/link";
import { getCategories, getProduits } from "@/lib/services/produits";

import { Sun, Droplet, ShieldPlus, Baby, Smile, Wind, Tag, Clock } from "lucide-react";

const icons = {
  Vitamines: Sun,
  "Soins de la peau": Droplet,
  "Premiers soins": ShieldPlus,
  "Santé bébé": Baby,
  "Hygiène bucco-dentaire": Smile,
  "Allergies & rhume": Wind,
};

function formatPrice(n: number) {
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}

export default async function CirculairePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const resolvedSearchParams = await searchParams;

  const rawCategorie = resolvedSearchParams.categorie;
  const categorieActive = typeof rawCategorie === "string" ? rawCategorie : undefined;

  const [categories, { produits }] = await Promise.all([getCategories(), getProduits({ categorie: categorieActive, page: 1 })]);

  const visible = categorieActive ? produits.filter((p) => p.categorie?.trim().toLowerCase() === categorieActive.trim().toLowerCase()) : produits;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Bande décorative */}
      <div className="h-1 w-full bg-[var(--decor-terracotta)]" />

      {/* HERO */}
      <section className="relative border-b border-[var(--accent-dark)] px-6 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent)] blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--decor-cream)] px-4 py-1.5 text-sm font-bold tracking-wide text-[var(--decor-cream-text)]">
            <Tag className="h-4 w-4" />
            Circulaire de la semaine
          </span>

          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">Aubaines de la semaine</h1>

          <p className="mt-4 max-w-2xl text-base opacity-85 sm:text-lg">Découvrez les meilleurs prix sur nos produits en ligne.</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm opacity-75">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Valide jusqu'à mercredi 21 h
            </span>
          </div>
        </div>
      </section>

      {/* FILTRES - scroll={false} évite le saut de page au rechargement */}
      <nav className="sticky top-0 z-10 border-b border-[var(--accent-dark)] bg-[var(--background)] px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          <Link href="/circulaire" scroll={false} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!categorieActive ? "bg-[var(--accent)] text-[var(--background)]" : "bg-[var(--card)] text-[var(--foreground)]"}`}>
            Tous
          </Link>

          {categories.map((cat) => {
            const isActive = categorieActive?.toLowerCase() === cat.toLowerCase();

            return (
              <Link key={cat} href={`/circulaire?categorie=${encodeURIComponent(cat)}`} scroll={false} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-[var(--accent)] text-[var(--background)]" : "bg-[var(--card)] text-[var(--foreground)]"}`}>
                {cat}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* GRILLE PRODUITS */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const Icon = icons[p.categorie as keyof typeof icons] ?? Tag;

            const pAny = p as any;

            const pourcentageRabais = pAny.rabaisPourcentage ?? 20;
            const nouveauPrix = p.prix;

            const prixInitial = pAny.prixRegulier ?? (pourcentageRabais < 100 ? nouveauPrix / (1 - pourcentageRabais / 100) : nouveauPrix + 5);

            const economie = Math.max(0, prixInitial - nouveauPrix);

            return (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--accent-dark)] bg-[var(--decor-surface)] shadow-sm transition hover:shadow-md">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3 p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-dark)] text-[var(--background)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{p.categorie}</p>
                      <p className="text-xs opacity-70">{p.nom}</p>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="flex-1 px-5">
                  <h2 className="text-lg font-bold">{p.nom}</h2>
                  <p className="mt-1 text-sm opacity-80">{p.description ?? "Produit en promotion"}</p>
                </div>

                {/* DÉCO COUPON */}
                <div className="relative mx-5 mt-4 border-t border-dashed border-[var(--accent-dark)]">
                  <span className="absolute -left-[26px] -top-[9px] h-4 w-4 rounded-full bg-[var(--background)]" />
                  <span className="absolute -right-[26px] -top-[9px] h-4 w-4 rounded-full bg-[var(--background)]" />
                </div>

                {/* BLOC PRIX */}
                <div className="mt-4 flex items-end justify-between px-5 pb-5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-medium line-through opacity-60">{formatPrice(prixInitial)}</span>
                      {economie > 0 && <span className="text-[11px] font-semibold text-[var(--accent)]">Économisez {formatPrice(economie)}</span>}
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold">{formatPrice(nouveauPrix)}</span>
                      <span className="text-xs opacity-70">/ un.</span>
                    </div>
                  </div>

                  {pourcentageRabais > 0 && <span className="inline-flex items-center rounded-lg bg-[var(--accent)] px-2.5 py-1 text-xs font-black tracking-wide text-[var(--background)] shadow-sm">-{Math.round(pourcentageRabais)} %</span>}
                </div>
              </article>
            );
          })}
        </div>

        {visible.length === 0 && <p className="mt-16 text-center opacity-70">Aucune aubaine dans cette catégorie cette semaine.</p>}
      </section>

      {/* BAS DE PAGE */}
      <section className="border-t border-[var(--accent-dark)] bg-[var(--decor-surface)] px-6 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm opacity-80">Prix en vigueur selon disponibilité.</p>
          <Link href="/catalogue" className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] underline underline-offset-4">
            Voir tout le catalogue →
          </Link>
        </div>
      </section>
    </main>
  );
}
