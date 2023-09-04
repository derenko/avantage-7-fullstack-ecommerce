import { ArrowButton } from "@/components/global/arrow-button";
import { ProductCard } from "@/components/product/product-card";
import { prisma } from "@/core/db";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Avantage 7",
  description: "",
};

const TopProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      deleted: false,
    },
    take: 12,
    orderBy: {
      price: "desc",
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  return (
    <div className="sm:mx-3 px-2 sm:py-10 py-5">
      <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-black">Heat Sneakers 🔥</h2>
        <ArrowButton href="/products" direction="right">
          See All
        </ArrowButton>
      </div>
      <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const Categories = ({ categories }) => {
  return (
    <div className="sm:mx-3 px-2 sm:py-10 py-5">
      <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-black">Sneaker Types 🚀</h2>
        <ArrowButton href="/categories" direction="right">
          See All
        </ArrowButton>
      </div>
      <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="group cursor-pointer sm:p-5 p-2 border border-zinc-300 hover:border-primary ease-in duration-150 overflow-hidden"
          >
            <div className="mb-10 flex flex-row items-center justify-center">
              <Image
                alt={category.name}
                loading="lazy"
                width={300}
                height={300}
                decoding="async"
                data-nimg={1}
                className="h-auto w-auto"
                src={category.image}
                style={{ color: "transparent" }}
              />
            </div>
            <h3 className="text-2xl font-black text-center group-hover:text-primary">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default async function Home() {
  const categories = await prisma.category.findMany();

  return (
    <>
      <TopProducts />
      <Categories categories={categories} />
    </>
  );
}
