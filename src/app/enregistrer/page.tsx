export default function PageEnregistrement() {
  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-[var(--card)] p-8 rounded-[var(--radius)] shadow-[var(--shadow)] border border-[var(--accent)]">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--accent-dark)]">
          Créer un compte
        </h1>

        <form className="flex flex-col gap-4">

          {/* Courriel */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Courriel</label>
            <input
              name="email"
              type="email"
              placeholder="exemple@courriel.com"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Pseudo */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Pseudo</label>
            <input
              name="pseudo"
              type="text"
              placeholder="Votre nom d'utilisateur"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Mot de passe</label>
            <input
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              className="border rounded px-3 py-2 placeholder-[var(--placeholder)] text-[var(--input)]"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="bg-[var(--accent)] text-white py-2 rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition"
          >
            S’enregistrer
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="text-center text-sm mt-4 text-[var(--foreground)]">
          Déjà un compte ?{" "}
          <a href="/connexion" className="text-[var(--accent)] hover:underline">
            Se connecter
          </a>
        </p>

      </div>
    </main>
  );
}
