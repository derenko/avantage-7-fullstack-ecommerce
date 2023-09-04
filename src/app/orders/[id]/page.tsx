import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { CheckoutSection } from "@/components/checkout";
import { prisma } from "@/core/db";
import { authOptions } from "@/core/auth";

import type { PageProps } from "@/types/page";

const getOrderCheckout = async (
  orderId: string,
  paymentIntentClientSecret: string,
  userId: string
) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
      stripePaymentClientSecret: paymentIntentClientSecret,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              price: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!order) return;

  return {
    ...order,
    orderItems: order.orderItems.map((item) => ({
      ...item,
      size: item.size.toString(),
    })),
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const orderId = params.id;
  const paymentIntentClientSecret = searchParams.s;

  const session = await getServerSession(authOptions);

  if (!paymentIntentClientSecret || !session) {
    return notFound();
  }

  const order = await getOrderCheckout(
    orderId,
    paymentIntentClientSecret,
    session?.user.id
  );

  if (!order) {
    return notFound();
  }

  return (
    <CheckoutSection
      paymentIntentClientSecret={paymentIntentClientSecret}
      order={order}
    />
  );
}
