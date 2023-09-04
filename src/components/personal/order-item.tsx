import { Order, OrderItem } from "@prisma/client";
import Link from "next/link";

import { format } from "@/core/formatters";
import { OrderItemStatus } from "./order-item-status";
import { ArrowButton } from "@/components/global";

export function OrderItem({
  order,
}: {
  order: Order & { orderItems: OrderItem[] };
}) {
  const getUpdatedDate = () => {
    if (order.updatedAt) {
      return format.date(order.updatedAt);
    }
  };

  return (
    <div className="p-4 md:mx-0 mx-2 border border-zinc-300 mt-2 rounded-md shadow-md grid md:grid-cols-4 grid-cols-2">
      <div className="grid-cols-1">
        <p className="text-sm mb-2">
          Order
          <Link
            href={`/personal/${order.id}`}
            className="ml-2 cursor-pointer hover:underline hover:text-primary ease-in duration-150"
          >
            {order.id}
          </Link>
        </p>
        <p className="text-[16px] font-bold">
          {order.orderItems.length} Item(s)
        </p>
      </div>
      <div className="md:flex hidden flex-row items-center justify-center">
        <p className="text-sm">Updated at {getUpdatedDate()}</p>
      </div>
      <div className="grid-cols-1 flex flex-row items-center md:justify-center justify-end">
        <OrderItemStatus status={order.status} />
      </div>
      <div className="grid-cols-1 md:flex hidden items-center justify-end">
        <ArrowButton direction="right" href={`/personal/${order.id}`}>
          View
        </ArrowButton>
      </div>
    </div>
  );
}
