# Documentation Technique - Application Pharmacie Bon Le Bon

## 1. Informations sur le Projet et Auteurs
Projet réalisé dans le cadre du programme d'AEC en Développement de systèmes au Collège de Maisonneuve.

**Auteurs du projet :**
* Francis Boisvert
* Clément Laflamme
* Mathieu Gosselin

---

## 2. Description du Projet
L'application "Pharmacie Bon Le Bon" est une plateforme web interactive permettant aux clients d'une pharmacie de :
* Consulter la circulaire hebdomadaire des promotions et filtrer les produits par catégorie.
* Parcourir le catalogue complet de produits de santé, d'hygiène et de soins.
* Gérer un panier d'achats dynamique en temps réel (ajout, modification des quantités, suppression, vidage).
* S'authentifier pour accéder à leur espace client.
* Soumettre des ordonnances médicales numériques (nouvelle, renouvellement, transfert) avec téléversement de fichiers et choix du mode de réception (cueillette ou livraison).
* Adapter l'interface visuelle pour l'accessibilité (mode daltonisme).

---

## 3. Technologies Utilisées

### 3.1 Framework et Environnement d'Exécution
* **Next.js 16 (App Router)** : Framework React full-stack gérant le rendu côté serveur (SSR), le rendu côté client, les Server Actions pour les mutations de données, ainsi que le routage basé sur le système de fichiers.
* **React 19 & React DOM 19** : Bibliothèque d'interface utilisateur exploitant le React Compiler (`babel-plugin-react-compiler`) pour l'optimisation automatique des re-rendus.
* **Node.js & TypeScript 5** : Langage principal du projet assurant un typage statique rigoureux de la base de code, des API et des modèles de données.

### 3.2 Base de Données et ORM
* **Prisma ORM 7** : Mapper objet-relationnel (ORM) utilisé pour la modélisation de la base de données, la génération du client de données et la gestion du schéma (utilisateurs, paniers, articles, produits).
* **Neon (PostgreSQL Serverless)** : Base de données relationnelle PostgreSQL hébergée dans le cloud.
* **@prisma/adapter-neon** : Adaptateur pilote permettant la connexion HTTP/WebSocket optimisée entre Prisma client et la base de données Neon.
* **dotenv** : Gestion des variables d'environnement confidentielles (chaînes de connexion, clés API).

### 3.3 Interface Utilisateur et Style
* **Tailwind CSS 4 & PostCSS** : Framework CSS utilitaire utilisé pour la conception d'interfaces adaptatives (responsive design), la gestion de variables CSS globales et la mise en place de styles d'accessibilité.
* **Lucide React** : Collection d'icônes vectorielles légères et accessibles.

### 3.4 Sécurité et Utilitaires
* **Bcrypt** : Bibliothèque de hachage sécurisé pour la gestion et le stockage des mots de passe utilisateurs.
* **server-only** : Module de sécurité garantissant que les fichiers contenant de la logique métier sensible ou des accès directs à la base de données ne puissent pas être exécutés ni fuités côté client.
* **ESLint 9** : Outil d'analyse statique de code garantissant le respect des normes de qualité et des conventions React/Next.js.

---

## 4. Architecture et Modélisation Fonctionnelle

### 4.1 Modèle de Données et Gestion du Panier
La gestion du panier est adossée à la base de données via Prisma avec les entités principales :
* `Utilisateur` : Identifié par courriel et mot de passe haché. Un utilisateur de démonstration (`demo@pharmacie.com`) est initialisé automatiquement si aucun compte n'est actif.
* `Panier` : Lié de manière unique à un utilisateur (`utilisateurId`).
* `ItemPanier` : Relation intermédiaire reliant un `Panier` et un `Produit`, gérant la quantité d'articles via la contrainte d'unicité composée `panierId_produitId`.

### 4.2 Server Actions (`"use server"`)
Toutes les opérations d'écriture et de mutation de données sont exécutées côté serveur via des Server Actions de Next.js :
* `ajouterAuPanierAction` : Ajoute un article ou incrémente sa quantité si l'article existe déjà (`upsert`).
* `modifierQuantiteItem` : Met à jour la quantité d'un article et supprime l'entrée si la quantité atteint 0.
* `supprimerItem` : Retire un article spécifique du panier.
* `viderPanier` : Supprime l'ensemble des articles associés à un identifiant de panier.
* `loginUtilisateur` : Traite l'authentification et les données du formulaire de connexion.

L'invalidation du cache de rendu après chaque mutation est assurée par la fonction `revalidatePath("/panier")`.

### 4.3 Navigation et Filtrage dynamique
La page de la circulaire exploite l'obtention asynchrone des paramètres d'URL (`searchParams`) pour filtrer les produits par catégorie directement lors de la requête HTTP, éliminant les temps de chargement inutiles côté client.

---

## 5. Accessibilité Visuelle (WCAG)
L'application prend en compte les normes d'accessibilité numérique :
* **Thème Daltonien (Colorblind Safe)** : Utilisation de sélecteurs CSS conditionnels `[.colorblind_&]` pour remplacer dynamiquement la palette de couleurs à dominante verte par des teintes bleues à fort contraste, facilitant la lecture pour les utilisateurs atteints de protanopie ou deutéranopie.
* **Navigation au Clavier** : Prise en charge des événements `onKeyDown` (`Enter`, `Space`) et gestion des attributs `tabIndex` sur les zones d'interaction alternatives (glisser-déposer de fichiers).

---

## 6. Commandes du Projet

```bash
# Installation des dépendances
npm install

# Lancement de l'environnement de développement
npm run dev

# Génération du client Prisma
npx prisma generate

# Synchronisation du schéma avec la base de données Neon
npx prisma db push

# Build de production
npm run build

# Démarrage de l'application en mode production
npm run start