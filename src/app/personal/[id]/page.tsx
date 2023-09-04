import { notFound } from "next/navigation";

import { BackButton } from "@/components/global";
import { OrderInformation, OrderProduct } from "@/components/personal";
import { prisma } from "@/core/db";
import { PageProps } from "@/types/page";

export default async function Page({ params }: PageProps) {
  const id = params.id;

  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return notFound();
  }

  return (
    <>
      <BackButton href="/personal" />
      <div className="mx-auto max-w-6xl w-full my-10 px-4">
        <OrderInformation order={order} />
        {order.orderItems.map((item) => (
          <OrderProduct
            key={item.id}
            product={{ ...item.product, size: item.size }}
          />
        ))}
      </div>
    </>
  );
}
