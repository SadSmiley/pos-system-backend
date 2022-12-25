import { Transactions, Transaction } from './transactions.model';
import { CRUDService } from '../service';

export default class TransactionService extends CRUDService {
  constructor() {
    super(Transactions, Transaction, 'Transaction');
  }
}
