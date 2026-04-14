import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as productService from '../services/product.service';

export const createProduct = async (req: AuthRequest, res: Response) => {
  const productData = {
    ...req.body,
    createdBy: req.user?._id, // On lie automatiquement le créateur
  };
  const product = await productService.createProduct(productData);
  res.status(201).json({ success: true, data: product });
};

export const getAllProducts = async (_req: AuthRequest, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json({ success: true, data: products });
};

export const getProduct = async (req: AuthRequest, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  res.status(200).json({ success: true, data: product });
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const product = await productService.updateProduct(
    req.params.id as string,
    req.body,
  );
  res.status(200).json({ success: true, data: product });
};

export const toggleStatus = async (req: AuthRequest, res: Response) => {
  const product = await productService.toggleProductStatus(
    req.params.id as string,
  );
  res
    .status(200)
    .json({ success: true, message: 'Status mis à jour', data: product });
};
