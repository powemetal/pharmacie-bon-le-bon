import { redirect } from "next/navigation";
import { getUtilisateurAvecDossier } from "@/lib/services/utilisateurs";

export default async function MonDossierPage() {
  const userId = "u1";
  const user = await getUtilisateurAvecDossier(userId);

  if (!user) {
    return (
      <main className="pt-24 px-16 b600:px-4">
        <p style={{ color: "var(--error)" }}>Utilisateur introuvable.</p>
      </main>
    );
  }

  return (
    <main
      className="pt-24 px-16 b600:px-4"
      style={{ color: "var(--foreground)" }}
    >
      <section className="max-w-5xl mx-auto">

        {/* TITRE */}
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: "var(--accent)" }}
        >
          Mon dossier
        </h1>

        {/* AVERTISSEMENT UTILISATEUR TEMPORAIRE */}
        <div
          className="p-4 rounded-lg mb-8 border"
          style={{
            background: "var(--card)",
            borderColor: "var(--warning)",
            color: "var(--warning)"
          }}
        >
          <h3 className="font-semibold text-lg mb-1">Utilisateur temporaire</h3>
          <p className="text-sm opacity-90">
            Vous consultez actuellement un dossier utilisateur temporaire.
            L’intégration avec le système d’authentification doit être complétée
            afin d’afficher les informations du véritable utilisateur connecté.
          </p>
        </div>

        {/* PROFIL */}
        <div
          className="shadow-md rounded-lg p-6 mb-10 border"
          style={{
            background: "var(--card)",
            borderColor: "var(--accent)"
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--accent-dark)" }}
          >
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
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--accent-dark)" }}
          >
            Mes commandes
          </h2>

          {user.commandes.length === 0 && (
            <p className="opacity-70">Aucune commande pour le moment.</p>
          )}

          <div className="flex gap-6 overflow-x-auto pb-4">
            {user.commandes.map((cmd) => (
              <div
                key={cmd.id}
                className="min-w-[300px] shadow-lg rounded-xl p-6 flex-shrink-0 border hover:shadow-xl transition"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--accent)"
                }}
              >
                <div className="mb-4 pb-3 border-b" style={{ borderColor: "var(--accent)" }}>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: "var(--accent-dark)" }}
                  >
                    Commande #{cmd.id}
                  </p>
                  <p className="opacity-70 text-sm">
                    Total : {cmd.total.toFixed(2)}$
                  </p>
                </div>

                <ul className="space-y-2">
                  {cmd.items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-md p-3 border"
                      style={{
                        background: "var(--background)",
                        borderColor: "var(--accent)"
                      }}
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
        <div
          className="shadow-md rounded-lg p-6 mb-10 border"
          style={{
            background: "var(--card)",
            borderColor: "var(--accent)"
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--accent-dark)" }}
          >
            Mes ordonnances
          </h2>

          {user.ordonnances.length === 0 && (
            <p className="opacity-70">Aucune ordonnance soumise.</p>
          )}

          {user.ordonnances.map((o) => (
            <div key={o.id} className="border-b pb-4 mb-4" style={{ borderColor: "var(--accent)" }}>
              <p><strong>ID :</strong> {o.id}</p>
              <p><strong>Statut :</strong> {o.statut}</p>
              <a
                href={o.fichierUrl}
                target="_blank"
                style={{ color: "var(--accent-dark)", textDecoration: "underline" }}
              >
                Voir le fichier →
              </a>
            </div>
          ))}
        </div>

        {/* PANIER */}
        <div
          className="shadow-md rounded-lg p-6 mb-10 border"
          style={{
            background: "var(--card)",
            borderColor: "var(--accent)"
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "var(--accent-dark)" }}
          >
            Mon panier
          </h2>

          <a
            href="/panier"
            className="inline-block px-6 py-3 rounded-md transition"
            style={{
              background: "var(--accent)",
              color: "var(--background)"
            }}
          >
            Voir mon panier →
          </a>
        </div>

      </section>
    </main>
  );
}
