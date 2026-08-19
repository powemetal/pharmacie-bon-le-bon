

export async function inscrireUtilisateur(data: {
  courriel: string;
  pseudonyme: string;
  motDePasse: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Erreur lors de l'inscription");
  }

  return res.json(); // { user, token }
}



export async function loginUtilisateur(data: {
  courriel: string;
  motDePasse: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Erreur lors de la connexion");
  }

  return res.json(); // { user, token }
}
