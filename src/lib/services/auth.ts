"use server";

import { prisma } from "@/lib/prisma";

export async function inscrireUtilisateur(data: {
  courriel: string;
  pseudonyme: string;
  motDePasse: string;
}) {
  const existant = await prisma.utilisateur.findUnique({
    where: { courriel: data.courriel },
  });

  if (existant) {
    throw new Error("Un utilisateur avec ce courriel existe déjà.");
  }

  const user = await prisma.utilisateur.create({
    data: {
      courriel: data.courriel,
      pseudonyme: data.pseudonyme,
      motDePasse: data.motDePasse,
    },
  });

  return user;
}

export async function loginUtilisateur(data: {
  courriel: string;
  motDePasse: string;
}) {
  const user = await prisma.utilisateur.findUnique({
    where: { courriel: data.courriel },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable.");
  }

  if (user.motDePasse !== data.motDePasse) {
    throw new Error("Mot de passe incorrect.");
  }

  return user;
}
