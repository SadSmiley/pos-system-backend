import { Response, Request, NextFunction } from 'express';
import OrderService from './orders.service';

export async function getOrdersNumber(
  req: Request<{}, { number: number }, {}>,
  res: Response<{ number: number }>,
  next: NextFunction,
) {
  try {
    const orderService = new OrderService();
    const lastOrderNumber = await orderService.generateOrderNumber();
    res.status(200);
    res.send({ number: lastOrderNumber });
  } catch (error) {
    next(error);
  }
}
