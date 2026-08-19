'use client';

import React, { useState } from 'react';

export default function ProfilClient() {
  // États simples pour gérer les préférences de communication
  const [isMarketingSubscribed, setIsMarketingSubscribed] = useState(false);
  const [isSmsSubscribed, setIsSmsSubscribed] = useState(true);

  return (
    <div className="min-h-screen bg-[#111111] text-gray-900 font-sans pb-12">
      <main className="max-w-6xl mx-auto px-4 pt-10">
        {/* Titre de la page */}
        <h1 className="text-4xl font-bold text-[#86efac] mb-8">Mon Profil Client</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Section 1 : Informations Personnelles */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[#008037] mb-6">Vos Informations Personnelles</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Prénom</label>
                <input 
                  type="text" 
                  defaultValue="Alice" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#008037]" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Nom</label>
                <input 
                  type="text" 
                  defaultValue="Tremblay" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#008037]" 
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-2">
                <span className="text-gray-600 font-medium w-24">Courriel</span>
                <input type="email" defaultValue="alice@example.com" className="bg-transparent flex-1 focus:outline-none" />
                <button className="text-gray-400 hover:text-gray-700 ml-2 flex items-center gap-1 text-sm">
                  <EditIcon /> Édit
                </button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-2">
                <span className="text-gray-600 font-medium w-24">Téléphone</span>
                <input type="tel" defaultValue="438-555-3333" className="bg-transparent flex-1 focus:outline-none" />
                <button className="text-gray-400 hover:text-gray-700 ml-2 flex items-center gap-1 text-sm">
                  <EditIcon /> Édit
                </button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-2">
                <span className="text-gray-600 font-medium w-24">Adresse</span>
                <input type="text" defaultValue="12 Rue des Érables" className="bg-transparent flex-1 focus:outline-none" />
                <button className="text-gray-400 hover:text-gray-700 ml-2 flex items-center gap-1 text-sm">
                  <EditIcon /> Édit
                </button>
              </div>
            </div>

            <button className="w-full bg-[#FFF5C3] hover:bg-[#fde047] text-gray-900 font-bold py-3 rounded-lg transition-colors">
              Enregistrer les modifications
            </button>
          </div>

          {/* Section 2 : Adresses de Livraison */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[#008037] mb-6">Mes Adresses de Livraison</h2>
            
            <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-start">
              <div>
                <p className="font-bold">Alice Tremblay</p>
                <p className="text-gray-600 mt-1">12 Rue des Érables, Sainte-Julienne</p>
              </div>
              <div className="flex space-x-3 text-sm">
                <button className="flex items-center text-gray-600 hover:text-[#008037] transition-colors">
                  <EditIcon className="mr-1"/> Modifier
                </button>
                <button className="flex items-center text-red-500 hover:text-red-700 transition-colors">
                  <TrashIcon className="mr-1"/> Supprimer
                </button>
              </div>
            </div>

            <button className="w-full bg-[#FFF5C3] hover:bg-[#fde047] text-gray-900 font-bold py-3 rounded-lg transition-colors mt-2">
              Ajouter une nouvelle adresse
            </button>
          </div>

          {/* Section 3 : Historique de Commandes */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[#008037] mb-6">Historique de Commandes Récents</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Carte Commande 1 */}
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#008037]">Commande #cmd1</span>
                  <span className="bg-[#bbf7d0] text-[#008037] text-xs font-bold px-2 py-1 rounded-full">Livrée</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Date : 26.01.2023</p>
                <p className="text-sm font-medium">Advil 200mg</p>
                <p className="text-xs text-gray-500 mb-2">2 x 8.99$</p>
                <div className="mt-4 pt-2 border-t border-[#bbf7d0] flex justify-between items-center font-bold">
                  <span>Total :</span>
                  <span>29.97$</span>
                </div>
              </div>

              {/* Carte Commande 2 */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700">Commande #cmd2</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">En préparation</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Date : 28.01.2023</p>
                <p className="text-sm font-medium mb-2">Vitamine C 500mg</p>
                <div className="mt-8 pt-2 border-t border-gray-200 flex justify-between items-center font-bold">
                  <span>Total :</span>
                  <span>29.97$</span>
                </div>
              </div>
            </div>

            <button className="text-[#008037] font-semibold hover:underline w-full text-center mt-2">
              Voir tout l'historique
            </button>
          </div>

          {/* Section 4 : Sécurité et Préférences */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-[#008037] mb-6">Sécurité et Préférences</h2>
            
            <button className="w-full bg-[#FFF5C3] hover:bg-[#fde047] text-gray-900 font-bold py-3 rounded-lg transition-colors mb-8">
              Changer le mot de passe
            </button>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Abonnement aux courriels promotionnels</span>
                {/* Toggle Button personnalisé */}
                <button 
                  onClick={() => setIsMarketingSubscribed(!isMarketingSubscribed)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${isMarketingSubscribed ? 'bg-[#008037]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${isMarketingSubscribed ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Notifications SMS pour les commandes</span>
                {/* Toggle Button personnalisé */}
                <button 
                  onClick={() => setIsSmsSubscribed(!isSmsSubscribed)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${isSmsSubscribed ? 'bg-[#008037]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${isSmsSubscribed ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Composants d'icônes SVG simples pour éviter l'installation de bibliothèques externes
function EditIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function TrashIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}