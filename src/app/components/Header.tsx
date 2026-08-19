"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* LEFT — Logo cliquable */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logo/logobonlebonv2.png"
            alt="Logo Pharmacie Bon Le Bon"
            width={120}
            height={120}
            priority
            className="object-contain w-50"
          />
        </Link>

        {/* CENTER — Menu desktop avec collapse progressif */}
        <ul className="flex gap-6 text-lg whitespace-nowrap flex-shrink">
          {/* les settings pour le collapse progressif sont dans le fichier tailwind.config.ts à la racine du projet */}

          <li className="catalogue:block hidden">
            <Link href="/catalogue">Catalogue</Link>
          </li>
          <li className="circulaire:block hidden">
            <Link href="/circulaire">Circulaire</Link>
          </li>
          <li className="ressources:block hidden">
            <Link href="/ressources">Ressources santé</Link>
          </li>
          <li className="panier:block hidden">
            <Link href="/panier">Panier</Link>
          </li>
          <li className="dossier:block hidden">
            <Link href="/mon-dossier">Mon dossier</Link>
          </li>
          <li className="contact:block hidden">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* RIGHT — Actions + Hamburger */}
        <div className="flex items-center gap-4 whitespace-nowrap flex-shrink-0">
          <div className="hidden connexion:flex gap-1">
            <Link href="/connexion" className="hover:underline">Connexion</Link>
            <p style={{ color: "white" }}>/</p>
            <Link href="/enregistrer" className="hover:underline">Créer un compte</Link>
          </div>

          <button
            className="text-4xl leading-none contact:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="bg-green-800 px-6 py-4 space-y-2 text-lg">
          <Link href="/catalogue" className="block py-2 catalogue:hidden" onClick={() => setOpen(false)}>Catalogue</Link>
          <Link href="/circulaire" className="block py-2 circulaire:hidden" onClick={() => setOpen(false)}>Circulaire</Link>
          <Link href="/ressources" className="block py-2 ressources:hidden" onClick={() => setOpen(false)}>Ressources santé</Link>
          <Link href="/panier" className="block py-2 panier:hidden" onClick={() => setOpen(false)}>Panier</Link>
          <Link href="/mon-dossier" className="block py-2 dossier:hidden" onClick={() => setOpen(false)}>Mon dossier</Link>
          <Link href="/contact" className="block py-2 contact:hidden" onClick={() => setOpen(false)}>Contact</Link>

          <hr className="border-green-600 my-2" />

          <Link href="/connexion" className="block py-2 connexion:hidden" onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/enregistrer" className="block py-2 connexion:hidden" onClick={() => setOpen(false)}>Créer un compte</Link>
        </div>
      )}
    </header>
  );
}
