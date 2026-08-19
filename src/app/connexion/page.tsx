export default function PageConnexion() {
  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-white p-8 rounded-[var(--radius)] shadow-lg border border-[var(--accent)]">
        
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--accent-dark)]">
          Connexion
        </h1>

        <form className="flex flex-col gap-4">
          
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Courriel</label>
            <input
              name="email"
              type="email"
              placeholder="exemple@courriel.com"
              className="border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-[var(--label)]">Mot de passe</label>
            <input
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              className="border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--accent)] text-white py-2 rounded-[var(--radius)] hover:bg-[var(--accent-dark)] transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Pas de compte ?{" "}
          <a href="/enregistrer" className="text-[var(--accent)] hover:underline">
            Créer un compte
          </a>
        </p>

      </div>
    </main>
  );
}
