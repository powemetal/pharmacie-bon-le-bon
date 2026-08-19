"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function PaimentPage() {
  const router = useRouter();

  // États du formulaire : Livraison
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");

  // États du formulaire : Carte de crédit
  const [nomCarte, setNomCarte] = useState("");
  const [numeroCarte, setNumeroCarte] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  // État de la modal de confirmation
  const [numeroConfirmation, setNumeroConfirmation] = useState<string | null>(null);

  // Vider les champs et rediriger vers l'accueil
  const handleAnnulerCommande = () => {
    setPrenom("");
    setNom("");
    setAdresse("");
    setVille("");
    setCodePostal("");
    setNomCarte("");
    setNumeroCarte("");
    setExpiration("");
    setCvv("");

    router.push("/");
  };

  // Traiter la commande et afficher le pop-up
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Génération d'un numéro aléatoire style BLB4158
    const chiffresAleatoires = Math.floor(1000 + Math.random() * 9000);
    const codeGenere = `BLB${chiffresAleatoires}`;

    setNumeroConfirmation(codeGenere);
  };

  // Fermer le pop-up et rediriger vers l'accueil
  const handleFermerModal = () => {
    setNumeroConfirmation(null);
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--accent-dark)]">
        Paiement & Livraison
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION ADRESSE DE LIVRAISON */}
        <section className="bg-[var(--card)] p-6 rounded-[var(--radius)] shadow-[var(--shadow)] space-y-4">
          <h2 className="text-xl font-semibold text-[var(--accent-dark)] border-b border-gray-200 pb-2">
            Adresse de livraison
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prénom</label>
              <input
                type="text"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Jean"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Tremblay"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Adresse civique</label>
            <input
              type="text"
              required
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="1234, rue Principale"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ville</label>
              <input
                type="text"
                required
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Montréal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Code postal</label>
              <input
                type="text"
                required
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="H1A 1A1"
              />
            </div>
          </div>
        </section>

        {/* SECTION INFORMATIONS DE PAIEMENT */}
        <section className="bg-[var(--card)] p-6 rounded-[var(--radius)] shadow-[var(--shadow)] space-y-4">
          <h2 className="text-xl font-semibold text-[var(--accent-dark)] border-b border-gray-200 pb-2">
            Paiement par carte de crédit
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Titulaire de la carte</label>
            <input
              type="text"
              required
              value={nomCarte}
              onChange={(e) => setNomCarte(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Jean Tremblay"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Numéro de carte</label>
            <input
              type="text"
              required
              maxLength={19}
              value={numeroCarte}
              onChange={(e) => setNumeroCarte(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="4500 0000 0000 0000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiration (MM/AA)</label>
              <input
                type="text"
                required
                maxLength={5}
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="12/28"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="password"
                required
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="123"
              />
            </div>
          </div>
        </section>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-2">
          <button
            type="button"
            onClick={handleAnnulerCommande}
            className="w-full sm:w-auto px-6 py-3 rounded-[var(--radius)] border border-red-500 text-red-600 font-semibold hover:bg-red-50 transition text-center cursor-pointer"
          >
            Annuler la commande
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-[var(--radius)] bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-dark)] transition shadow-md cursor-pointer"
          >
            Passer ma commande
          </button>
        </div>
      </form>

      {/* POP-UP / MODAL DE CONFIRMATION */}
      {numeroConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-[var(--radius)] shadow-2xl max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Commande confirmée !
            </h3>

            <p className="text-gray-600">
              Merci pour votre achat à la Pharmacie Bon Le Bon. Votre commande a été enregistrée avec succès.
            </p>

            <div className="bg-gray-100 p-4 rounded-[var(--radius)] border border-gray-200">
              <span className="block text-xs text-gray-500 uppercase tracking-wide">
                Numéro de confirmation
              </span>
              <span className="text-2xl font-black text-[var(--accent-dark)] tracking-wider">
                #{numeroConfirmation}
              </span>
            </div>

            <button
              onClick={handleFermerModal}
              className="w-full py-3 bg-[var(--accent)] text-white font-bold rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}