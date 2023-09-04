"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data, status } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast({ title: "Payment succeeded!" });
          return router.push("/personal");
        case "processing":
          return toast({ title: "Your payment is processing." });
        default:
          return;
      }
    });
    // eslint-disable-next-line
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsPaying(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"
        }/orders/status`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast({ title: error.message ?? "The payment was unsuccessful" });
      } else {
        toast({ title: "The payment was unsuccessful" });
      }
    }
    setIsPaying(false);
  };

  if (status === "loading") {
    return null;
  }

  if (!data?.user?.email) {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 md:order-none order-last mb-2 sm:sticky sm:top-[120px] static">
      <div className="md:py-20">
        <div className="p-6 border border-zinc-300 z-0 ">
          <p className="text-[16px] mb-2 text-red-700">
            <span className="font-bold">4242 4242 4242 4242</span>
          </p>
          <p className="text-[16px] mb-2 text-red-700">
            <span className="font-bold">07/40</span>
          </p>
          <p className="text-[16px] mb-2 text-red-700">
            <span className="font-bold">424</span>
          </p>
          <h2 className="text-2xl font-black mb-4">Proceed:</h2>
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              options={{
                defaultValues: {
                  email: data.user.email,
                },
              }}
            />
            <PaymentElement
              id="payment-element"
              options={{
                layout: "tabs",
                defaultValues: {
                  billingDetails: {
                    name: data.user.name ?? data.user.email,
                    email: data.user.email,
                  },
                },
              }}
            />
            <Button
              className="mt-4 py-3 w-full"
              disabled={isPaying || !stripe || !elements}
              id="submit"
            >
              Pay Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
