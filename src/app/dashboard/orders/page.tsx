// ...existing code...
"use client";
import { useState } from "react";
import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "@/redux/orders/orderApi";

export default function OrdersDashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Orders list (paginated API)
  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetMyOrdersQuery({
      page: 1,
    });

  // Cancel order mutation
  const [cancelOrder, { isLoading: cancelLoading }] = useCancelOrderMutation();

  // Support both shapes: API -> { success:true, data:{ data: [...] , current_page:... } }
  // so items = ordersResponse?.data?.data
  const items = ordersResponse?.data?.data ?? [];
  const pagination = ordersResponse?.data ?? null;

  const handleCancelOrder = async (orderNumber: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelOrder(orderNumber).unwrap();
      alert("Order cancelled!");
      setSelectedOrder(null);
    } catch (err: any) {
      alert(err?.data?.message || "Failed to cancel order.");
    }
  };

  return (
    <div className="tw:max-w-4xl tw:mx-auto tw:p-6">
      <h2 className="tw:text-2xl tw:font-bold tw:mb-6">My Orders</h2>

      {ordersLoading ? (
        <div>Loading orders...</div>
      ) : items.length ? (
        <table className="tw:w-full tw:text-sm tw:mb-4">
          <thead>
            <tr>
              <th>ID #</th>
              <th>Order #</th>
              <th>Course</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((order: any) => (
              <tr key={order.id}>
                <td>
                  <button
                    className="tw:text-blue-600 hover:tw:underline"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    {order.id}
                  </button>
                </td>
                <td>
                  <button
                    className="tw:text-blue-600 hover:tw:underline"
                    onClick={() => setSelectedOrder(order.order_number)}
                  >
                    {order.order_number}
                  </button>
                </td>
                <td>{order.course?.title}</td>
                <td>{order.status}</td>
                <td>৳{order.amount}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                  {order.status === "pending" && (
                    <button
                      className="tw:text-red-600 hover:tw:underline"
                      onClick={() => handleCancelOrder(order.order_number)}
                      disabled={cancelLoading}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found.</div>
      )}

      {pagination && (
        <div className="tw:text-sm tw:text-gray-600">
          Page {pagination.current_page}
          {typeof pagination.total !== "undefined" &&
            ` — Total: ${pagination.total}`}
        </div>
      )}

      {selectedOrder && (
        <div className="tw:mt-4 tw:p-4 tw:bg-gray-50 tw:rounded">
          <strong>Selected order:</strong> {selectedOrder}
        </div>
      )}
    </div>
  );
}
// ...existing code...
