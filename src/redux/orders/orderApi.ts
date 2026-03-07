import {
  OrderCancelResponse,
  OrderCreateResponse,
  OrderDetailResponse,
  OrderStatsResponse,
  PaginatedOrders,
} from "@/types/orders";
import { apiSlice } from "../api/apiSlice";

interface CouponCheckResponse {
  success: boolean;
  message?: string;
  coupon_code?: string;
  discount_type?: string;
  discount_value?: number;
  original_price?: number;
  discount_amount?: number;
  final_price?: number;
  final_amount?: number; // Added to match API response
  course_price?: number; // Added to match API response
}

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Check coupon validity
    checkCoupon: builder.query<
      CouponCheckResponse,
      { slug: string; coupon_code: string }
    >({
      query: ({ slug, coupon_code }) => ({
        url: `/coupons/check/${slug}?coupon_code=${coupon_code}`,
        method: "GET",
      }),
    }),

    // Create a new order for a course
    createOrder: builder.mutation<
      OrderCreateResponse,
      { slug: string; notes?: string; coupon_code?: string }
    >({
      query: ({ slug, notes, coupon_code }) => ({
        url: `/orders/create/${slug}`,
        method: "POST",
        body: { notes, coupon_code },
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
  useCheckCouponQuery,
  useLazyCheckCouponQuery,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailQuery,
  useCancelOrderMutation,
  useGetOrderStatsQuery,
} = orderApi;
