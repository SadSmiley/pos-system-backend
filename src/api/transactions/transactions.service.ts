import { Transactions, Transaction } from './transactions.model';
import CartProduct from '../../interfaces/CartProduct';
import ProductService from '../products/products.service';
import OrderService from '../orders/orders.service';

// Extract classes and enums from utils
import utils from 'utils';
const { classes, enums } = utils;
const { AppError } = classes;
const { HttpErrorCode } = enums;

export default class TransactionService {
  async checkout(products: CartProduct[]) {
    // product service instance
    const ProductServiceInstance = new ProductService();
    // order service instance
    const OrderServiceInstance = new OrderService();
    // generate order number start with 1 check database for last order number and increment
    const orderNumber = await OrderServiceInstance.generateOrderNumber();
    // insert order
    const insertedOrder = await OrderServiceInstance.createOne({
      number: orderNumber,
      date_created: new Date(),
    });

    // create transactions
    let transactions = await Promise.all(products.map(async product => {
      // get product data
      const productData = await ProductServiceInstance.findOne(product.product_id);
      // validate product quantity
      await ProductServiceInstance.validateQuantity(product.product_id, product.quantity);
      // insert transaction
      const transaction = await this.createOne({
        order_id: insertedOrder.insertedId.toString(),
        product_id: product.product_id,
        quantity: product.quantity,
        price: productData.price,
      });
      // update product quantity
      await ProductServiceInstance.updateQuantity(product.product_id, product.quantity);
      return transaction;
    }));

    return { transactions, order: insertedOrder };
  }

  async createOne(data: Transaction) {
    const insertResult = await Transactions.insertOne(data);
    if (!insertResult.acknowledged)
      throw new AppError(
        HttpErrorCode.BadRequest,
        'Error inserting transaction.',
        false,
      );
    return insertResult;
  }
}
