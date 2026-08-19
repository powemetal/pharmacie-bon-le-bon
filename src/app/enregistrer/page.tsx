"use client";

import { useState } from "react";
import { inscrireUtilisateur } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function PageEnregistrement() {
  const router = useRouter();
  const [msgErreur, setMsgErreur] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsgErreur("");

    const form = new FormData(e.currentTarget);

    const courriel = form.get("courriel")?.toString() || "";
    const pseudonyme = form.get("pseudonyme")?.toString() || "";
    const motDePasse = form.get("motDePasse")?.toString() || "";

    try {
      await inscrireUtilisateur({
        courriel,
        pseudonyme,
        motDePasse,
      });

      router.push("/connexion");
    } catch (err: any) {
      setMsgErreur(err.message || "Une erreur est survenue.");
    }
  }

  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-[var(--card)] p-8 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--accent)]">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--accent-dark)]">
          Créer un compte
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Courriel */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Courriel</label>
            <input
              name="courriel"
              type="email"
              placeholder="exemple@courriel.com"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Pseudo */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Pseudo</label>
            <input
              name="pseudonyme"
              type="text"
              placeholder="Votre nom d'utilisateur"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Mot de passe</label>
            <input
              name="motDePasse"
              type="password"
              placeholder="Votre mot de passe"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Erreur */}
          {msgErreur && (
            <p className="text-red-600 text-sm">{msgErreur}</p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            className="bg-[var(--accent)] text-white py-2 rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition"
          >
            S’enregistrer
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="text-center text-sm mt-4 text-[var(--foreground)]">
          Déjà un compte ?{" "}
          <a href="/connexion" className="text-[var(--accent)] hover:underline">
            Se connecter
          </a>
        </p>

      </div>
    </main>
  );
}
