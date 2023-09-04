import { BackButton } from "@/components/global/back-button";
import { Pagination } from "@/components/global/pagination";
import { ProductCard } from "@/components/product/product-card";
import { prisma } from "@/core/db";
import { PageProps } from "@/types/page";
import Image from "next/image";
import { notFound } from "next/navigation";

const LIMIT = 12;

export default async function Page({ params, searchParams }: PageProps) {
  const categoryId = params.id;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    return notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
    take: LIMIT,
    skip: (page - 1) * LIMIT,
  });

  const pages = await prisma.product.count({
    where: {
      categoryId,
    },
    take: LIMIT,
  });

  return (
    <>
      <BackButton href="/" />

      <div className="md:px-10 md:py-20 p-2 flex md:flex-row flex-col items-center justify-center">
        <Image
          alt={category.name}
          width={200}
          height={200}
          decoding="async"
          className="h-auto w-auto"
          src={category.image}
          style={{ color: "transparent" }}
        />
        <div className="md:p-8 p-5 md:flex-[0.8]">
          <h2 className="text-4xl font-black mb-2 text-primary">
            ✨{category.name}✨
          </h2>
          <p className="font-medium mb-2">{category.description}</p>
        </div>
      </div>
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available {category.name}(s):
        </h2>
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination pages={Math.ceil(pages / LIMIT)} page={page} />
    </>
  );
}
