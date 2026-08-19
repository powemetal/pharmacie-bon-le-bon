import { redirect } from "next/navigation";
import { getUtilisateurAvecDossier } from "@/lib/services/utilisateurs";

export default async function MonDossierPage() {
  // 🔒 Auth réelle (commentée pour la démo)
  // const userId = null;
  // if (!userId) {
  //   redirect("/connexion");
  // }

  // 👇 Pour la démo, on force un utilisateur temporaire
  const userId = "u1";

  const user = await getUtilisateurAvecDossier(userId);

  if (!user) {
    return (
      <main className="pt-24 px-16 @[b600]:px-4">
        <p className="text-red-500">Utilisateur introuvable.</p>
      </main>
    );
  }

  return (
    <main className="pt-24 px-16 @[b600]:px-4">
      <section className="max-w-5xl mx-auto">

        {/* TITRE */}
        <h1 className="text-4xl font-bold text-green-200 mb-6">
          Mon dossier
        </h1>

        {/* AVERTISSEMENT UTILISATEUR TEMPORAIRE */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-lg mb-1">Utilisateur temporaire</h3>
          <p className="text-sm opacity-90">
            Vous consultez actuellement un dossier utilisateur temporaire.
            L’intégration avec le système d’authentification doit être complétée
            afin d’afficher les informations du véritable utilisateur connecté.
          </p>
        </div>

        {/* PROFIL */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-green-100">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Informations personnelles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Prénom :</strong> {user.profil?.prenom}</p>
            <p><strong>Nom :</strong> {user.profil?.nom}</p>
            <p><strong>Téléphone :</strong> {user.profil?.telephone}</p>
            <p><strong>Adresse :</strong> {user.profil?.adresse}</p>
            <p><strong>Courriel :</strong> {user.courriel}</p>
          </div>
        </div>

        {/* COMMANDES */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Mes commandes
          </h2>

          {user.commandes.length === 0 && (
            <p className="opacity-70">Aucune commande pour le moment.</p>
          )}

          <div className="flex gap-6 overflow-x-auto pb-4">
            {user.commandes.map((cmd) => (
              <div
                key={cmd.id}
                className="min-w-[300px] bg-white shadow-lg rounded-xl p-6 flex-shrink-0 border border-green-100 hover:shadow-xl transition"
              >
                {/* Header */}
                <div className="mb-4 pb-3 border-b border-green-200">
                  <p className="font-semibold text-lg text-green-700">
                    Commande #{cmd.id}
                  </p>
                  <p className="opacity-70 text-sm">
                    Total : {cmd.total.toFixed(2)}$
                  </p>
                </div>

                {/* Items */}
                <ul className="space-y-2">
                  {cmd.items.map((item) => (
                    <li
                      key={item.id}
                      className="bg-green-50 border border-green-100 rounded-md p-3"
                    >
                      <p className="font-medium">{item.produit.nom}</p>
                      <p className="text-sm opacity-70">
                        {item.quantite} × {item.prix.toFixed(2)}$
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ORDONNANCES */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-green-100">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Mes ordonnances
          </h2>

          {user.ordonnances.length === 0 && (
            <p className="opacity-70">Aucune ordonnance soumise.</p>
          )}

          {user.ordonnances.map((o) => (
            <div key={o.id} className="border-b pb-4 mb-4">
              <p><strong>ID :</strong> {o.id}</p>
              <p><strong>Statut :</strong> {o.statut}</p>
              <a
                href={o.fichierUrl}
                target="_blank"
                className="text-green-700 underline"
              >
                Voir le fichier →
              </a>
            </div>
          ))}
        </div>

        {/* PANIER */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-green-100">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Mon panier
          </h2>

          <a
            href="/panier"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Voir mon panier →
          </a>
        </div>

      </section>
    </main>
  );
}
