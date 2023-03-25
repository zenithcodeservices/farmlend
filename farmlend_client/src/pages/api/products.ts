// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createProduct, deleteProduct, getProductById, updateProduct } from '@/services/products';
import { Product } from '@/types/product';
import type { NextApiRequest, NextApiResponse } from 'next'


type ProductResponse = {
  status: string;
  message: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[] | ProductResponse>
) {
  switch (req.method) {
    case 'GET':
      try {
        const id = Number(req.query.id);
        const Product = await getProductById(id);
        if (Product) {
          res.status(200).json(Product);
        } else {
          res.status(404).json({
            message: `Product with ID ${req.query.id} not found`,
            status: 'error'
          });
        }
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'POST':
      try {
        const data = req.body;
        const Product = await createProduct(data);
        res.status(201).json(Product);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'PUT':
      try {
        const id = Number(req.query.id);
        const data = req.body;
        const Product = await updateProduct(id, data);
        res.status(200).json(Product);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'DELETE':
      try {
        const id = Number(req.query.id);
        const response = await deleteProduct(id);
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    default:
      res.status(405).json({
        message: 'Method not allowed',
        status: 'error'
      });
      break;
    }
}
