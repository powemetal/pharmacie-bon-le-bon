"use client";

/**
 * Gestion simple du panier côté client via localStorage.
 *
 * Prototype front-end : le modèle Prisma Panier / ItemPanier existe déjà
 * en base pour un utilisateur connecté, mais tant que l'authentification
 * et la page Panier ne sont pas branchées, on garde le panier ici.
 * La page /panier pourra relire ces données avec obtenirPanier().
 */

export type ItemPanierLocal = {
  produitId: string;
  quantite: number;
};

const CLE_PANIER = "panier";
export const EVENEMENT_PANIER = "panier:mise-a-jour";

function lirePanier(): ItemPanierLocal[] {
  if (typeof window === "undefined") return [];
  try {
    const brut = window.localStorage.getItem(CLE_PANIER);
    return brut ? (JSON.parse(brut) as ItemPanierLocal[]) : [];
  } catch {
    return [];
  }
}

function ecrirePanier(panier: ItemPanierLocal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLE_PANIER, JSON.stringify(panier));
  // Permet à d'autres composants (ex: compteur dans le Header) de réagir.
  window.dispatchEvent(new CustomEvent(EVENEMENT_PANIER, { detail: panier }));
}

/** Ajoute `quantite` (1 par défaut) exemplaires du produit au panier. Un clic = un ajout. */
export function ajouterAuPanier(produitId: string, quantite = 1): ItemPanierLocal[] {
  const panier = lirePanier();
  const item = panier.find((i) => i.produitId === produitId);

  if (item) {
    item.quantite += quantite;
  } else {
    panier.push({ produitId, quantite });
  }

  ecrirePanier(panier);
  return panier;
}

/** Retire complètement un produit du panier. */
export function retirerDuPanier(produitId: string): ItemPanierLocal[] {
  const panier = lirePanier().filter((i) => i.produitId !== produitId);
  ecrirePanier(panier);
  return panier;
}

/** Change la quantité d'un produit précisément (utile pour +/- dans la page Panier). */
export function definirQuantite(produitId: string, quantite: number): ItemPanierLocal[] {
  let panier = lirePanier();
  if (quantite <= 0) {
    panier = panier.filter((i) => i.produitId !== produitId);
  } else {
    const item = panier.find((i) => i.produitId === produitId);
    if (item) item.quantite = quantite;
    else panier.push({ produitId, quantite });
  }
  ecrirePanier(panier);
  return panier;
}

export function obtenirPanier(): ItemPanierLocal[] {
  return lirePanier();
}

export function viderPanier() {
  ecrirePanier([]);
}

export function nombreArticles(): number {
  return lirePanier().reduce((total, i) => total + i.quantite, 0);
}
