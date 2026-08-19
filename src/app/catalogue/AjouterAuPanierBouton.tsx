"use client";

import { useRef, useState } from "react";
import { ajouterAuPanier } from "@/lib/panier";

export default function AjouterAuPanierBouton({
  produitId,
}: {
  produitId: string;
}) {
  // Compteur incrémenté à chaque clic, uniquement pour redéclencher l'animation
  // du badge "+1". Le bouton lui-même reste toujours cliquable.
  const [pulseId, setPulseId] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    ajouterAuPanier(produitId, 1); // un clic = un ajout, toujours

    setPulseId((id) => id + 1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPulseId(0), 700);
  }

  return (
    <button
      onClick={handleClick}
      className="relative w-full py-2 rounded-[var(--radius)] font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] active:scale-95 transition"
    >
      Ajouter au panier

      {pulseId > 0 && (
        <span
          key={pulseId}
          className="pointer-events-none absolute -top-2 -right-2 bg-[var(--accent-dark)] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-badge-pop"
        >
          +1
        </span>
      )}
    </button>
  );
}
