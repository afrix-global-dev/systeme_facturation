import { Request, Response } from 'express';

// Typage minimal pour les erreurs Mongo/Mongoose
interface MongooseError extends Error {
  name: string;
  kind?: string;
  errors?: Record<string, { message: string }>;
  code?: number;
}

// Middleware global pour formater les erreurs
export const errorHandler = (err: unknown, req: Request, res: Response) => {
  const error = err as MongooseError;

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message || 'Erreur interne du serveur';

  // CastError (ID invalide)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Ressource non trouvée.';
  }

  // ValidationError
  if (error.name === 'ValidationError' && error.errors) {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Duplicate key
  if (error.code === 11000) {
    statusCode = 400;
    message = 'Donnée dupliquée détectée. Cette information existe déjà.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};
