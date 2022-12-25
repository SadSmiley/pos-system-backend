import CartProduct from '../../interfaces/CartProduct';
import ProductService from '../products/products.service';
import OrderService from '../orders/orders.service';
import TransactionService from '../transactions/transactions.service';

export default class CartService {
  async checkout(products: CartProduct[]) {
    // product service instance
    const ProductServiceInstance = new ProductService();
    // order service instance
    const OrderServiceInstance = new OrderService();
    // transaction service instance
    const TransactionServiceInstance = new TransactionService();
    // validate products quantity
    const productsWithData = await Promise.all(products.map(async product => {
      const productData = await ProductServiceInstance.findOne(product.product_id);
      await ProductServiceInstance.validateQuantity(product.product_id, product.quantity);
      return Object.assign({}, product, productData);
    }));
    // generate order number start with 1 check database for last order number and increment
    const orderNumber = await OrderServiceInstance.generateOrderNumber();
    // insert order
    const insertedOrder = await OrderServiceInstance.createOne({
      number: orderNumber,
      date_created: new Date(),
    });

    let transactions = await Promise.all(productsWithData.map(async product => {
      // insert transaction
      const transaction = await TransactionServiceInstance.createOne({
        order_id: insertedOrder.insertedId.toString(),
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
      });
      // update product quantity
      await ProductServiceInstance.updateQuantity(product.product_id, product.quantity);
      return transaction;
    }));
    
    return { transactions, order: insertedOrder };
  }
}