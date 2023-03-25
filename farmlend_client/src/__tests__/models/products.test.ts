import { Product } from '@/types/product';
import { createProduct, deleteProduct, getProductById, updateProduct } from '@/services/products';

describe('Products', () => {
  let product: Product = {
    id: 1,
    category: 'Test Category',
    variety: 'Test Variety',
    packaging: 'Test Packaging',
  };

  it('should add a product', async () => {
    const addedProduct = await createProduct(product);
    product = addedProduct;
    expect(product.id).not.toBeNull();
  });

  it('should get a product', async () => {
    const fetchedProduct = await getProductById(product.id);
    expect(fetchedProduct).toEqual(product);
  });

  it('should update a product', async () => {
    product.category = 'Updated Category';
    const updatedProduct = await updateProduct(product.id, product);
    product = updatedProduct;
    expect(product.category).toBe('Updated Category');
  });

  it('should delete a product', async () => {
    const deletedProduct = await deleteProduct(product.id);
    expect(deletedProduct).toEqual(product);
  });
});
