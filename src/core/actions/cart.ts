"use server";

import { prisma } from "@/core/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type CartProduct = { size: string } & Pick<Product, "id" | "name" | "image">;

export async function get() {
  "use server";

  const store = cookies();
  const cart = store.get("cart");
  const parsed = JSON.parse(cart ? cart.value : "[]") as CartProduct[];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: parsed.map((product) => product.id),
      },
    },
  });

  return parsed.map((p) => ({
    size: Number(p.size),
    ...products.find((product) => p.id === product.id),
  }));
}

export async function add(product: Omit<CartProduct, "size">, size: string) {
  "use server";

  const store = cookies();
  const cart = store.get("cart");

  const { id, name, image } = product;

  if (cart) {
    const items = JSON.parse(cart.value) as CartProduct[];
    store.set({
      name: "cart",
      value: JSON.stringify([{ id, name, image, size }, ...items]),
      httpOnly: true,
    });
  } else {
    store.set({
      name: "cart",
      value: JSON.stringify([{ id, name, image, size }]),
      httpOnly: true,
    });
  }

  revalidatePath("/");
}

export async function remove(id: CartProduct["id"], size: number) {
  "use server";

  const store = cookies();
  const cart = store.get("cart");

  if (cart) {
    const items = JSON.parse(cart.value) as CartProduct[];
    const index = items.findIndex(
      (item) => item.id === id && item.size === size.toString()
    );
    items.splice(index, 1);
    store.set("cart", JSON.stringify(items));
    console.log(items);
    revalidatePath("/cart");
  }
}

export async function clear() {
  "use server";

  const store = cookies();
  store.set("cart", JSON.stringify([]));

  revalidatePath("/");
}
