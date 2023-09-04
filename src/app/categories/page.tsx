import { CategoryItem } from "@/components/categories";
import { prisma } from "@/core/db";

export default async function Page() {
  const categories = await prisma.category.findMany({});

  return (
    <div className="sm:mx-3 px-2 sm:py-10 py-5">
      <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
        <h2 className="text-2xl font-black">
          Sneaker Types ({categories.length}) 🚀
        </h2>
      </div>
      <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}
