"use client";

import { useRef, useState, useTransition } from "react";
import { ajouterAuPanierAction } from "@/lib/actions/panier";

export default function AjouterAuPanierBouton({
  produitId,
}: {
  produitId: string;
}) {
  const [pulseId, setPulseId] = useState(0);
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    startTransition(async () => {
      await ajouterAuPanierAction(produitId, 1);
    });

    setPulseId((id) => id + 1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPulseId(0), 700);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="relative w-full py-2 rounded-[var(--radius)] font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] active:scale-95 transition disabled:opacity-50"
    >
      {isPending ? "Ajout..." : "Ajouter au panier"}

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