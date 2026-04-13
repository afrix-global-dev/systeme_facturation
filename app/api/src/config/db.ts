import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("L'URI de la base de données (MONGO_URI) n'est pas défini dans le fichier .env");
    }

    // Connexion à MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ Base de données connectée : ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
    // Arrêter le processus en cas d'échec critique (on ne veut pas que l'API tourne sans BDD)
    process.exit(1); 
  }
};

export default connectDB;