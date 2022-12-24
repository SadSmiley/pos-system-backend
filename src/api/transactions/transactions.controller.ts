import { Response, Request, NextFunction } from 'express';
import { CartBody } from '../../interfaces/CartBody';
import { OrderInsertOneResult } from '../orders/orders.model';
import { TransactionInsertOneResult } from './transactions.model';
import CartService from '../carts/carts.service';
const CartServiceInstance = new CartService();

export async function checkout(
  req: Request<{}, { transactions: TransactionInsertOneResult[], order: OrderInsertOneResult }, CartBody>,
  res: Response<{ transactions: TransactionInsertOneResult[], order: OrderInsertOneResult }>,
  next: NextFunction,
) {
  try {
    const transaction = await CartServiceInstance.checkout(req.body.products);
    res.status(201);
    res.send(transaction);
  } catch (error) {
    next(error);
  }
}
