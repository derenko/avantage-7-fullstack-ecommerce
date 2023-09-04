import Link from "next/link";
import Image from "next/image";
import { Category } from "@prisma/client";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group cursor-pointer sm:p-5 p-2 border border-zinc-300 hover:border-primary ease-in duration-150 overflow-hidden"
    >
      <div className="mb-10 flex flex-row items-center justify-center">
        <Image
          alt={category.id}
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
  );
}
