import { NextRequest, NextResponse } from "next/server";
import { clear } from "@/core/actions/cart";
import { checkoutProducts } from "@/core/actions/checkout";

export async function POST(request: NextRequest) {
  const { items, userId } = await request.json();
  const { orderId, paymentIntentClientSecret } = await checkoutProducts(
    items,
    userId
  );

  await clear();

  return NextResponse.json({
    orderId,
    paymentIntentClientSecret,
  });
}
