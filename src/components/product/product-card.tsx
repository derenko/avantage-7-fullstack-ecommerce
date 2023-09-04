import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";

import { format } from "@/core/formatters";

interface ProductCardProps {
  product: Product & { _count?: { orderItems?: number } };
}

export function ProductCard({ product }: ProductCardProps) {
  const isVisibleSoldCount = typeof product?._count?.orderItems === "number";

  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="group border-zinc-300 hover:border-primary p-2 border border-zinc-300 ease-in duration-150 flex flex-col"
    >
      <div className="mb-4 flex flex-row items-center justify-center h-32">
        <Image
          alt={product.name}
          loading="lazy"
          width={200}
          height={200}
          decoding="async"
          data-nimg={1}
          className="h-auto w-auto"
          src={product.image}
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <span className="text-sm cursor-pointer group-hover:underline group-hover:text-primary ease-in duration-150">
          {product.name}
        </span>
        <div className="text-end mt-2">
          {isVisibleSoldCount && (
            <p className="text-zinc-500 text-sm">
              {product._count?.orderItems} sold
            </p>
          )}
          <p className="font-medium">{format.currency(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
