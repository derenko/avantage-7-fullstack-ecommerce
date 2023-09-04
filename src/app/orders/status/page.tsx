import { notFound } from "next/navigation";

import { OrderStatusSection } from "@/components/order";
import { PageProps } from "@/types/page";

export default function OrderStatusPage({ searchParams }: PageProps) {
  const paymentIntent = searchParams?.payment_intent;
  const paymentIntentClientSecret = searchParams?.payment_intent_client_secret;
  const redirectStatus = searchParams?.redirect_status;

  if (
    !paymentIntent ||
    !paymentIntentClientSecret ||
    !redirectStatus ||
    typeof paymentIntent !== "string" ||
    typeof paymentIntentClientSecret !== "string" ||
    typeof redirectStatus !== "string"
  ) {
    return notFound();
  }

  return (
    <OrderStatusSection
      paymentIntent={paymentIntent}
      paymentIntentClientSecret={paymentIntentClientSecret}
    />
  );
}
