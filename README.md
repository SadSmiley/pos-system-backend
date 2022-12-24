# TODO List

List of tasks for this side project

### Todo

- [ ] Find Product via UPC (Barcode Scanning)
- [ ] Integrate G-Cash Payment API
- [ ] Account
  - [ ] Cashier
    - [ ] Sales and Transactions = Cashiers can use the POS system to process sales and transactions, including accepting payment, giving change, and generating receipts.
    - [ ] Product Information = The POS system should provide cashiers with access to information on products, including pricing, descriptions, and availability.
    - [ ] Customer Information = Some POS systems allow cashiers to access customer information, such as purchase history and contact information. This can be helpful for upselling and customer relationship management.
    - [ ] Inventory Management = The POS system should provide cashiers with information on current inventory levels and allow them to update inventory as products are sold.
    - [ ] Discount and Promotions = Cashiers should be able to apply discounts and promotions to transactions as needed.
  - [ ] Admin
    - [ ] CRUD Cashier Account
    - [ ] CRUD Customer Account
    - [ ] View Reports
      - [ ] Sales Report = This report shows the total amount of sales made during a specific period of time, such as a day, week, or month. It can also break down sales by product, category, or employee.
      - [ ] Inventory Report = This report shows the current inventory levels of products in the POS system, as well as any changes that have occurred over time. It can also include information on low inventory levels, so you can reorder products as needed.
      - [ ] Customer Report = This report provides information on customer purchases, including the number of transactions, the average purchase amount, and the most popular products. It can also include customer demographics and other information to help you better understand your customer base.
      - [ ] Employee Report = This report provides information on employee performance, such as the number of sales made, the average transaction amount, and any customer complaints. It can also include information on employee attendance and hours worked.
      - [ ] Financial Report = This report shows the overall financial health of the business, including income, expenses, and profits. It can also include information on cash flow, debt, and other financial metrics.
      - [ ] Marketing Report = This report shows the effectiveness of marketing campaigns, including the number of leads generated, the conversion rate, and the return on investment (ROI). It can also include information on customer acquisition costs and other metrics to help you measure the success of your marketing efforts.
- [ ] Reverse Search Image
### In Progress


### Done ✓

- [x] Products
- [x] Transactions
- [x] Product Categories
  - [x] Create
  - [x] Find All
  - [x] Update
  - [x] Delete
- [x] Add Categories in Product Module

# Express API Server for POS System

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/mocha)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
