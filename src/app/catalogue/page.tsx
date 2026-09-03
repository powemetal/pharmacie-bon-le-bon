import Link from "next/link";
import { getCategories, getProduits } from "@/lib/services/produits";
import AjouterAuPanierBouton from "./AjouterAuPanierBouton";

function construireHref(categorie: string | undefined, page: number) {
  const params = new URLSearchParams();
  if (categorie) params.set("categorie", categorie);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/catalogue${qs ? `?${qs}` : ""}`;
}

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ categorie?: string; page?: string }> }) {
  const params = await searchParams;
  const categorieActive = params.categorie || undefined;
  const pageDemandee = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const [categories, { produits, totalPages, page }] = await Promise.all([getCategories(), getProduits({ categorie: categorieActive, page: pageDemandee })]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* CATÉGORIES — environ 1/5 de l'écran */}
      <aside className="w-full md:w-1/5 shrink-0">
        <div className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow)] p-4 md:sticky md:top-24">
          <h2 className="text-lg font-semibold mb-4 text-[var(--accent-dark)]">Catégories</h2>

          <ul className="space-y-1">
            <li>
              <Link href="/catalogue" className={`block px-3 py-2 rounded-[var(--radius)] transition ${!categorieActive ? "bg-[var(--accent)] text-white" : "hover:bg-gray-100 text-[var(--foreground)]"}`}>
                Tous les produits
              </Link>
            </li>

            {categories.map((cat) => (
              <li key={cat}>
                <Link href={`/catalogue?categorie=${encodeURIComponent(cat)}`} className={`block px-3 py-2 rounded-[var(--radius)] transition ${categorieActive === cat ? "bg-[var(--accent)] text-white" : "hover:bg-gray-100 text-[var(--foreground)]"}`}>
                  {cat}
                </Link>
              </li>
            ))}

            {categories.length === 0 && <li className="text-sm text-gray-500 px-3 py-2">Aucune catégorie pour le moment.</li>}
          </ul>
        </div>
      </aside>

      {/* PRODUITS — environ 4/5 de l'écran */}
      <section className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold mb-6 text-[var(--accent-dark)]">{categorieActive ?? "Tous les produits"}</h1>

        {produits.length === 0 ? (
          <p className="text-gray-600">Aucun produit trouvé dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {produits.map((produit) => (
              <div key={produit.id} className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden flex flex-col">
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {produit.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={produit.imageUrl} alt={produit.nom} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">💊</span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-[var(--foreground)] mb-1 line-clamp-2">{produit.nom}</h3>
                  <p className="text-[var(--accent-dark)] font-bold mb-3">{produit.prix.toFixed(2)} $</p>
                  <div className="mt-auto">
                    <AjouterAuPanierBouton produitId={produit.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NAVIGATION — flèches pour changer de page */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <Link href={construireHref(categorieActive, page - 1)} className={`text-2xl w-11 h-11 flex items-center justify-center rounded-full transition ${page <= 1 ? "opacity-30 pointer-events-none" : "hover:bg-gray-200 text-[var(--accent-dark)]"}`} aria-disabled={page <= 1}>
              ←
            </Link>

            <span className="text-sm text-gray-600">
              Page {page} / {totalPages}
            </span>

            <Link href={construireHref(categorieActive, page + 1)} className={`text-2xl w-11 h-11 flex items-center justify-center rounded-full transition ${page >= totalPages ? "opacity-30 pointer-events-none" : "hover:bg-gray-200 text-[var(--accent-dark)]"}`} aria-disabled={page >= totalPages}>
              →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
