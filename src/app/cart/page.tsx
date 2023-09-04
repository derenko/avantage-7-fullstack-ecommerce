import { BackButton } from "@/components/global/back-button";
import { CartItem, CartActions } from "@/components/cart";
import { get } from "@/core/actions/cart";
import { format } from "@/core/formatters";

export default async function Page() {
  const products = await get();
  const total = products.reduce(
    (total, product) => (product.price ?? 0) + total,
    0
  );

  return (
    <>
      <BackButton href="/" />
      <div className="mx-auto max-w-4xl w-full py-4 sm:px-0 px-2">
        <h2 className="text-2xl font-black mb-4">
          Your Cart ({products.length}):
        </h2>
        {products.map((product) => (
          <CartItem product={product} key={`${product.id} + ${product.size}`} />
        ))}
        <div className="w-full flex flex-col items-end my-10">
          <p className="font-medium mb-2">Your Total</p>
          <h2 className="text-4xl font-black mb-4">{format.currency(total)}</h2>
          <CartActions products={products} />
        </div>
      </div>
    </>
  );
}
