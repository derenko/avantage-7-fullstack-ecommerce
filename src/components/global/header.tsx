import { Suspense } from "react";
import Link from "next/link";
import { Black_Ops_One } from "next/font/google";
import { cookies } from "next/headers";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/core/utils";
import { CartPopover } from "./cart-popover";
import { UserProfile } from "./user-profile";

const blackOpsOne = Black_Ops_One({ subsets: ["latin"], weight: ["400"] });

export async function Header() {
  const cookie = cookies().get("cart");
  const cart = cookie && cookie.value ? JSON.parse(cookie.value) : [];

  return (
    <div className="flex justify-between items-center w-full py-2 px-8 shadow-sm rounded-md">
      <Link
        href="/"
        className={cn(
          "font-bold italic text-2xl text-primary",
          blackOpsOne.className
        )}
      >
        Avantage 7
      </Link>

      <div>
        <div className="flex">
          <Suspense
            fallback={
              <Skeleton className="w-[40px] h-[40px] rounded-full mr-4" />
            }
          >
            <div className="mr-4">
              <UserProfile />
            </div>
          </Suspense>
          <CartPopover cart={cart} />
        </div>
      </div>
    </div>
  );
}
