import Image from "next/image";

import { format } from "@/core/formatters";
import { Product } from "@prisma/client";

interface CheckoutItemProps {
  product: Product & { size: number };
}

export function CheckoutItem({ product }: CheckoutItemProps) {
  return (
    <div className="p-4 border border-zinc-300 grid sm:grid-cols-4 grid-cols-3 mt-2 gap-2">
      <div className="col-span-1">
        <Image
          alt={product.name}
          loading="lazy"
          width={150}
          height={150}
          decoding="async"
          data-nimg={1}
          className="w-auto h-auto"
          src={product.image}
          style={{ color: "transparent" }}
        />
      </div>
      <div className="sm:col-span-3 col-span-2">
        <p className="sm:text-lg text-[16px] font-black ease-in duration-75 hover:underline hover:text-primary cursor-pointer">
          {product.name}
        </p>
        <p className="text-[14px] font-medium">US M {product.size}</p>
        <p className="text-md font-bold text-primary">
          {format.currency(product.price)}
        </p>
      </div>
    </div>
  );
}
