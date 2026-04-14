import User from '../models/User';
import { Role } from '../types/user.types';

export const seedSuperAdmin = async () => {
  try {
    // On vérifie s'il y a déjà des utilisateurs dans la base de données
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log(
        '⚠️ Aucun utilisateur trouvé. Création du SUPER_ADMIN par défaut...',
      );

      const superAdmin = new User({
        name: 'System',
        firstName: 'Admin',
        email: 'admin@etax.cd',
        password: 'Password123!', // À changer par la suite
        role: Role.SUPER_ADMIN,
        actif: true,
      });

      await superAdmin.save();
      console.log(
        '✅ SUPER_ADMIN créé avec succès ! (Email: admin@etax.cd | Mdp: Password123!)',
      );
    } else {
      console.log('✅ Base de données prête (Utilisateurs existants).');
    }
  } catch (error) {
    console.error(
      '❌ Erreur lors de la création du Super Admin par défaut :',
      error,
    );
  }
};
