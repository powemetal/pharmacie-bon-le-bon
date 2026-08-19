"use client";

import { useState } from "react";
import {
  Sun,
  Droplet,
  ShieldPlus,
  Baby,
  Smile,
  Wind,
  Tag,
  Printer,
  Download,
  Clock,
} from "lucide-react";

/**
 * Page Circulaire — Pharmacie Bon Le Bon
 * Palette dérivée du header/footer existant :
 *   vert marque  #0F7A3D / #0A5C2E
 *   fond sombre  #0B0F0C
 *   surface carte #12321F
 *   crème accent #FBECA0 / texte #5B3A1E
 *   terracotta   #8B4A2B (bande décorative, badge "aubaine")
 */

type Category =
  | "Tous"
  | "Vitamines"
  | "Soins de la peau"
  | "Premiers soins"
  | "Santé bébé"
  | "Hygiène bucco-dentaire"
  | "Allergies & rhume";

type Deal = {
  id: string;
  category: Exclude<Category, "Tous">;
  icon: React.ElementType;
  name: string;
  brand: string;
  description: string;
  unit: string;
  originalPrice: number;
  salePrice: number;
  hot?: boolean;
};

const deals: Deal[] = [
  {
    id: "d1",
    category: "Vitamines",
    icon: Sun,
    name: "Vitamine D3 1000 UI",
    brand: "Jamieson",
    description: "Format 365 comprimés, soutien osseux et immunitaire.",
    unit: "365 co.",
    originalPrice: 19.99,
    salePrice: 12.99,
    hot: true,
  },
  {
    id: "d2",
    category: "Vitamines",
    icon: Sun,
    name: "Multivitamines adulte",
    brand: "Centrum",
    description: "Formule complète 26 vitamines et minéraux.",
    unit: "120 co.",
    originalPrice: 24.99,
    salePrice: 17.49,
  },
  {
    id: "d3",
    category: "Soins de la peau",
    icon: Droplet,
    name: "Crème hydratante visage",
    brand: "CeraVe",
    description: "Céramides + acide hyaluronique, peaux sèches.",
    unit: "454 g",
    originalPrice: 29.99,
    salePrice: 21.99,
    hot: true,
  },
  {
    id: "d4",
    category: "Soins de la peau",
    icon: Droplet,
    name: "Écran solaire FPS 60",
    brand: "La Roche-Posay",
    description: "Toucher sec, visage et corps, résistant à l'eau.",
    unit: "200 ml",
    originalPrice: 26.99,
    salePrice: 19.99,
  },
  {
    id: "d5",
    category: "Premiers soins",
    icon: ShieldPlus,
    name: "Pansements assortis",
    brand: "Bon Le Bon",
    description: "Boîte de 100, formats variés, coussinet respirant.",
    unit: "100 un.",
    originalPrice: 8.99,
    salePrice: 5.99,
  },
  {
    id: "d6",
    category: "Premiers soins",
    icon: ShieldPlus,
    name: "Désinfectant pour les mains",
    brand: "Bon Le Bon",
    description: "70 % alcool, format de poche, lot de 3.",
    unit: "3 x 60 ml",
    originalPrice: 9.99,
    salePrice: 6.49,
  },
  {
    id: "d7",
    category: "Santé bébé",
    icon: Baby,
    name: "Lingettes pour bébé",
    brand: "Pampers",
    description: "Sans parfum, lot de 8 paquets, 576 lingettes.",
    unit: "576 un.",
    originalPrice: 22.99,
    salePrice: 16.99,
    hot: true,
  },
  {
    id: "d8",
    category: "Hygiène bucco-dentaire",
    icon: Smile,
    name: "Brosse à dents électrique",
    brand: "Oral-B",
    description: "Minuterie intégrée, tête de rechange incluse.",
    unit: "1 un.",
    originalPrice: 44.99,
    salePrice: 29.99,
  },
  {
    id: "d9",
    category: "Allergies & rhume",
    icon: Wind,
    name: "Antihistaminique 24 h",
    brand: "Reactine",
    description: "Non somnifère, comprimés à croquer.",
    unit: "45 co.",
    originalPrice: 27.99,
    salePrice: 18.99,
  },
];

const categories: Category[] = [
  "Tous",
  "Vitamines",
  "Soins de la peau",
  "Premiers soins",
  "Santé bébé",
  "Hygiène bucco-dentaire",
  "Allergies & rhume",
];

function formatPrice(n: number) {
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}

export default function CirculairePage() {
  const [active, setActive] = useState<Category>("Tous");

  const visible =
    active === "Tous" ? deals : deals.filter((d) => d.category === active);

  return (
    <main className="min-h-screen bg-[#0B0F0C] text-[#EDEFEA]">
      {/* Bande décorative héritée du header du site */}
      <div className="h-1 w-full bg-[#8B4A2B]" />

      {/* ---- En-tête de la circulaire ---- */}
      <section className="relative overflow-hidden border-b border-[#1B4A2C] bg-gradient-to-b from-[#0F2718] to-[#0B0F0C] px-6 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0F7A3D]/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FBECA0] px-4 py-1.5 text-sm font-bold tracking-wide text-[#5B3A1E]">
            <Tag className="h-4 w-4" aria-hidden />
            Circulaire de la semaine
          </span>

          <h1 className="mt-6 font-[Poppins,ui-sans-serif] text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Les aubaines du 20 au 26 août
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#DCE4DE] sm:text-lg">
            Chaque semaine, votre pharmacie de quartier réduit le prix
            d&apos;essentiels en vitamines, soins de la peau, premiers soins
            et plus. Quantités limitées, en magasin et en ligne.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#C7D6CC]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              Valide jusqu&apos;au mercredi 26 août, 21 h
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FBECA0] px-5 py-3 text-sm font-bold text-[#5B3A1E] transition hover:bg-[#F7E27A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBECA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F0C]"
            >
              <Printer className="h-4 w-4" aria-hidden />
              Imprimer la circulaire
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2C5B3D] bg-transparent px-5 py-3 text-sm font-bold text-[#EDEFEA] transition hover:bg-[#123B22] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F0C]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger en PDF
            </button>
          </div>
        </div>
      </section>

      {/* ---- Filtres de catégorie ---- */}
      <nav
        aria-label="Filtrer les aubaines par catégorie"
        className="sticky top-0 z-10 border-b border-[#1B4A2C] bg-[#0B0F0C]/95 backdrop-blur px-6 py-4"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F0C] ${
                  isActive
                    ? "bg-[#0F7A3D] text-white"
                    : "bg-[#12321F] text-[#DCE4DE] hover:bg-[#1B4A2C] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ---- Grille des aubaines ---- */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((deal) => {
            const Icon = deal.icon;
            const percentOff = Math.round(
              (1 - deal.salePrice / deal.originalPrice) * 100
            );

            return (
              <article
                key={deal.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#1B4A2C] bg-[#0F2718] transition hover:-translate-y-0.5 hover:border-[#0F7A3D]"
              >
                <div className="flex items-start justify-between gap-3 p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123B22] text-[#7FD9A5]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#7FD9A5]">
                        {deal.category}
                      </p>
                      <p className="text-xs text-[#C7D6CC]">{deal.brand}</p>
                    </div>
                  </div>
                  {deal.hot && (
                    <span className="shrink-0 rounded-full bg-[#8B4A2B] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Cette semaine
                    </span>
                  )}
                </div>

                <div className="px-5">
                  <h2 className="text-lg font-bold text-white">
                    {deal.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#DCE4DE]">
                    {deal.description}
                  </p>
                </div>

                {/* Bordure façon coupon détachable */}
                <div
                  aria-hidden
                  className="relative mx-5 mt-4 border-t border-dashed border-[#2C5B3D]"
                >
                  <span className="absolute -left-[26px] -top-[9px] h-4 w-4 rounded-full bg-[#0B0F0C]" />
                  <span className="absolute -right-[26px] -top-[9px] h-4 w-4 rounded-full bg-[#0B0F0C]" />
                </div>

                <div className="mt-4 flex items-end justify-between px-5 pb-5">
                  <div>
                    <p className="text-xs text-[#C7D6CC] line-through">
                      {formatPrice(deal.originalPrice)}
                    </p>
                    <p className="text-2xl font-extrabold text-[#FBECA0]">
                      {formatPrice(deal.salePrice)}
                    </p>
                    <p className="text-xs text-[#C7D6CC]">{deal.unit}</p>
                  </div>
                  <span className="rounded-md bg-[#0F7A3D] px-2.5 py-1 text-xs font-bold text-white">
                    -{percentOff} %
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-[#C7D6CC]">
            Aucune aubaine dans cette catégorie cette semaine.
          </p>
        )}
      </section>

      {/* ---- Bas de page ---- */}
      <section className="border-t border-[#1B4A2C] bg-[#0F2718] px-6 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-[#DCE4DE]">
            Prix en vigueur du jeudi 20 août au mercredi 26 août 2026, sous
            réserve des quantités en stock. Certains rabais varient selon la
            succursale.
          </p>
          <a
            href="/catalogue"
            className="mt-4 inline-block text-sm font-semibold text-[#7FD9A5] underline decoration-[#7FD9A5]/40 underline-offset-4 hover:text-[#FBECA0]"
          >
            Voir tout le catalogue →
          </a>
        </div>
      </section>
    </main>
  );
}