// ...existing code...
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "@/redux/orders/orderApi";
import {
  HiOutlineClipboardList,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineInformationCircle,
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiOutlineDuplicate,
} from "react-icons/hi";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const configs: Record<string, { color: string; icon: any; label: string }> = {
    paid: {
      color: "tw:bg-emerald-50 tw:text-emerald-700 tw:border-emerald-100",
      icon: HiCheckCircle,
      label: "Success",
    },
    pending: {
      color: "tw:bg-amber-50 tw:text-amber-700 tw:border-amber-100",
      icon: HiClock,
      label: "Pending",
    },
    cancelled: {
      color: "tw:bg-rose-50 tw:text-rose-700 tw:border-rose-100",
      icon: HiXCircle,
      label: "Cancelled",
    },
  };

  const config = configs[status.toLowerCase()] || {
    color: "tw:bg-gray-50 tw:text-gray-600 tw:border-gray-200",
    icon: HiOutlineInformationCircle,
    label: status,
  };

  const Icon = config.icon;

  return (
    <span
      className={`tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1 tw:rounded-full tw:text-xs tw:font-bold tw:border ${config.color}`}
    >
      <Icon className="tw:w-3.5 tw:h-3.5" />
      {config.label}
    </span>
  );
};

export default function OrdersDashboardPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Orders list (paginated API)
  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetMyOrdersQuery({
      page: 1,
    });

  // Cancel order mutation
  const [cancelOrder, { isLoading: cancelLoading }] = useCancelOrderMutation();

  const items = ordersResponse?.data?.data ?? [];
  const pagination = ordersResponse?.data ?? null;

  const handleCancelOrder = async (orderNumber: string) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelOrder(orderNumber).unwrap();
      toast.success("Order cancelled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel order");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(String(text));
    toast.success("ID copied to clipboard!", {
      duration: 1500,
      position: "bottom-center",
      style: {
        fontSize: "14px",
        padding: "10px 16px",
        borderRadius: "12px",
        fontWeight: "bold",
      },
    });
  };

  const formatPrice = (amount: string | number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(Number(amount))
      .replace("BDT", "৳");
  };

  return (
    <div className="tw:max-w-4xl tw:mx-auto tw:p-4 md:tw:p-6 tw:min-h-screen">
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-8">
        <div>
          <h1 className="tw:text-2xl md:tw:text-3xl tw:font-black tw:text-gray-900 tw:tracking-tight">
            My Orders
          </h1>
          <p className="tw:text-sm tw:text-gray-500 tw:mt-1">
            Detailed history of your course purchases
          </p>
        </div>
        {pagination && pagination.total > 0 && (
          <div className="tw:bg-blue-50/50 tw:text-blue-700 tw:px-4 tw:py-1.5 tw:rounded-xl tw:text-sm tw:font-bold tw:border tw:border-blue-100">
            {pagination.total} Total
          </div>
        )}
      </div>

      {ordersLoading ? (
        <div className="tw:grid tw:gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="tw:h-32 tw:bg-gray-50 tw:rounded-2xl tw:animate-pulse"
            />
          ))}
        </div>
      ) : items.length ? (
        <motion.div layout className="tw:grid tw:gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((order: any, index: number) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="tw:group tw:bg-white tw:rounded-2xl tw:border tw:border-gray-100 tw:shadow-sm tw:hover:shadow-md tw:hover:border-blue-100 tw:transition-all tw:overflow-hidden"
              >
                <div className="tw:p-4 md:tw:p-5">
                  <div className="tw:flex tw:flex-col sm:tw:flex-row tw:gap-5">
                    {/* Thumbnail */}
                    <div className="tw:relative tw:w-full sm:tw:w-32 tw:h-24 tw:shrink-0 tw:rounded-xl tw:overflow-hidden tw:bg-gray-50 tw:border tw:border-gray-50">
                      {order.course?.thumbnail ? (
                        <Image
                          src={order.course.thumbnail}
                          alt={order.course.title}
                          fill
                          className="tw:object-cover"
                        />
                      ) : (
                        <div className="tw:w-full tw:h-full tw:flex tw:items-center tw:justify-center">
                          <HiOutlineClipboardList className="tw:w-8 tw:h-8 tw:text-gray-200" />
                        </div>
                      )}
                    </div>

                    {/* Main Content */}
                    <div className="tw:flex-grow tw:min-w-0">
                      <div className="tw:flex tw:justify-between tw:items-start tw:gap-3 tw:mb-2">
                        <h3 className="tw:text-base md:tw:text-lg tw:font-extrabold tw:text-gray-900 tw:line-clamp-1 tw:group-hover:text-blue-600 tw:transition-colors">
                          {order.course?.title || "Course Name"}
                        </h3>
                        <div className="tw:flex tw:shrink-0">
                          <StatusBadge status={order.status} />
                        </div>
                      </div>

                      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-4 tw:gap-y-2 tw:mb-4">
                        <div className="tw:flex tw:items-center tw:gap-2">
                          <span className="tw:text-gray-400 tw:text-xs tw:font-bold">
                            ID:
                          </span>
                          <span className="tw:text-sm tw:font-black tw:text-blue-600">
                            #{order.id}
                          </span>
                          <button
                            onClick={() => copyToClipboard(order.id)}
                            className="tw:p-1.5 tw:text-gray-400 tw:hover:text-blue-600 tw:bg-gray-50 tw:rounded-lg tw:transition-colors"
                            title="Copy ID"
                          >
                            <HiOutlineDuplicate className="tw:w-4 tw:h-4" />
                          </button>
                        </div>
                        <div className="tw:h-4 tw:w-[1px] tw:bg-gray-200 tw:hidden md:tw:block" />
                        <div className="tw:flex tw:items-center tw:gap-1.5">
                          <span className="tw:text-gray-400 tw:text-xs tw:font-bold">
                            Order #:
                          </span>
                          <span className="tw:text-sm tw:font-mono tw:text-gray-700">
                            {order.order_number}
                          </span>
                        </div>
                      </div>

                      <div className="tw:grid tw:grid-cols-2 md:tw:grid-cols-4 tw:gap-4 md:tw:items-end">
                        <div className="tw:space-y-0.5">
                          <span className="tw:text-[11px] tw:uppercase tw:font-black tw:text-gray-400 tw:tracking-wider">
                            Total Amount
                          </span>
                          <p className="tw:text-lg tw:font-black tw:text-gray-900">
                            {formatPrice(order.final_amount)}
                          </p>
                        </div>
                        <div className="tw:space-y-0.5">
                          <span className="tw:text-[11px] tw:uppercase tw:font-black tw:text-gray-400 tw:tracking-wider">
                            Date
                          </span>
                          <p className="tw:text-sm tw:font-bold tw:text-gray-700 tw:flex tw:items-center tw:gap-1.5">
                            <HiOutlineCalendar className="tw:w-4 tw:h-4 tw:text-gray-400" />
                            {new Date(order.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <div className="tw:space-y-0.5 tw:hidden md:tw:block">
                          <span className="tw:text-[11px] tw:uppercase tw:font-black tw:text-gray-400 tw:tracking-wider">
                            Status
                          </span>
                          <p className="tw:text-sm tw:font-bold tw:text-gray-600 tw:capitalize">
                            {order.status}
                          </p>
                        </div>
                        <div className="tw:flex tw:justify-end md:tw:justify-start">
                          <button
                            onClick={() =>
                              setExpandedOrder(
                                expandedOrder === order.id ? null : order.id,
                              )
                            }
                            className="tw:text-xs tw:font-bold tw:px-4 tw:py-2 tw:bg-blue-50 tw:text-blue-600 tw:rounded-xl tw:hover:tw:bg-blue-100 tw:transition-colors tw:flex tw:items-center tw:gap-2"
                          >
                            {expandedOrder === order.id ? (
                              <HiXCircle className="tw:w-4 tw:h-4" />
                            ) : (
                              <HiOutlineInformationCircle className="tw:w-4 tw:h-4" />
                            )}
                            {expandedOrder === order.id
                              ? "Hide details"
                              : "More Details"}
                          </button>
                        </div>
                      </div>

                      {/* Details Area */}
                      <AnimatePresence>
                        {expandedOrder === order.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="tw:overflow-hidden"
                          >
                            <div className="tw:pt-5 tw:mt-5 tw:border-t tw:border-gray-100">
                              <div className="tw:grid md:tw:grid-cols-2 tw:gap-8">
                                {/* Pricing List */}
                                <div className="tw:space-y-4">
                                  <h4 className="tw:text-xs tw:font-black tw:text-gray-400 tw:uppercase tw:tracking-widest">
                                    Pricing Summary
                                  </h4>
                                  <div className="tw:space-y-2.5">
                                    <div className="tw:flex tw:justify-between tw:text-sm">
                                      <span className="tw:text-gray-500 tw:font-medium">
                                        Original Price
                                      </span>
                                      <span className="tw:text-gray-900 tw:font-bold">
                                        {formatPrice(order.amount)}
                                      </span>
                                    </div>
                                    <div className="tw:flex tw:justify-between tw:text-sm">
                                      <span className="tw:text-gray-500 tw:font-medium">
                                        Course Discount
                                      </span>
                                      <span className="tw:text-emerald-600 tw:font-bold">
                                        -{formatPrice(order.discount_amount)}
                                      </span>
                                    </div>
                                    {order.coupon_code && (
                                      <div className="tw:flex tw:justify-between tw:text-sm">
                                        <div className="tw:flex tw:items-center tw:gap-1.5">
                                          <HiOutlineTag className="tw:w-4 tw:h-4 tw:text-emerald-500" />
                                          <span className="tw:text-gray-500 tw:font-medium">
                                            Coupon ({order.coupon_code})
                                          </span>
                                        </div>
                                        <span className="tw:text-emerald-600 tw:font-bold">
                                          -{formatPrice(order.coupon_discount)}
                                        </span>
                                      </div>
                                    )}
                                    <div className="tw:flex tw:justify-between tw:text-base tw:font-black tw:pt-3 tw:border-t tw:border-gray-50">
                                      <span className="tw:text-gray-900">
                                        Amount Paid
                                      </span>
                                      <span className="tw:text-blue-600">
                                        {formatPrice(order.final_amount)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Notes section */}
                                <div className="tw:space-y-4">
                                  <h4 className="tw:text-xs tw:font-black tw:text-gray-400 tw:uppercase tw:tracking-widest">
                                    Order Notes
                                  </h4>
                                  {order.notes ? (
                                    <div className="tw:bg-gray-50 tw:p-4 tw:rounded-2xl tw:text-sm tw:text-gray-600 tw:italic tw:leading-relaxed tw:border tw:border-gray-100">
                                      "{order.notes}"
                                    </div>
                                  ) : (
                                    <p className="tw:text-sm tw:text-gray-400">
                                      No additional notes for this order.
                                    </p>
                                  )}

                                  {/* Internal Actions */}
                                  {order.status === "pending" && (
                                    <div className="tw:pt-2">
                                      <button
                                        onClick={() =>
                                          handleCancelOrder(order.order_number)
                                        }
                                        disabled={cancelLoading}
                                        className="tw:w-full tw:py-3 tw:text-sm tw:font-black tw:text-rose-600 tw:bg-rose-50 tw:rounded-xl tw:border tw:border-rose-100 tw:hover:tw:bg-rose-100 tw:transition-all tw:flex tw:items-center tw:justify-center tw:gap-2"
                                      >
                                        <HiXCircle className="tw:w-5 tw:h-5" />
                                        Cancel This Order
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="tw:text-center tw:py-16 tw:bg-white tw:rounded-3xl tw:border tw:border-dashed tw:border-gray-200">
          <HiOutlineClipboardList className="tw:w-12 tw:h-12 tw:text-gray-200 tw:mx-auto tw:mb-4" />
          <h2 className="tw:text-xl tw:font-black tw:text-gray-900">
            No orders found
          </h2>
          <p className="tw:text-gray-500 tw:mb-6">
            You haven't made any purchases yet.
          </p>
          <button className="tw:px-8 tw:py-3 tw:bg-blue-600 tw:text-white tw:font-bold tw:rounded-xl tw:hover:tw:bg-blue-700 tw:transition-colors">
            Explore Courses
          </button>
        </div>
      )}

      {pagination && items.length > 0 && (
        <div className="tw:mt-10 tw:text-center">
          <p className="tw:text-sm tw:text-gray-400 tw:font-bold">
            Page {pagination.current_page} of {pagination.last_page} — Total{" "}
            {pagination.total} Orders
          </p>
        </div>
      )}
    </div>
  );
}

// ...existing code...
