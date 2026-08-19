import {prisma} from "@/lib/prisma";

export async function getUtilisateurAvecDossier(id: string) {
  return prisma.utilisateur.findUnique({
    where: { id },
    include: {
      profil: true,
      commandes: {
        include: { items: { include: { produit: true } } },
      },
      ordonnances: true,
      panier: {
        include: { items: { include: { produit: true } } },
      },
    },
  });
}
