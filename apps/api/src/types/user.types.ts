import { Document } from 'mongoose';

// Définition stricte des roles
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  COMPTABLE = 'COMPTABLE',
  GESTIONNAIRE = 'GESTIONNAIRE',
  AGENT_VENTE = 'AGENT_VENTE',
}

// Interface pour le modèle User
export interface IUser extends Document {
  name: string;
  firstName: string;
  email: string;
  password: string;
  role: Role;
  actif: boolean; // Permet de désactiver un utilisateur sans le supprimer s'il quitte l'entreprise ou change de poste
  comparePassword(candidatePassword: string): Promise<boolean>;
}
