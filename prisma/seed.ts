import prisma from "../src/utils/prisma.js";

async function main() {
  console.log("🌱 Nettoyage des tables...");

  await prisma.itemCirculaire.deleteMany({});
  await prisma.ressourceSante.deleteMany({});
  await prisma.ordonnance.deleteMany({});
  await prisma.itemCommande.deleteMany({});
  await prisma.commande.deleteMany({});
  await prisma.itemPanier.deleteMany({});
  await prisma.panier.deleteMany({});
  await prisma.profil.deleteMany({});
  await prisma.utilisateur.deleteMany({});
  await prisma.produit.deleteMany({});
  await prisma.infoContact.deleteMany({});

  console.log("🌱 Insertion des utilisateurs...");

  const utilisateurs = [
    {
      id: "admin1",
      courriel: "admin@pharmacie.com",
      motDePasse: "Admin123!",
      role: "ADMIN",
      profil: {
        create: {
          prenom: "Marc",
          nom: "Gagnon",
          telephone: "514-555-1111",
          adresse: "123 Rue Centrale, Montréal",
        },
      },
    },
    {
      id: "admin2",
      courriel: "superadmin@pharmacie.com",
      motDePasse: "SuperAdmin123!",
      role: "ADMIN",
      profil: {
        create: {
          prenom: "Julie",
          nom: "Tremblay",
          telephone: "514-555-2222",
          adresse: "45 Boulevard des Laurentides, Laval",
        },
      },
    },
    {
      id: "u1",
      courriel: "alice@example.com",
      motDePasse: "Password123!",
      role: "UTILISATEUR",
      profil: {
        create: {
          prenom: "Alice",
          nom: "Tremblay",
          telephone: "438-555-3333",
          adresse: "12 Rue des Érables, Sainte-Julienne",
        },
      },
    },
    {
      id: "u2",
      courriel: "marc@example.com",
      motDePasse: "Password123!",
      role: "UTILISATEUR",
      profil: {
        create: {
          prenom: "Marc",
          nom: "Lavoie",
          telephone: "438-555-4444",
          adresse: "88 Rue des Pins, Joliette",
        },
      },
    },
    {
      id: "u3",
      courriel: "emma@example.com",
      motDePasse: "Password123!",
      role: "UTILISATEUR",
      profil: {
        create: {
          prenom: "Emma",
          nom: "Boucher",
          telephone: "438-555-5555",
          adresse: "22 Rue du Lac, Rawdon",
        },
      },
    },
    {
      id: "u4",
      courriel: "tom@example.com",
      motDePasse: "Password123!",
      role: "UTILISATEUR",
      profil: {
        create: {
          prenom: "Tom",
          nom: "Leblanc",
          telephone: "438-555-6666",
          adresse: "99 Rue du Parc, Terrebonne",
        },
      },
    },
  ];

  for (const u of utilisateurs) {
    await prisma.utilisateur.create({ data: u });
  }

  console.log("🌱 Insertion des produits...");

const produits = [
  {
    id: "p1",
    nom: "Advil 200mg",
    description: "Anti-inflammatoire pour douleurs légères.",
    prix: 8.99,
    imageUrl: "/images/produits/advil.jpg",
    categorie: "Douleurs",
  },
  {
    id: "p2",
    nom: "Tylenol Extra-Fort",
    description: "Soulagement rapide des maux de tête.",
    prix: 10.49,
    imageUrl: "/images/produits/tylenol.jpg",
    categorie: "Douleurs",
  },
  {
    id: "p3",
    nom: "Vitamine C 500mg",
    description: "Renforce le système immunitaire.",
    prix: 12.99,
    imageUrl: "/images/produits/vitamine-c.jpg",
    categorie: "Vitamines",
  },
  {
    id: "p4",
    nom: "Bandages Elastiques",
    description: "Support pour blessures légères.",
    prix: 6.49,
    imageUrl: "/images/produits/bandage-elastique.jpg",
    categorie: "Premiers soins",
  },
  {
    id: "p5",
    nom: "Thermomètre numérique",
    description: "Lecture rapide et précise.",
    prix: 14.99,
    imageUrl: "/images/produits/thermometre.jpg",
    categorie: "Santé",
  },
  {
    id: "p6",
    nom: "Désinfectant pour les mains",
    description: "Élimine 99% des bactéries.",
    prix: 4.99,
    imageUrl: "/images/produits/desinfectant.jpg",
    categorie: "Hygiène",
  },
];


  for (const p of produits) {
    await prisma.produit.create({ data: p });
  }

  console.log("🌱 Insertion des ressources santé...");

  const ressources = [
    { titre: "Guide sur la grippe", contenu: "https://www.quebec.ca/sante/problemes-de-sante/grippe" },
    { titre: "Conseils pour un sommeil réparateur", contenu: "https://www.canada.ca/fr/sante-publique/sommeil.html" },
    { titre: "Alimentation équilibrée", contenu: "https://www.canada.ca/fr/sante-publique/alimentation.html" },
    { titre: "Gestion du stress", contenu: "https://www.quebec.ca/sante/stress-anxiete" },
    { titre: "Prévention des blessures", contenu: "https://www.santemontreal.qc.ca/prevention" },
    { titre: "Vaccination au Québec", contenu: "https://www.quebec.ca/sante/vaccination" },
  ];

  for (const r of ressources) {
    await prisma.ressourceSante.create({ data: r });
  }

  console.log("🌱 Insertion de la circulaire...");

  const circulaire = [
    { produitId: "p1", rabais: 2.0, valideJusquA: new Date("2026-09-30") },
    { produitId: "p2", rabais: 1.5, valideJusquA: new Date("2026-09-30") },
    { produitId: "p3", rabais: 3.0, valideJusquA: new Date("2026-09-30") },
    { produitId: "p4", rabais: 1.0, valideJusquA: new Date("2026-09-30") },
    { produitId: "p5", rabais: 4.0, valideJusquA: new Date("2026-09-30") },
    { produitId: "p6", rabais: 0.5, valideJusquA: new Date("2026-09-30") },
  ];

  for (const c of circulaire) {
    await prisma.itemCirculaire.create({ data: c });
  }

  console.log("🌱 Insertion des paniers...");

  const paniers = ["u1", "u2", "u3", "u4"].map((id) => ({
    utilisateurId: id,
  }));

  for (const p of paniers) {
    await prisma.panier.create({ data: p });
  }

  console.log("🌱 Insertion des informations de contact...");

  await prisma.infoContact.create({
    data: {
      telephone: "450-555-7777",
      courriel: "contact@pharmaciebonlebon.com",
      adresse: "100 Rue Principale, Sainte-Julienne",
      heures: "Lun-Ven 9h-18h, Sam 9h-14h",
    },
  });

  console.log("🌱 Seed terminé !");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
