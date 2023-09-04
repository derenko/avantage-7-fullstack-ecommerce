import { remove } from "@/core/actions/cart";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "lucide-react";
import { ArrowButton } from "./arrow-button";
import Image from "next/image";
import { cn } from "@/core/utils";

interface CartPopoverProps {
  cart: Array<Product & { size: string }>;
}

export async function CartPopover({ cart }: CartPopoverProps) {
  const handleRemoveItem = (item: Product & { size: string }) => async () => {
    "use server";

    remove(item.id, Number(item.size));
    revalidatePath("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" asChild>
          <span className="relative cursor-pointer">
            <Badge className="absolute flex justify-center items-center top-0 right-0 p-[5px] w-[20px] h-[20px] rounded-full">
              {cart.length}
            </Badge>
            <ShoppingCart />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn({ "w-[500px]": cart.length })}>
        {cart.length ? (
          <div className="relative">
            <ul
              className="min-w-[180px] px-2 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none rounded-md max-h-[500px] overflow-y-auto z-[2] max-w-[500px] w-full"
              role="menu"
            >
              <div className="flex flex-row items-center justify-between gap-1 pb-4 mb-4 border-b border-zinc-300">
                <h3 className="text-xl font-black pl-2">
                  Total ({cart.length})
                </h3>

                <ArrowButton href="/cart" direction="right">
                  Checkout
                </ArrowButton>
              </div>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${index}`}
                  className="grid grid-cols-5 gap-2 border-b border-zinc-300 pb-3 mb-2 last:border-0 last:pb-0 last:mb-0"
                >
                  <div className="col-span-2">
                    <Image
                      alt={item.name}
                      loading="lazy"
                      width={200}
                      height={200}
                      decoding="async"
                      data-nimg={1}
                      className="w-auto h-auto"
                      src={item.image}
                      style={{ color: "transparent" }}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col justify-between p-1">
                    <div>
                      <p className="text-[14px] hover:underline hover:text-primary ease-in duration-75 cursor-pointer">
                        {item.name}
                      </p>
                      <p className="text-[14px] font-medium">
                        US M {item.size}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <form action={handleRemoveItem(item)}>
                        <button className="rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] bg-primary hover:bg-secondary text-gray-100 py-2 px-6">
                          Remove
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between gap-1 w-full">
            <span className="text-sm font-medium pl-2 w-full text-center">
              Cart is Empty
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
