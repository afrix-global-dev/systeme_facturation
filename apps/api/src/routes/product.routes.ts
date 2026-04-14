import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { protect, authorize } from '../middlewares/auth.middleware';
import { Role } from '../types/user.types';

const router = Router();

router.use(protect); // Tout le monde doit être connecté

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un produit (Admin, Gestionnaire, Comptable uniquement)
 */
router
  .route('/')
  .get(productCtrl.getAllProducts) // Tout le monde peut voir le catalogue
  .post(
    authorize(Role.ADMIN, Role.SUPER_ADMIN, Role.GESTIONNAIRE, Role.COMPTABLE),
    productCtrl.createProduct,
  );

router
  .route('/:id')
  .get(productCtrl.getProduct)
  .put(
    authorize(Role.SUPER_ADMIN, Role.ADMIN, Role.GESTIONNAIRE),
    productCtrl.updateProduct,
  );

router.patch(
  '/:id/toggle-status',
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  productCtrl.toggleStatus,
);

export default router;
