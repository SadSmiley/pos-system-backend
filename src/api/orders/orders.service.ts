import { Orders, Order } from './orders.model';
import utils from 'utils';
import { CRUDService } from '../service';

// Extract classes and enums from utils
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class OrderService extends CRUDService {
  constructor() {
    super(Orders, Order, 'Order');
  }

  // generate order number start with 1 check database for last order number and increment
  async generateOrderNumber() {
    const lastOrder = await Orders.find().sort({ number: -1 }).limit(1).toArray();
    return lastOrder.length ? lastOrder[0].number + 1 : 1;
  }

  // create one
  async createOne(data: Order) {
    // before inserting validate if order number already exists
    const orderNumberExists = await Orders.findOne({ number
    : data.number });
    if (orderNumberExists)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Order number already exists.',
        false,
      );
    // insert order
    const insertResult = await Orders.insertOne(data);
    if (!insertResult.acknowledged)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Error inserting order.',
        false,
      );
    return insertResult;
  }
}
