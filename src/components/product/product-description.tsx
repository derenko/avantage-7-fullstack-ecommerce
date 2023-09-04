import { Product } from "@prisma/client";
import Image from "next/image";

import { add } from "@/core/actions/cart";
import { ProductSizeSelection } from "./product-size-selection";
import { format } from "@/core/formatters";

interface ProductDescriptionProps {
  product: Product;
  size: string;
}

export function ProductDescription({ product, size }: ProductDescriptionProps) {
  const handleAddToCart = async () => {
    "use server";

    if (size) {
      await add(product, size);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl sm:p-5 px-2 py-5">
        <div className="flex lg:flex-row flex-col justify-around">
          <div className="lg:flex-[0.6] flex flex-col items-center justify-center lg:p-3 p-5">
            <Image
              alt={product.name}
              width={350}
              height={350}
              decoding="async"
              className="h-auto w-auto"
              src={product.image}
            />
          </div>
          <div className="lg:flex-[1] lg:mt-0 mt-10">
            <h2 className="md:text-3xl text-2xl font-black">{product.name}</h2>
            <h3 className="text-xl font-black pt-5 text-primary">
              {format.currency(product.price)}
            </h3>
            <ProductSizeSelection
              sizes={product.sizes}
              onSubmit={handleAddToCart}
            />
          </div>
        </div>
        <div className="pt-5 border-t border-zinc-300">
          <h2 className="text-2xl font-black mb-2">About The Sneaker:</h2>
          <p className="text-[16px]">{product.description}</p>
        </div>
      </div>
      <div className="sm:mx-3 mx-1 px-2 border-b border-zinc-300"></div>
    </>
  );
}
