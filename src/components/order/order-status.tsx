"use client";

import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { CheckCircle2, Clock1, Loader2 } from "lucide-react";

interface OrderStatusSectionProps {
  paymentIntent: string;
  paymentIntentClientSecret: string;
}
export function OrderStatusSection({
  paymentIntent,
  paymentIntentClientSecret,
}: OrderStatusSectionProps) {
  const router = useRouter();
  const { toast } = useToast();

  const getPaymentStatus = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/orders/status/api`,
      {
        method: "POST",
        body: JSON.stringify({
          paymentIntent,
          paymentIntentClientSecret,
        }),
      }
    );

    const order = await response.json();

    if (order && order.id && order.status) {
      if (order.status === Status.Paid) {
        toast({
          title: (
            <span className="flex items-center text-md w-full justify-center">
              <CheckCircle2 className="mr-2 text-green-500" /> Payment
              successful! Thank you!
            </span>
          ),
        });
      } else if (
        order.status === Status.Processing ||
        order.status === Status.Created
      ) {
        toast({
          title: (
            <span className="flex items-center text-md w-full justify-center">
              <Clock1 className="mr-2 text-grey-500" /> Payment successful!
              Thank you!
            </span>
          ),
        });
      } else {
        toast({ variant: "destructive", title: "Payment unsuccessful" });
      }
      router.push("/personal");
    }
  };

  useEffect(() => {
    getPaymentStatus();

    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
      <Loader2 className="animate-spin w-20 h-20 text-primary" />
    </div>
  );
}
