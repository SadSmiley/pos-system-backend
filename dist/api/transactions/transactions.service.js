"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_model_1 = require("./transactions.model");
const service_1 = require("../service");
class TransactionService extends service_1.CRUDService {
    constructor() {
        super(transactions_model_1.Transactions, transactions_model_1.Transaction, 'Transaction');
    }
}
exports.default = TransactionService;
//# sourceMappingURL=transactions.service.js.map