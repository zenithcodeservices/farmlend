// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createOrder, deleteOrder, getOrderById, updateOrder } from '@/services/orders';
import { Order } from '@/types/order';
import type { NextApiRequest, NextApiResponse } from 'next'


type OrderResponse = {
  status: string;
  message: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order | Order[] | OrderResponse>
) {
  switch (req.method) {
    case 'GET':
      try {
        const id = Number(req.query.id);
        const order = await getOrderById(id);
        if (order) {
          res.status(200).json(order);
        } else {
          res.status(404).json({
            message: `Order with ID ${req.query.id} not found`,
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
        const order = await createOrder(data);
        res.status(201).json(order);
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
        const order = await updateOrder(id, data);
        res.status(200).json(order);
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
        const response = await deleteOrder(id);
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
