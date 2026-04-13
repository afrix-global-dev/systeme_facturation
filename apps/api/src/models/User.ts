import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, Role } from '../types/user.types';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez fournir une adresse email valide',
      ],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false, // Ne pas retourner le mot de passe par défaut dans les requêtes
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.AGENT_VENTE,
    },
    actif: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  },
);

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre<IUser>('save', async function () {
  // Si le password n'est pas modifié, passer au middleware suivant
  if (!this.isModified('password')) {
    return;
  }
  try {
    // Générer un salt et hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err: unknown) {
    throw new Error(
      'Erreur lors du hashage du mot de passe: ' + (err as Error).message,
    );
  }
});

// Méthode personnalisée pour comparer les mots de passe lors de la connexion
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
