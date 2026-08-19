import { prisma } from "@/lib/prisma";

export async function getRessources() {
  return prisma.ressourceSante.findMany({
    orderBy: { creeLe: "desc" },
  });
}

export async function getRessource(id: string) {
  return prisma.ressourceSante.findUnique({
    where: { id },
  });
}


export async function createRessource(data: {
  titre: string;
  description: string;
  url: string;
}) {
  return prisma.ressourceSante.create({ data });
}
