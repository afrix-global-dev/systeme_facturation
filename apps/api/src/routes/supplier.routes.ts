import { Router } from 'express';
import * as supplierCtrl from '../controllers/supplier.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../types/user.types';

const router = Router();

router.use(protect); // Tout le monde doit être connecté

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Créer un fournisseur (Admin, Gestionnaire, Comptable uniquement)
 */
router
  .route('/')
  .get(supplierCtrl.getAllSuppliers) // Tout le monde peut voir le catalogue
  .post(
    authorize(Role.ADMIN, Role.SUPER_ADMIN, Role.GESTIONNAIRE, Role.COMPTABLE),
    supplierCtrl.createSupplier,
  );

router
  .route('/:id')
  .get(supplierCtrl.getSupplier)
  .put(
    authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.GESTIONNAIRE),
    supplierCtrl.updateSupplier,
  );

export default router;
