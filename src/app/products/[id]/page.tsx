import { notFound } from "next/navigation";

import { BackButton } from "@/components/global";
import { prisma } from "@/core/db";
import { ProductDescription, RelatedProducts } from "@/components/product";
import { PageProps } from "@/types/page";

export default async function Page({
  params,
  searchParams,
}: PageProps<{ id: string }>) {
  const id = params.id;

  const product = await prisma.product.findFirst({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <BackButton href="/" />
      <ProductDescription product={product} size={searchParams?.size} />
      <RelatedProducts
        productId={product.id}
        categoryId={product.categoryId}
        categoryName={product.category.name}
      />
    </>
  );
}
