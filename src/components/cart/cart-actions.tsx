"use client";

import { useToast } from "@/components/ui/use-toast";
import { Product } from "@prisma/client";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartActionsProps {
  products: (Product & { size: number })[];
}

export function CartActions({ products }: CartActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();

  const handleClickCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/cart/api`, {
        method: "POST",
        body: JSON.stringify({
          items: products.map((product) => ({
            id: product.id,
            size: product.size,
          })),
          userId: data?.user.id,
        }),
      });

      const { paymentIntentClientSecret, orderId } = await response.json();

      if (!paymentIntentClientSecret || !orderId) {
        toast({ title: "There's an error occured with the payment system" });
        return router.push("/user");
      }

      router.push(`/orders/${orderId}?s=${paymentIntentClientSecret}`);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Link
        href="/products"
        className="rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] border border-zinc-300 hover:bg-zinc-200 text-zinc-600 px-6 py-3"
      >
        Continue Shopping
      </Link>
      <button
        onClick={handleClickCheckout}
        className="rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] bg-zinc-700 hover:bg-zinc-900 text-gray-100 px-6 py-3"
        disabled={
          status === "loading" || status === "unauthenticated" || isLoading
        }
      >
        Checkout
        {isLoading ? (
          <Loader2 className="ml-2 animate-spin" />
        ) : (
          <ArrowRight className="ml-2" />
        )}
      </button>
    </div>
  );
}
