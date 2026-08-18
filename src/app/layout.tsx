import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Pharmacie Bon Le Bon",
  description: "Votre pharmacie de quartier, maintenant accessible en ligne.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">

        {/* HEADER */}
        <header className="bg-green-700 text-white shadow-md">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link href="/" className="text-2xl font-bold tracking-wide">
              Pharmacie Bon Le Bon
            </Link>

            <ul className="flex gap-6 text-lg">
              <li><Link href="/catalogue">Catalogue</Link></li>
              <li><Link href="/circulaire">Circulaire</Link></li>
              <li><Link href="/ressources">Ressources santé</Link></li>
              <li><Link href="/panier">Panier</Link></li>
              <li><Link href="/mon-dossier">Mon dossier</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>

            <div className="flex gap-4">
              <Link href="/connexion" className="hover:underline">Connexion</Link>
              <Link href="/enregistrer" className="hover:underline">Créer un compte</Link>
            </div>

          </nav>
        </header>

        {/* CONTENU */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-green-800 text-white py-6 mt-10">
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
                <li><Link href="/contact">Nous trouver</Link></li>
                <li><Link href="/soumettre-ordonnance">Soumettre une ordonnance</Link></li>
                <li><Link href="/profil">Profil</Link></li>
              </ul>
            </div>

            <div className="mt-4 md:mt-0">
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/ressources">Ressources santé</Link></li>
                <li><Link href="/connexion">Connexion</Link></li>
                <li><Link href="/enregistrer">Créer un compte</Link></li>
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
