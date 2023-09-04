import { ProductCard } from "@/components/product/product-card";
import { prisma } from "@/core/db";
import { ArrowButton } from "@/components/global";

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
  categoryName: string;
}

export async function RelatedProducts({
  productId,
  categoryId,
  categoryName,
}: RelatedProductsProps) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryId,
      id: {
        not: productId,
      },
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="sm:mx-3 px-2 sm:py-10 py-5">
      <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-black">More {categoryName}:</h2>
        <ArrowButton href={`/categories/${categoryId}`} direction="right">
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
}
