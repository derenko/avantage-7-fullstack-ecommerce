import { format } from "@/core/formatters";
import { Order, OrderItem, Product } from "@prisma/client";
import { OrderItemStatus } from "./order-item-status";

export function OrderInformation({
  order,
}: {
  order: Order & { orderItems: (OrderItem & { product: Product })[] };
}) {
  const total = order.orderItems.reduce(
    (total, current) => total + current.product.price,
    0
  );

  return (
    <div className="flex flex-row items-center justify-between pb-4 mb-4 border-b border-zinc-300">
      <div>
        <p className="text-sm">Order {order.id}</p>
        <h2 className="text-4xl font-black my-4 text-primary">
          {format.currency(total)}
        </h2>
        <p className="text-14px font-bold">{order.orderItems.length} Item(s)</p>
        <p className="text-sm">Updated at {format.date(order.updatedAt)}</p>
      </div>
      <OrderItemStatus status={order.status} />
    </div>
  );
}
