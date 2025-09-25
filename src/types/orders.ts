export interface OrderCourseSummary {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
}

export interface Order {
  id: number;
  order_number: string;
  amount: number;
  discount_amount?: number;
  status: "pending" | "paid" | "cancelled";
  notes?: string;
  created_at: string;
  course: OrderCourseSummary;
}

export interface OrderDetail {
  id: number;
  order_number: string;
  amount: number;
  status: "pending" | "paid" | "cancelled";
  course: OrderCourseSummary;
  enrollment?: any; // Define more specifically if you have enrollment structure
}

export interface PaginatedOrders {
  current_page: number;
  total: number;
  per_page: number;
  data: Order[];
}

export interface OrdersListResponse {
  success: boolean;
  data: PaginatedOrders;
}

export interface OrderCreateResponse {
  success: boolean;
  message: string;
  order_number: string;
  amount: number;
  status: "pending";
}

export interface OrderDetailResponse {
  success: boolean;
  data: OrderDetail;
}

export interface OrderCancelResponse {
  success: boolean;
  message: string;
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  paid_orders: number;
  cancelled_orders: number;
  total_spent: number;
  active_enrollments: number;
}

export interface OrderStatsResponse {
  success: boolean;
  data: OrderStats;
}
