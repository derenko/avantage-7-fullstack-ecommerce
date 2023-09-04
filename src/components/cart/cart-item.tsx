import { remove } from "@/core/actions/cart";
import { format } from "@/core/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  product: Product & { size: number };
}

export async function CartItem({ product }: CartItemProps) {
  const handleRemoveFromCart = async () => {
    "use server";

    remove(product.id, product.size);
  };

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
        <Link
          href={`/products/${product.id}`}
          className="sm:text-lg text-[16px] font-black ease-in duration-75 hover:underline hover:text-primary cursor-pointer"
        >
          {product.name}
        </Link>
        <p className="text-[14px] font-medium">US M {product.size}</p>
        <p className="text-md font-bold text-primary">
          {format.currency(product.price)}
        </p>
        <div className="flex justify-end">
          <form action={handleRemoveFromCart}>
            <button
              type="submit"
              className="rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] bg-primary hover:bg-secondary text-gray-100 py-2 px-6"
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
