import Product from '../models/Product';
import { IProduct } from '../types/product.types';

export const createProduct = async (data: Partial<IProduct>) => {
  // Calcul automatique du TTC selon la norme RDC (TTC = HT * 1.16)
  if (data.priceHT) {
    data.tvaRate = 16;
    data.priceTTC = Number((data.priceHT * 1.16).toFixed(2));
  }
  return await Product.create(data);
};

export const getAllProducts = async () => {
  return await Product.find()
    .populate('supplier', 'name nif')
    .populate('createdBy', 'name firstName');
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id).populate('supplier createdBy');
  if (!product) throw new Error('Produit introuvable');
  return product;
};

export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  if (data.priceHT) {
    data.priceTTC = Math.round(data.priceHT * 1.16 * 100) / 100;
  }
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product) throw new Error('Produit introuvable');
  return product;
};

export const toggleProductStatus = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Produit introuvable');
  product.active = !product.active;
  return await product.save();
};
