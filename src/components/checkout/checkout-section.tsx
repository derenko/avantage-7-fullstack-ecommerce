"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Order, OrderItem, Product } from "@prisma/client";

import { getClientStripe } from "@/core/clients/stripe-client";
import { CheckoutForm } from "@/components/payment/payment-form";
import { format } from "@/core/formatters";

import { CheckoutItem } from "./checkout-item";

interface CheckoutSectionProps {
  paymentIntentClientSecret: string;
  order: Order & { orderItems: (OrderItem & { product: Product })[] };
}
export function CheckoutSection({
  paymentIntentClientSecret,
  order,
}: CheckoutSectionProps) {
  const stripeClientPromise = getClientStripe();

  const { orderItems } = order;
  const total = orderItems.reduce(
    (total, item) => total + item.product.price,
    0
  );

  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="grid-cols-1 md:block hidden md:py-20 px-4">
        <h2 className="text-2xl font-black mb-4">
          Your Cart ({orderItems.length}):
        </h2>
        {orderItems.map((item) => (
          <CheckoutItem
            product={{ ...item.product, size: item.size }}
            key={item.id}
          />
        ))}
        <div className="border-t border-zinc-300 my-5" />
        <div className="w-full flex flex-col items-end">
          <p className="font-medium mb-2">Your Total</p>
          <h2 className="text-4xl font-black mb-4 text-primary">
            {format.currency(total)}
          </h2>
        </div>
      </div>
      <div className="grid-cols-1">
        {paymentIntentClientSecret && (
          <Elements
            options={{
              appearance: {
                theme: "flat",
              },
              clientSecret: paymentIntentClientSecret,
            }}
            stripe={stripeClientPromise}
          >
            <CheckoutForm clientSecret={paymentIntentClientSecret} />
          </Elements>
        )}
      </div>
    </div>
  );
}
