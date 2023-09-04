"use client";

import { Loader2, PlusCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { cn } from "@/core/utils";

export function AddToCartButton() {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const isDisabled = !searchParams?.get("size") || pending;

  return (
    <button
      type="submit"
      className={cn(
        "rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] bg-zinc-700 text-gray-100 py-3 px-6 mb-5",
        { "hover:bg-zinc-900": !isDisabled },
        { "cursor-not-allowed": isDisabled }
      )}
      disabled={isDisabled}
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 h-4 w-4" />
      )}
      Add to Cart
    </button>
  );
}
