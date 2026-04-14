# 🤝 Guide de contribution

## 🚀 Exécution du projet (Monorepo avec Turborepo)

Le projet est structuré sous forme de **monorepo** utilisant **Turborepo**, permettant de lancer simultanément le frontend et le backend avec une seule commande.

---

## 📁 Structure du projet

```bash
apps/
  web/        → Frontend (Next.js)
  api/        → Backend (Express)

packages/
  core/       → Logique métier partagée (TVA, utils, règles)
  types/      → Types TypeScript partagés
  ui/         → Composants réutilisables (optionnel)
```

---

## ⚙️ Prérequis

- Node.js (>= 18)
- npm

---

## 📦 Installation

```bash
npm install
```

---

## ▶️ Lancer le projet

```bash
npm run dev
```

👉 Lance automatiquement :

- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:4000](http://localhost:4000)

---

# 🧠 Workflow de développement (TRÈS IMPORTANT)

👉 **Objectif : zéro friction, zéro erreur**

---

## ✅ 1. Créer une branche

```bash
git checkout develop
git pull origin develop
git checkout -b feature/frontend/dashboard
```

---

## ✅ 2. Développer normalement

👉 Aucune contrainte particulière

---

## ✅ 3. Faire un commit (ULTRA SIMPLE)

```bash
git commit
```

🔥 **C’est tout.**

---

## ⚡ Ce qui se passe automatiquement :

Quand tu fais `git commit` :

1. ✅ Tous les fichiers sont automatiquement ajoutés (`git add .`)
2. ✅ Le code est vérifié (ESLint)
3. ✅ Le code est formaté (Prettier)
4. ✅ Une interface interactive s’ouvre (Commitizen)
5. ✅ Ton message de commit est validé (Commitlint)

---

## ✍️ Exemple de commit

Tu verras un prompt comme :

```bash
? type: feat
? scope: frontend
? message: ajout du dashboard
```

---

## ❌ Ce que tu ne dois PAS faire

```bash
git commit -m "test"
```

👉 refusé ❌

---

## 🚫 4. Push

```bash
git push origin feature/frontend/dashboard
```

---

## ❌ Interdictions

```bash
git push origin main
```

👉 ❌ BLOQUÉ automatiquement

---

## 🔁 5. Pull Request

- Créer une PR vers `develop`
- Attendre validation
- Merge après review

---

# 🧩 Partage de code

Utilise toujours :

```ts
import { calculateTVA } from '@facturation/core';
```

---

## ⚠️ Règles importantes

- ❌ Ne jamais dupliquer la logique TVA
- ✅ Toujours utiliser `@facturation/core`
- ✅ Respecter les types partagés
- ✅ Une branche = une fonctionnalité

---

# 🧪 Scripts utiles

```bash
npm run dev        # lancer tout
npm run build      # build
npm run lint       # lint
npm run format     # format code
```

---

# 🛠️ Résolution de problèmes

## Reset dépendances

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Reset cache turbo

```bash
npx turbo prune
```

---

# 🧱 Règles Git

## Branches

- `main` → production (protégée)
- `develop` → développement
- `feature/*` → nouvelles fonctionnalités
- `fix/*` → corrections

---

## Format des branches

```bash
feature/frontend/dashboard
feature/backend/invoice
fix/backend/tva-calculation
```

---

# 🧠 Philosophie du projet

Ce projet est un **système fiscal critique**.

👉 Donc :

- précision > rapidité
- cohérence > duplication
- sécurité > facilité

---

# 🚀 Résumé pour un dev

```bash
git checkout -b feature/ma-feature
# code...

git commit   ← (c’est tout 😄)

git push origin feature/ma-feature
```

---

# 🔥 Important

Si tu respectes ce guide :

👉 tu ne peux PAS :

- faire un mauvais commit
- casser le code
- push sur main
