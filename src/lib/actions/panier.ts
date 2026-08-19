"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const COURRIEL_DEMO = "demo@pharmacie.com";

/**
 * Récupère ou crée l'utilisateur de démonstration.
 */
async function getOrCreateDemoUser() {
  let user = await prisma.utilisateur.findUnique({
    where: { courriel: COURRIEL_DEMO },
  });

  if (!user) {
    user = await prisma.utilisateur.create({
      data: {
        courriel: COURRIEL_DEMO,
        motDePasse: "motdepassedemo123",
      },
    });
  }

  return user;
}

/**
 * Ajoute un produit au panier.
 */
export async function ajouterAuPanierAction(produitId: string, quantite = 1) {
  const user = await getOrCreateDemoUser();

  let panier = await prisma.panier.findUnique({
    where: { utilisateurId: user.id },
  });

  if (!panier) {
    panier = await prisma.panier.create({
      data: { utilisateurId: user.id },
    });
  }

  await prisma.itemPanier.upsert({
    where: {
      panierId_produitId: {
        panierId: panier.id,
        produitId: produitId,
      },
    },
    update: {
      quantite: { increment: quantite },
    },
    create: {
      panierId: panier.id,
      produitId: produitId,
      quantite: quantite,
    },
  });

  revalidatePath("/panier");
}

/**
 * Récupère le panier complet avec les détails des produits.
 */
export async function getPanierUtilisateur() {
  try {
    const user = await getOrCreateDemoUser();

    let panier = await prisma.panier.findUnique({
      where: { utilisateurId: user.id },
      include: {
        items: {
          include: {
            produit: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!panier) {
      panier = await prisma.panier.create({
        data: { utilisateurId: user.id },
        include: {
          items: {
            include: {
              produit: true,
            },
          },
        },
      });
    }

    return panier;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return null;
  }
}

/**
 * Modifie la quantité d'un article (+1 ou -1).
 */
export async function modifierQuantiteItem(itemId: string, delta: number) {
  try {
    const item = await prisma.itemPanier.findUnique({
      where: { id: itemId },
    });

    if (!item) return;

    const nouvelleQuantite = item.quantite + delta;

    if (nouvelleQuantite <= 0) {
      await prisma.itemPanier.delete({
        where: { id: itemId },
      });
    } else {
      await prisma.itemPanier.update({
        where: { id: itemId },
        data: { quantite: nouvelleQuantite },
      });
    }

    revalidatePath("/panier");
  } catch (error) {
    console.error("Erreur lors de la modification de la quantité:", error);
  }
}

/**
 * Supprime un article du panier.
 */
export async function supprimerItem(itemId: string) {
  try {
    await prisma.itemPanier.delete({
      where: { id: itemId },
    });
    revalidatePath("/panier");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'item:", error);
  }
}

/**
 * Vide le panier au complet.
 */
export async function viderPanier(panierId: string) {
  try {
    await prisma.itemPanier.deleteMany({
      where: { panierId },
    });
    revalidatePath("/panier");
  } catch (error) {
    console.error("Erreur lors du vidage du panier:", error);
  }
}