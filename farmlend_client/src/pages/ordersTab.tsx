import React, { useState } from 'react';
import { Order } from '@/types/order';
import { useRouter } from 'next/router';
import styles from '../styles/Orders.module.css'

type OrdersTabProps = {};

const OrdersTab: React.FC<OrdersTabProps> = (props: OrdersTabProps) => {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch('/api/orders');
    if (response.ok) {
      const orders = await response.json();
      setOrders(orders);
    }
  };

  const createOrder = async (data: Order) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const order = await response.json();
      setOrders([...orders, order]);
    }
  };

  const updateOrder = async (id: number, data: Order) => {
    const response = await fetch(`/api/orders?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const order = await response.json();
      const updatedOrders = orders.map((o) => (o.id === order.id ? order : o));
      setOrders(updatedOrders);
    }
  };

  const deleteOrder = async (id: number) => {
    const response = await fetch(`/api/orders?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const deletedOrder = await response.json();
      const updatedOrders = orders.filter((o) => o.id !== deletedOrder.id);
      setOrders(updatedOrders);
    }
  };


  const handleCreate = async () => {
    const type = prompt('Enter type:');
    if (type) {
      const newOrder = { type } as Order;
      await createOrder(newOrder);
    }
  };

  const handleEdit = async (order: Order) => {
    const type = prompt('Enter type:', order.type);
    if (type) {
      const updatedOrder = { ...order, type };
      await updateOrder(updatedOrder.id, updatedOrder);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr className={styles.minWidth}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className={styles.minWidth} key={order.id}>
              <td>{order.id}</td>
              <td>{order.type}</td>
              <td>
                <button onClick={() => handleEdit(order)}>Edit</button>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleCreate()}>New Order</button>
    </div>
  );
};

export default OrdersTab;
