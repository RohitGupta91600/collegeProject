import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: token },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleAddProduct = async (product: Omit<Product, '_id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', product, {
        headers: { Authorization: token },
      });
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Omit<Product, '_id'>) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
        headers: { Authorization: token },
      });
      setProducts(products.map(p => p._id === id ? response.data : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <button
        onClick={logout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <ProductForm
        onSubmit={editingProduct ? handleUpdateProduct.bind(null, editingProduct._id) : handleAddProduct}
        initialData={editingProduct}
      />
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default Dashboard;

