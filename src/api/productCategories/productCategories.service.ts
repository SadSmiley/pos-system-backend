import { ProductCategories, ProductCategory } from './productCategories.model';
import Service from '../service';

export default class ProductCategoryService extends Service {
  constructor() {
    super(ProductCategories, ProductCategory);
  }
}
