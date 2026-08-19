'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  // Une bonne pratique est de regrouper les champs du formulaire dans un seul objet d'état
  const [formData, setFormData] = useState({
    nom: '',
    courriel: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu ajouteras la logique pour envoyer les données à ton API ou backend (ex: avec un fetch)
    console.log('Données à envoyer :', formData);
    alert('Message envoyé avec succès !');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-900 font-sans pb-12">
      <main className="max-w-6xl mx-auto px-4 pt-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#86efac] mb-4">Nous Joindre</h1>
          <p className="text-gray-300">Notre équipe est là pour répondre à toutes tes questions sur ta santé et nos services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Colonne 1 : Informations de la pharmacie */}
          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#008037] mb-6">Informations de la succursale</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 text-[#008037] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Adresse</h3>
                    <p className="text-gray-600">1234 Rue Principale<br />Montréal, QC H2X 1Y2</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-[#008037] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Téléphone</h3>
                    <p className="text-gray-600">514-555-0199</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MailIcon className="w-6 h-6 text-[#008037] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Courriel</h3>
                    <p className="text-gray-600">contact@bonlebon.ca</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-lg mb-4 text-[#008037]">Heures d'ouverture</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between"><span>Lundi - Vendredi</span> <span>8h00 - 21h00</span></li>
                <li className="flex justify-between"><span>Samedi</span> <span>9h00 - 17h00</span></li>
                <li className="flex justify-between"><span>Dimanche</span> <span>9h00 - 17h00</span></li>
              </ul>
            </div>
          </div>

          {/* Colonne 2 : Formulaire de contact */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#008037] mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nom" className="block text-sm font-semibold mb-1">Nom complet</label>
                <input 
                  type="text" 
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#008037] transition-shadow" 
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="courriel" className="block text-sm font-semibold mb-1">Adresse courriel</label>
                <input 
                  type="email" 
                  id="courriel"
                  name="courriel"
                  value={formData.courriel}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#008037] transition-shadow" 
                  placeholder="jean.dupont@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-sm font-semibold mb-1">Sujet de la demande</label>
                <select 
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#008037]"
                >
                  <option value="">Sélectionnez un sujet...</option>
                  <option value="renouvellement">Renouvellement d'ordonnance</option>
                  <option value="consultation">Demande de consultation</option>
                  <option value="produit">Information sur un produit</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#008037] transition-shadow resize-none" 
                  placeholder="Comment pouvons-nous vous aider aujourd'hui ?"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#FFF5C3] hover:bg-[#fde047] text-gray-900 font-bold py-3 rounded-lg transition-colors mt-2"
              >
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

// Icônes SVG simples
function LocationIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}