import React from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold">${product.price.toFixed(2)}</p>
            <div className="mt-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

