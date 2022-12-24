import { Response, Request, NextFunction } from 'express';
import { CartBody } from '../../interfaces/CartBody';
import { OrderInsertOneResult } from '../orders/orders.model';
import { TransactionInsertOneResult } from './transactions.model';
import TransactionService from './transactions.service';
const TransactionServiceInstance = new TransactionService();

export async function checkout(
  req: Request<{}, { transactions: TransactionInsertOneResult[], order: OrderInsertOneResult }, CartBody>,
  res: Response<{ transactions: TransactionInsertOneResult[], order: OrderInsertOneResult }>,
  next: NextFunction,
) {
  try {
    const transaction = await TransactionServiceInstance.checkout(req.body.products);
    res.status(201);
    res.send(transaction);
  } catch (error) {
    next(error);
  }
}
