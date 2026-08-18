export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      <div className="text-6xl mb-6">🚧</div>

      <h1 className="text-3xl font-bold mb-4">
        Page Profil en construction
      </h1>

      <p className="max-w-md text-gray-600">
        Cette section de la Pharmacie Bon Le Bon est présentement en développement.
        Revenez bientôt pour découvrir les nouvelles fonctionnalités.
      </p>

      {/* Panneau style chantier */}
      <div className="mt-10 bg-yellow-100 border border-yellow-400 text-yellow-800 px-8 py-4 rounded-lg shadow">
        <div className="font-semibold tracking-wide">
          CHANTIER EN COURS
        </div>
      </div>

    </div>
  );
}
