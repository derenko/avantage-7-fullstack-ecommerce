"use client";

import { cn } from "@/core/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  pages: number;
}

const disabledClassNames = "bg-zinc-200 cursor-not-allowed p-3";

export function Pagination({ page, pages }: PaginationProps) {
  const isDisabledNextButton = Number(page) >= pages;
  const isDisabledPreviousButton = Number(page) <= 1;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickNextPage = () => {
    const urlSearchParams = new URLSearchParams(searchParams ?? "");
    urlSearchParams.delete("page");
    const search = `${urlSearchParams.toString()}&page=${Number(page) + 1}`;
    router.replace(`${pathname}?${search}`);
  };

  const handleClickPreviousPage = () => {
    const urlSearchParams = new URLSearchParams(searchParams ?? "");
    urlSearchParams.delete("page");
    const search = `${urlSearchParams.toString()}&page=${Number(page) - 1}`;
    router.replace(`${pathname}?${search}`);
  };

  return (
    <div className="flex flex-row items-center justify-center my-10">
      <button
        disabled={isDisabledPreviousButton}
        onClick={handleClickPreviousPage}
        className={cn(
          "rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] border border-zinc-300 hover:bg-zinc-200 p-3",
          { [disabledClassNames]: isDisabledPreviousButton }
        )}
      >
        <ArrowLeft />
      </button>
      <p className="mx-4 text-[16px]">Page {page}</p>
      <button
        disabled={isDisabledNextButton}
        onClick={handleClickNextPage}
        className={cn(
          "rounded-md ease-in duration-100 flex flex-row items-center justify-center text-[14px] border border-zinc-300 hover:bg-zinc-200 p-3",
          { [disabledClassNames]: isDisabledNextButton }
        )}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
