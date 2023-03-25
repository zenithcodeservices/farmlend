import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useRouter } from 'next/router';
import styles from '../styles/Products.module.css'

type ProductsTabProps = {};

const ProductsTab: React.FC<ProductsTabProps> = (props: ProductsTabProps) => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    if (response.ok) {
      const products = await response.json();
      setProducts(products);
    }
  };

  const createProduct = async (data: Product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const product = await response.json();
      setProducts([...products, product]);
    }
  };

  const updateProduct = async (id: number, data: Product) => {
    const response = await fetch(`/api/products?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const product = await response.json();
      const updatedProducts = products.map((p) => (p.id === product.id ? product : p));
      setProducts(updatedProducts);
    }
  };

  const deleteProduct = async (id: number) => {
    const response = await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const deletedProduct = await response.json();
      const updatedProducts = products.filter((p) => p.id !== deletedProduct.id);
      setProducts(updatedProducts);
    }
  };

  const handleCreate = async () => {
    const category = prompt('Enter category:');
    const variety = prompt('Enter variety:');
    const packaging = prompt('Enter packaging:');
    if (category && variety && packaging) {
      const newProduct = { category, variety, packaging } as Product;
      await createProduct(newProduct);
    }
  };


  const handleEdit = async (product: Product) => {
    const category = prompt('Enter category:', product.category);
    const variety = prompt('Enter variety:', product.variety);
    const packaging = prompt('Enter packaging:', product.packaging);
    if (category && variety && packaging) {
      const updatedProduct = { ...product, category, variety, packaging };
      await updateProduct(updatedProduct.id, updatedProduct);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr className={styles.minWidth}>
            <th>ID</th>
            <th>Category</th>
            <th>Variety</th>
            <th>Packaging</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className={styles.minWidth} key={product.id}>
              <td>{product.id}</td>
              <td>{product.category}</td>
              <td>{product.variety}</td>
              <td>{product.packaging}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleCreate()}>New Product</button>
    </div>
  );
};

export default ProductsTab;
