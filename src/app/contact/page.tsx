"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    courriel: "",
    sujet: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données à envoyer :", formData);
    alert("Message envoyé avec succès !");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-24 px-16 b600:px-4 min-h-screen pb-12" style={{ color: "var(--foreground)", background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto">
        {/* TITRE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--accent)" }}>
            Nous Joindre
          </h1>
          <p className="opacity-80">Notre équipe est là pour répondre à toutes vos questions sur votre santé et nos services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLONNE 1 : INFOS */}
          <div
            className="shadow-md rounded-lg p-6 border flex flex-col justify-between"
            style={{
              background: "var(--card)",
              borderColor: "var(--accent)",
            }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--accent-dark)" }}>
                Informations de la succursale
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                  <div>
                    <h3 className="font-semibold text-lg">Adresse</h3>
                    <p className="opacity-80">
                      1234 Rue Principale
                      <br />
                      Montréal, QC H2X 1Y2
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                  <div>
                    <h3 className="font-semibold text-lg">Téléphone</h3>
                    <p className="opacity-80">514-555-0199</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MailIcon className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--accent)" }} />
                  <div>
                    <h3 className="font-semibold text-lg">Courriel</h3>
                    <p className="opacity-80">contact@bonlebon.ca</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--accent)" }}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: "var(--accent-dark)" }}>
                Heures d'ouverture
              </h3>
              <ul className="space-y-2 opacity-80">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi</span> <span>8h00 - 21h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi</span> <span>9h00 - 17h00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche</span> <span>9h00 - 17h00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLONNE 2 : FORMULAIRE */}
          <div
            className="shadow-md rounded-lg p-6 border"
            style={{
              background: "var(--card)",
              borderColor: "var(--accent)",
            }}
          >
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--accent-dark)" }}>
              Envoyez-nous un message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nom" className="block text-sm font-semibold mb-1" style={{ color: "var(--label)" }}>
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md p-3 border outline-none focus:ring-2"
                  style={{
                    background: "var(--background)",
                    color: "var(--input)",
                    borderColor: "var(--accent)",
                  }}
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="courriel" className="block text-sm font-semibold mb-1" style={{ color: "var(--label)" }}>
                  Adresse courriel
                </label>
                <input
                  type="email"
                  id="courriel"
                  name="courriel"
                  value={formData.courriel}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md p-3 border outline-none focus:ring-2"
                  style={{
                    background: "var(--background)",
                    color: "var(--input)",
                    borderColor: "var(--accent)",
                  }}
                  placeholder="jean.dupont@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-sm font-semibold mb-1" style={{ color: "var(--label)" }}>
                  Sujet de la demande
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 border outline-none focus:ring-2"
                  style={{
                    background: "var(--background)",
                    color: "var(--input)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <option value="">Sélectionnez un sujet...</option>
                  <option value="renouvellement">Renouvellement d'ordonnance</option>
                  <option value="consultation">Demande de consultation</option>
                  <option value="produit">Information sur un produit</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1" style={{ color: "var(--label)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-md p-3 border outline-none resize-none focus:ring-2"
                  style={{
                    background: "var(--background)",
                    color: "var(--input)",
                    borderColor: "var(--accent)",
                  }}
                  placeholder="Comment pouvons-nous vous aider aujourd'hui ?"
                />
              </div>

              <button
                type="submit"
                className="w-full font-bold py-3 rounded-md transition opacity-90 hover:opacity-100 mt-2"
                style={{
                  background: "var(--accent)",
                  color: "var(--background)",
                }}
              >
                Envoyer le message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Icônes SVG */
function LocationIcon({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon({ className = "w-6 h-6", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
