import {
  OrderCancelResponse,
  OrderCreateResponse,
  OrderDetailResponse,
  OrderStatsResponse,
  PaginatedOrders,
} from "@/types/orders";
import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order for a course
    createOrder: builder.mutation<
      OrderCreateResponse,
      { slug: string; notes?: string }
    >({
      query: ({ slug, notes }) => ({
        url: `/orders/create/${slug}`,
        method: "POST",
        body: { notes },
      }),
    }),

    // Get current user's orders
    getMyOrders: builder.query<any, any>({
      query: ({ status, page }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        return {
          url: `/orders/my-orders?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    // Get specific order details
    getOrderDetail: builder.query<OrderDetailResponse, string>({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}`,
        method: "GET",
      }),
    }),

    // Cancel a pending order
    cancelOrder: builder.mutation<OrderCancelResponse, string>({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}/cancel`,
        method: "POST",
      }),
    }),

    // Get user's order statistics
    getOrderStats: builder.query<OrderStatsResponse, void>({
      query: () => ({
        url: `/orders/stats`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useGetOrderStatsQuery,
} = orderApi;
