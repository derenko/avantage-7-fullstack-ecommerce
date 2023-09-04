import { BackButton, Pagination } from "@/components/global";
import { ProductCard } from "@/components/product";
import { prisma } from "@/core/db";

import type { PageProps } from "@/types/page";

const LIMIT = 12;

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;

  const products = await prisma.product.findMany({
    where: {
      deleted: false,
    },
    take: LIMIT,
    skip: (page - 1) * LIMIT,
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

  const pages = await prisma.product.count();

  return (
    <>
      <BackButton />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available Products:
        </h2>
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination pages={Math.ceil(pages / LIMIT)} page={page} />
      </div>
    </>
  );
}
