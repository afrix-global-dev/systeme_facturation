import { Request, Response, NextFunction } from 'express';



// Middleware global pour formater les erreurs
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Si le code de statut est toujours 200 alors qu'il y a une erreur, on le passe à 500
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Erreur interne du serveur';

    // Gestion spécifique des erreurs MongoDB/Mongoose (ex: Mauvais format d'ID)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Ressource non trouvée.';
    }

    // Erreurs de validation Mongoose (ex: champ requis manquant)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    }

    // Erreur de duplication MongoDB (ex: email déjà existant)
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Donnée dupliquée détectée. Cette information existe déjà.';
    }

    // Réponse JSON standardisée
    res.status(statusCode).json({
        success: false,
        message,
        // On affiche la stack d'erreur (la trace technique) seulement en mode développement
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};