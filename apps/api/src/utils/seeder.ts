import User from '../models/User';
import { Role } from '../types/user.types';

export const seedSuperAdmin = async () => {
  try {
    // On vérifie d'abord s'il y a déjà des utilisateurs
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      // Récupération des secrets depuis les variables d'environnement
      const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
      const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

      // Sécurité : Si les variables ne sont pas définies, on ne fait rien
      if (!adminEmail || !adminPassword) {
        console.warn(
          '⚠️ Tentative de seeding échouée : INITIAL_ADMIN_EMAIL ou INITIAL_ADMIN_PASSWORD manquant dans le .env',
        );
        return;
      }

      console.log(
        '🚀 Initialisation du système : Création du compte SUPER_ADMIN...',
      );

      const superAdmin = new User({
        name: 'Système',
        firstName: 'Administrateur',
        email: adminEmail,
        password: adminPassword, // Sera haché automatiquement par le middleware "pre-save" du modèle User
        role: Role.SUPER_ADMIN,
        actif: true,
      });

      await superAdmin.save();

      // Sécurité : On ne log JAMAIS le mot de passe dans la console
      console.log(
        `✅ SUPER_ADMIN créé avec succès ! Identifiant : ${adminEmail}`,
      );
      console.log(
        '👉 Pensez à changer ce mot de passe lors de votre première connexion.',
      );
    } else {
      // On reste discret en production sur l'existence des comptes
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'ℹ️ Seeding : La base de données contient déjà des utilisateurs.',
        );
      }
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.error(
      "❌ Erreur critique lors de l'initialisation du Super Admin :",
      error.message,
    );
  }
};
