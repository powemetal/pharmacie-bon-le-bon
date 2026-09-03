import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Header";

export const metadata = {
  title: "Pharmacie Bon Le Bon",
  description: "Votre pharmacie de quartier, maintenant accessible en ligne.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">

        {/* HEADER */}
        <Header />

        {/* CONTENU */}
        <main className="flex-1 px-4 sm:px-16 pt-24">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-green-800 [.colorblind_&]:bg-blue-900 text-white py-6 mt-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

            <div>
              <h3 className="text-xl font-semibold">Pharmacie Bon Le Bon</h3>
              <p className="text-sm mt-2 opacity-90">
                Votre pharmacie de quartier, accessible en ligne.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <h4 className="font-semibold">Liens rapides</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/contact" className="hover:underline">Nous trouver</Link></li>
                <li><Link href="/soumettre-ordonnance" className="hover:underline">Soumettre une ordonnance</Link></li>
                <li><Link href="/profil" className="hover:underline">Profil</Link></li>
              </ul>
            </div>

            <div className="mt-4 md:mt-0">
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/ressources" className="hover:underline">Ressources santé</Link></li>
                <li><Link href="/connexion" className="hover:underline">Connexion</Link></li>
                <li><Link href="/enregistrer" className="hover:underline">Créer un compte</Link></li>
              </ul>
            </div>

          </div>

          <p className="text-center text-xs mt-6 opacity-80">
            © 2026 Pharmacie Bon Le Bon — Tous droits réservés
          </p>
        </footer>

      </body>
    </html>
  );
}