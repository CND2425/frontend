'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from '@nextui-org/react';
import axios from 'axios';

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Fetch products on mount
  useEffect(() => {
    axios
      .get('http://localhost:8001/products/')
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Fetch logged-in user data
  useEffect(() => {
    axios
      .get('http://localhost:8003/users/me', { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleAddToCart = async (product: any) => {
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }

    try {
      const orderPayload = {
        customer_name: user.email, // Verwende die E-Mail-Adresse des Benutzers
        items: [
          {
            product_id: product.id,
            quantity: 1,
            price: product.price,
          },
        ],
        total_price: product.price,
        status: 'pending',
      };

      const response = await axios.post('http://localhost:8000/orders/', orderPayload, {
        withCredentials: true,
      });

      alert(`Order created successfully for ${product.name}`);
      window.location.reload(); // Reload page to fetch updated product quantities
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while creating the order. Please try again.');
    }
  };

  return (
    <Table aria-label="Products Table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>DESCRIPTION</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>QUANTITY</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>{product.stock_quantity}</TableCell>
            <TableCell>
              <Tooltip content={product.stock_quantity === 0 ? "Out of stock" : "Add to Cart"}>
                <span
                  style={{
                    cursor: product.stock_quantity === 0 ? 'not-allowed' : 'pointer',
                    opacity: product.stock_quantity === 0 ? 0.5 : 1,
                  }}
                  onClick={() => product.stock_quantity > 0 && handleAddToCart(product)}
                >
                  🛒
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
