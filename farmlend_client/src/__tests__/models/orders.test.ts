import { createOrder, deleteOrder, getOrderById, updateOrder } from '@/services/orders';
import { Order } from '@/types/order';

describe('Orders', () => {
  let order: Order = {
    id: 1,
    type: 'Test Type',
    referenced_order_id: 2,
    referenced_product_id: 3,
  };

  it('should add an order', async () => {
    const addedOrder = await createOrder(order);
    order = addedOrder;
    expect(order.id).not.toBeNull();
  });

  it('should get an order', async () => {
    const fetchedOrder = await getOrderById(order.id);
    expect(fetchedOrder).toEqual(order);
  });

  it('should update an order', async () => {
    order.type = 'Updated Type';
    const updatedOrder = await updateOrder(order.id, order);
    order = updatedOrder;
    expect(order.type).toBe('Updated Type');
  });

  it('should delete an order', async () => {
    const deletedOrder = await deleteOrder(order.id);
    expect(deletedOrder).toEqual(order);
  });
});
