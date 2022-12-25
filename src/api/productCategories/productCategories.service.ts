import { ProductCategories, ProductCategory } from './productCategories.model';
import { CRUDService } from '../service';

export default class ProductCategoryService extends CRUDService {
  constructor() {
    super(ProductCategories, ProductCategory, 'Product Category');
  }
}
