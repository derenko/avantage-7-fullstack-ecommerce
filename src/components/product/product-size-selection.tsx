"use client";

import { CheckCircle2 } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/core/utils";
import { AddToCartButton } from "./add-to-cart-button";

interface Props {
  sizes: number[];
  onSubmit: () => void;
}

export const ProductSizeSelection: React.FC<Props> = ({ sizes, onSubmit }) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const selectedSize = Number(searchParams?.get("size"));

  const handleSubmit = async () => {
    toast({
      title: (
        <span className="flex items-center text-md w-full justify-center">
          <CheckCircle2 className="mr-2 text-green-500" /> Added To Cart!
        </span>
      ),
    });

    router.replace(pathname);
  };

  const handleSelectSize = (size: number) => {
    startTransition(() => {
      router.replace(pathname + "?" + `size=${size}`);
    });
  };

  return (
    <div className="pt-3">
      <p className="text-[16px]">Select Size:</p>
      <div className="flex flex-row flex-wrap gap-1 pt-2 pb-5">
        {sizes.map((size: number) => (
          <button
            key={size}
            onClick={() => handleSelectSize(size)}
            disabled={isPending}
            className={cn(
              "cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75",
              {
                "cursor-pointer border border-zinc-300 hover:border-zinc-800 p-2 ease-in duration-75 bg-zinc-700 text-white hover:text-white":
                  selectedSize === size,
              },
              { "cursor-not-allowed": isPending, "opacity-50": isPending }
            )}
          >
            US M {size}
          </button>
        ))}
      </div>
      <form action={onSubmit} onSubmit={handleSubmit}>
        <AddToCartButton />
      </form>
    </div>
  );
};
