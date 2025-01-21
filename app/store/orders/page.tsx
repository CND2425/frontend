'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableRow, TableCell, TableHeader, TableBody, TableColumn } from '@nextui-org/react';
import axios from 'axios';

export default function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8003/users/me', { withCredentials: true });
        const userEmail = userResponse.data.email;

        setEmail(userEmail);

        if (!userEmail) {
          console.error('No email found for user');
          return;
        }

        const orderResponse = await axios.get(`http://localhost:8000/orders/me?email=${userEmail}`);
        setOrders(orderResponse.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  if (!orders.length) {
    return <p>{email ? 'No orders found.' : 'Loading orders...'}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Table aria-label="User Orders Table">
        <TableHeader>
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id || order._id}>
              <TableCell>{order.id || order._id}</TableCell>
              <TableCell>${order.total_price.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
