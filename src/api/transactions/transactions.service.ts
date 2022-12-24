import { Transactions, Transaction } from './transactions.model';
import Service from '../service';

export default class TransactionService extends Service {
  constructor() {
    super(Transactions, Transaction);
  }
}
