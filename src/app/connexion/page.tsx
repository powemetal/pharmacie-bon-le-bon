"use client";

import { useState } from "react";
import { loginUtilisateur } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function PageConnexion() {
  const router = useRouter();
  const [msgErreur, setMsgErreur] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsgErreur("");

    const form = new FormData(e.currentTarget);

    const courriel = form.get("courriel")?.toString() || "";
    const motDePasse = form.get("motDePasse")?.toString() || "";

    try {
      const data = await loginUtilisateur({
        courriel,
        motDePasse,
      });

      // Si tu veux stocker le token :
      // localStorage.setItem("token", data.token);

      router.push("/"); // redirection après connexion
    } catch (err: any) {
      setMsgErreur(err.message || "Erreur lors de la connexion.");
    }
  }

  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-white p-8 rounded-[var(--radius)] shadow-lg border border-[var(--accent)]">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--accent-dark)]">
          Connexion
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Courriel */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Courriel</label>
            <input
              name="courriel"
              type="email"
              placeholder="exemple@courriel.com"
              className="border rounded px-3 py-2"
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
              className="border rounded px-3 py-2"
              required
            />
          </div>

          {/* Erreur */}
          {msgErreur && (
            <p className="text-red-600 text-sm">{msgErreur}</p>
          )}

          <button
            type="submit"
            className="bg-[var(--accent)] text-white py-2 rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Pas de compte ?{" "}
          <a href="/enregistrer" className="text-[var(--accent)] hover:underline">
            Créer un compte
          </a>
        </p>

      </div>
    </main>
  );
}
