import { prisma } from "@/lib/prisma";

export const PRODUITS_PAR_PAGE = 9;

/**
 * Retourne la liste des catégories distinctes présentes dans la table Produit,
 * triée alphabétiquement. Sert à construire le menu de gauche du catalogue.
 */
export async function getCategories(): Promise<string[]> {
  const rows = await prisma.produit.findMany({
    where: { categorie: { not: null } },
    distinct: ["categorie"],
    select: { categorie: true },
    orderBy: { categorie: "asc" },
  });

  return rows
    .map((r) => r.categorie)
    .filter((c): c is string => !!c);
}

/**
 * Retourne une page de produits, filtrée optionnellement par catégorie.
 */
export async function getProduits({
  categorie,
  page = 1,
  parPage = PRODUITS_PAR_PAGE,
}: {
  categorie?: string;
  page?: number;
  parPage?: number;
}) {
  const where = categorie ? { categorie } : {};
  const pageValide = Math.max(1, page);

  const [produits, total] = await Promise.all([
    prisma.produit.findMany({
      where,
      orderBy: { creeLe: "desc" },
      skip: (pageValide - 1) * parPage,
      take: parPage,
    }),
    prisma.produit.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / parPage));

  return {
    produits,
    total,
    totalPages,
    page: pageValide,
  };
}
