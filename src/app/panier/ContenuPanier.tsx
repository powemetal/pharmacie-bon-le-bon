"use client";

import { useTransition } from "react";
import Link from "next/link";
import { modifierQuantiteItem, supprimerItem, viderPanier } from "@/lib/actions/panier";
import { useRouter } from "next/navigation";

type ItemAvecProduit = {
  id: string;
  quantite: number;
  produit: {
    id: string;
    nom: string;
    prix: number;
    imageUrl: string | null;
  };
};

type PanierProps = {
  panier: {
    id: string;
    items: ItemAvecProduit[];
  } | null;
};

const TAUX_TPS = 0.05;
const TAUX_TVQ = 0.09975;

export default function ContenuPanier({ panier }: PanierProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const items = panier?.items || [];

  // Calculs financiers
  const sousTotal = items.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0);
  const tps = sousTotal * TAUX_TPS;
  const tvq = sousTotal * TAUX_TVQ;
  const totalAvecTaxes = sousTotal + tps + tvq;

  const handleModifierQuantite = (itemId: string, delta: number) => {
    startTransition(async () => {
      await modifierQuantiteItem(itemId, delta);
    });
  };

  const handleSupprimerItem = (itemId: string) => {
    startTransition(async () => {
      await supprimerItem(itemId);
    });
  };

  const handleViderPanier = () => {
    if (!panier || items.length === 0) return;
    if (confirm("Voulez-vous vraiment vider tout votre panier ?")) {
      startTransition(async () => {
        await viderPanier(panier.id);
      });
    }
  };

  const handleReglerCommande = () => {
    router.push("/paiment");
  };

  if (items.length === 0) {
    return (
      <div className="bg-[var(--card)] p-8 rounded-[var(--radius)] shadow-[var(--shadow)] text-center">
        <p className="text-lg text-gray-600 mb-4">Votre panier est vide.</p>
        <Link href="/catalogue" className="inline-block bg-[var(--accent)] text-white px-6 py-2 rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition font-medium">
          Découvrir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isPending ? "opacity-60 pointer-events-none transition-opacity" : ""}`}>
      {/* Entête avec bouton vider */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{items.reduce((sum, item) => sum + item.quantite, 0)} article(s) dans le panier</span>
        <button onClick={handleViderPanier} className="text-red-600 hover:text-red-800 text-sm font-semibold underline transition cursor-pointer">
          Vider mon panier
        </button>
      </div>

      {/* Tableau du détail des produits */}
      <div className="bg-[var(--card)] rounded-[var(--radius)] shadow-[var(--shadow)] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 font-semibold text-sm">
              <th className="p-4">Produits</th>
              <th className="p-4 text-center">Qté</th>
              <th className="p-4 text-right">Prix unitaire</th>
              <th className="p-4 text-right">Prix final</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {items.map((item) => {
              const prixTotalProduit = item.produit.prix * item.quantite;

              return (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  {/* Produit */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.produit.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.produit.imageUrl} alt={item.produit.nom} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">💊</span>
                      )}
                    </div>
                    <span className="font-medium text-[var(--foreground)] line-clamp-2">{item.produit.nom}</span>
                  </td>

                  {/* Quantité (+ / -) */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center border border-gray-300 rounded-[var(--radius)] overflow-hidden">
                      <button onClick={() => handleModifierQuantite(item.id, -1)} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition" title="Réduire">
                        -
                      </button>
                      <span className="px-3 py-1 font-semibold text-sm min-w-[2.5rem] text-center">{item.quantite}</span>
                      <button onClick={() => handleModifierQuantite(item.id, 1)} className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition" title="Augmenter">
                        +
                      </button>
                    </div>
                  </td>

                  {/* Prix Unitaire */}
                  <td className="p-4 text-right font-medium">{item.produit.prix.toFixed(2)} $</td>

                  {/* Prix Final pour cet article */}
                  <td className="p-4 text-right font-bold text-[var(--accent-dark)]">{prixTotalProduit.toFixed(2)} $</td>

                  {/* Bouton de suppression individuelle */}
                  <td className="p-4 text-center">
                    <button onClick={() => handleSupprimerItem(item.id)} className="text-gray-400 hover:text-red-600 transition p-1" title="Supprimer l'article">
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sommaire du panier / Facturation */}
      <div className="flex flex-col md:flex-row justify-end">
        <div className="w-full md:w-96 bg-[var(--card)] p-6 rounded-[var(--radius)] shadow-[var(--shadow)] space-y-3">
          <h2 className="text-lg font-bold border-b border-gray-200 pb-2 mb-3">Récapitulatif</h2>

          <div className="flex justify-between text-gray-700">
            <span>Total produits (HT)</span>
            <span className="font-semibold">{sousTotal.toFixed(2)} $</span>
          </div>

          <div className="flex justify-between text-gray-600 text-sm">
            <span>TPS (5 %)</span>
            <span>{tps.toFixed(2)} $</span>
          </div>

          <div className="flex justify-between text-gray-600 text-sm">
            <span>TVQ (9,975 %)</span>
            <span>{tvq.toFixed(2)} $</span>
          </div>

          <hr className="border-gray-200 my-2" />

          <div className="flex justify-between text-lg font-bold text-[var(--accent-dark)]">
            <span>Total avec taxes</span>
            <span>{totalAvecTaxes.toFixed(2)} $</span>
          </div>

          <button onClick={handleReglerCommande} className="w-full mt-4 py-3 bg-[var(--accent)] text-white font-bold rounded-[var(--radius)] hover:bg-[var(--accent-dark)] active:scale-[0.98] transition shadow-md">
            Régler ma commande
          </button>
        </div>
      </div>
    </div>
  );
}
