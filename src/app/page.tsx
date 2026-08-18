export default function Page() {
  return (
    <section className="space-y-10">

      {/* HERO */}
      <div className="bg-green-700 text-white rounded-xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue à la Pharmacie Bon Le Bon
        </h1>
        <p className="text-lg opacity-90">
          Votre pharmacie de quartier, maintenant accessible en ligne.
        </p>
      </div>

      {/* SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <a
          href="/catalogue"
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Catalogue
          </h2>
          <p className="text-gray-700">
            Consultez nos produits disponibles.
          </p>
        </a>

        <a
          href="/panier"
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Panier
          </h2>
          <p className="text-gray-700">
            Gérez les articles que vous souhaitez acheter.
          </p>
        </a>

        <a
          href="/circulaire"
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Circulaire
          </h2>
          <p className="text-gray-700">
            Magasinez les articles à rabais.
          </p>
        </a>

      </div>

    </section>
  );
}
