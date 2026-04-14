import { Router } from 'express';
import * as clientCtrl from '../controllers/client.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../types/user.types';

const router = Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion de la clientèle
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Liste de tous les clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, phone, address]
 *             properties:
 *               name: { type: string, example: "Entreprise Alpha SARL" }
 *               clientType: { type: string, enum: [PERSONNE_PHYSIQUE, PERSONNE_MORALE] }
 *               nif: { type: string, example: "A2201234P" }
 *               email: { type: string, example: "info@alpha.cd" }
 *               phone: { type: string, example: "+243812345678" }
 *               address: { type: string, example: "Gombe, Kinshasa" }
 */
router
  .route('/')
  .get(clientCtrl.getClients)
  .post(
    authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_VENTE, Role.COMPTABLE),
    clientCtrl.createClient,
  );

router
  .route('/:id')
  .get(clientCtrl.getClient)
  .put(
    authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.GESTIONNAIRE),
    clientCtrl.updateClient,
  )
  .delete(authorize(Role.SUPER_ADMIN), clientCtrl.deleteClient); // Suppression physique réservée au Super Admin

router.patch(
  '/:id/toggle-status',
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  clientCtrl.toggleStatus,
);

export default router;
