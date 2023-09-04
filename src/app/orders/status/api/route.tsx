import { prisma } from "@/core/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/core/helpers";

export async function POST(request: NextRequest) {
  const user = await getServerUser();

  const body = await request.json();

  if (!user) {
    return;
  }

  const order = await prisma.order.findFirst({
    where: {
      userId: user.id,
      stripePaymentIntentId: body.paymentIntent,
      stripePaymentClientSecret: body.paymentIntentClientSecret,
    },
    select: {
      status: true,
      id: true,
      orderItems: {
        select: {
          productId: true,
          size: true,
        },
      },
    },
  });

  if (!order) return;

  return NextResponse.json({
    ...order,
    orderItems: order.orderItems.map((item) => ({
      productId: item.productId,
      size: item.size.toString(),
    })),
  });
}
