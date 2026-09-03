"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [colorblind, setColorblind] = useState(false);

  // applique la classe sur le body
  useEffect(() => {
    if (colorblind) {
      document.body.classList.add("colorblind");
    } else {
      document.body.classList.remove("colorblind");
    }
  }, [colorblind]);

  return (
    <header className="bg-green-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* LEFT — Logo cliquable */}
        <Link href="/" className="flex items-center flex-shrink-0 mr-12">
          <Image
            src="/images/logo/logobonlebonv2.png"
            alt="Logo Pharmacie Bon Le Bon"
            width={120}
            height={120}
            priority
            className="object-contain w-50"
          />
        </Link>

        {/* CENTER — Menu desktop */}
        <ul className="flex gap-6 text-lg whitespace-nowrap flex-shrink">
        <li className="catalogue:block hidden font-bold">
            <Link 
              href="/catalogue" 
              className="flex flex-col items-center justify-center"
            >
              CATALOGUE
              <span className="flex items-center justify-center">
              <svg 
                style={{ fill: 'white', width: '3em', height: '3em' }} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 640"
              >
                <path d="M94.7 136.3C101.6 112.4 123.5 96 148.4 96L492.4 96C517.3 96 539.2 112.4 546.2 136.3L569.6 216.5C582.4 260.2 549.5 304 504 304C477.7 304 454.6 289.1 443.2 266.9C431.6 288.8 408.6 304 381.8 304C355.2 304 332.1 289 320.5 267C308.9 289 285.8 304 259.2 304C232.4 304 209.4 288.9 197.8 266.9C186.4 289 163.3 304 137 304C91.4 304 58.6 260.3 71.4 216.5L94.7 136.3zM160.4 416L480.4 416L480.4 349.6C488 351.2 495.9 352 503.9 352C518.2 352 531.9 349.4 544.4 344.8L544.4 496C544.4 522.5 522.9 544 496.4 544L144.4 544C117.9 544 96.4 522.5 96.4 496L96.4 344.8C108.9 349.4 122.5 352 136.9 352C145 352 152.8 351.2 160.4 349.6L160.4 416z"/>
              </svg>
              </span>
            </Link>
          </li>
        <li className="circulaire:block hidden font-bold">
            <Link 
              href="/circulaire" 
              className="flex flex-col items-center justify-center"
            >
              CIRCULAIRE
              <span className="flex items-center justify-center">
              <svg 
                style={{ fill: 'white', width: '3em', height: '3em' }} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 640"
              >
                <path d="M232 144C218.7 144 208 154.7 208 168L208 472C208 480.4 206.6 488.5 203.9 496L504 496C517.3 496 528 485.3 528 472L528 168C528 154.7 517.3 144 504 144L232 144zM136 544C96.2 544 64 511.8 64 472L64 176C64 162.7 74.7 152 88 152C101.3 152 112 162.7 112 176L112 472C112 485.3 122.7 496 136 496C149.3 496 160 485.3 160 472L160 168C160 128.2 192.2 96 232 96L504 96C543.8 96 576 128.2 576 168L576 472C576 511.8 543.8 544 504 544L136 544zM256 216C256 202.7 266.7 192 280 192L328 192C341.3 192 352 202.7 352 216L352 264C352 277.3 341.3 288 328 288L280 288C266.7 288 256 277.3 256 264L256 216zM408 240L456 240C469.3 240 480 250.7 480 264C480 277.3 469.3 288 456 288L408 288C394.7 288 384 277.3 384 264C384 250.7 394.7 240 408 240zM280 320L456 320C469.3 320 480 330.7 480 344C480 357.3 469.3 368 456 368L280 368C266.7 368 256 357.3 256 344C256 330.7 266.7 320 280 320zM280 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400z"/>
              </svg>
              </span>
            </Link>
          </li>
          <li className="ressources:block hidden font-bold">
              <Link 
                href="/ressources" 
                className="flex flex-col items-center justify-center"
              >
                RESSOURCES SANTÉ
                <span className="flex items-center justify-center">
                <svg 
                  style={{ fill: 'white', width: '3em', height: '3em' }} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 640 640"
                >
                  <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM288 280C288 271.2 295.2 264 304 264L336 264C344.8 264 352 271.2 352 280L352 320L392 320C400.8 320 408 327.2 408 336L408 368C408 376.8 400.8 384 392 384L352 384L352 424C352 432.8 344.8 440 336 440L304 440C295.2 440 288 432.8 288 424L288 384L248 384C239.2 384 232 376.8 232 368L232 336C232 327.2 239.2 320 248 320L288 320L288 280z"/>
                </svg>
                </span>
              </Link>
            </li>
            <li className="panier:block hidden font-bold">
                <Link 
                  href="/panier" 
                  className="flex flex-col items-center justify-center"
                >
                  PANIER
                  <span className="flex items-center justify-center">
                    <svg 
                      style={{ fill: 'white', width: '3em', height: '3em' }} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 640 640"
                    >
                      <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
                    </svg>
                  </span>
                </Link>
              </li>
        <li className="dossier:block hidden font-bold">
            <Link 
              href="/mon-dossier" 
              className="flex flex-col items-center justify-center"
            >
              MON DOSSIER
              <span className="flex items-center justify-center">
              <svg 
                style={{ fill: 'white', width: '3em', height: '3em' }} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 640"
              >
                <path d="M128 512L512 512C547.3 512 576 483.3 576 448L576 208C576 172.7 547.3 144 512 144L362.7 144C355.8 144 349 141.8 343.5 137.6L305.1 108.8C294 100.5 280.5 96 266.7 96L128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512z"/>
              </svg>
              </span>
            </Link>
          </li>
        <li className="contact:block hidden font-bold">
            <Link 
              href="/contact" 
              className="flex flex-col items-center justify-center"
            >
              CONTACT
              <span className="flex items-center justify-center">
              <svg 
                style={{ fill: 'white', width: '3em', height: '3em' }} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 640"
              >
                <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
              </svg>
              </span>
            </Link>
          </li>
        </ul>

        {/* RIGHT — Actions + Hamburger + Toggle Daltonien */}
        <div className="flex items-center gap-4 whitespace-nowrap flex-shrink-0 ml-12">

          {/* Connexion / Enregistrer */}
          <div className="hidden connexion:flex flex-col mr-12 gap-1 font-bold underline">
            <Link href="/connexion" className="hover:underline">ME CONNECTER</Link>
            {/* <p style={{ color: "white" }}>/</p> */}
            <Link href="/enregistrer" className="hover:underline">CRÉER MON COMPTE</Link>
          </div>

          {/* Toggle Daltonien */}
          <button
            onClick={() => setColorblind(!colorblind)}
            className="px-3 py-1 rounded bg-white text-green-700 font-semibold text-sm hover:bg-gray-200 transition"
          >
            Daltonien : {colorblind ? "ON" : "OFF"}
          </button>

          {/* Hamburger */}
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
