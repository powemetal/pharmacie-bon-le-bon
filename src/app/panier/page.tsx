import { getPanierUtilisateur } from "@/lib/actions/panier";
import ContenuPanier from "./ContenuPanier";

export default async function PanierPage() {
  const panier = await getPanierUtilisateur();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--accent-dark)]">
        Mon Panier
      </h1>
      <ContenuPanier panier={panier} />
    </div>
  );
}