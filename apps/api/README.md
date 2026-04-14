# eTax Solution RDC - Backend API

## 📌 Contexte du Projet

**eTax solution RDC** est un système de facturation électronique sécurisé, automatisé et conforme aux normes fiscales de la République Démocratique du Congo (DGI). L'objectif est d'automatiser le processus de facturation, gérer efficacement la TVA (16%), assurer un archivage sécurisé (zéro papier) et générer des rapports financiers conformes.

## 🚀 Technologies Utilisées

- **Backend :** Node.js, Express.js
- **Langage :** TypeScript
- **Base de données :** MongoDB (Atlas) avec Mongoose
- **Sécurité :** JWT (JSON Web Tokens), bcrypt
- **Génération PDF :** (Bibliothèque à définir, ex: pdfkit ou puppeteer)

## 📂 Architecture du Projet

\`\`\`text
src/
├── config/ # Configuration globale (Base de données, variables d'environnement)
├── controllers/ # Gère les requêtes HTTP et les réponses (fait le pont entre route et service)
├── middlewares/ # Intercepteurs (Vérification JWT, Permissions des rôles, Gestion des erreurs)
├── models/ # Schémas de base de données (MongoDB avec Mongoose)
├── routes/ # Définition des endpoints (URLs) de l'API
├── services/ # Logique métier pure (Génération de token, hachage, calculs TVA, requêtes DB)
├── types/ # Définitions des types TypeScript personnalisés
├── utils/ # Fonctions utilitaires (Formateurs de réponse, calcul TVA, etc.)
└── server.ts # Fichier d'entrée principal de l'application Express
\`\`\`

## ⚙️ Installation et Lancement

1. Cloner le repository
2. Installer les dépendances : \`npm install\`
3. Configurer les variables d'environnement (Voir \`.env.example\`)
4. Lancer en mode développement : \`npm run dev\`
