import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import connetDB from "./config/db";
import { dot } from "node:test/reporters";


// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app: Application = express();

//Middleware globaux
app.use(cors()); // Pour permettre les requêtes cross-origin
app.use(express.json()); // Pour parser le JSON dans les requêtes
app.use(express.urlencoded({ extended: true })); // Pour parser les données url-encoded

// Route de test (Health Check)
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenue sur l\'API eTax Solution RDC - Serveur opérationnel 🚀',
        timestamp: new Date().toISOString()
    });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
});