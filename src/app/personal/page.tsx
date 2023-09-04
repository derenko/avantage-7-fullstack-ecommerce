import { redirect } from "next/navigation";
import Image from "next/image";

import { prisma } from "@/core/db";
import { OrderItem } from "@/components/personal";
import { getServerUser } from "@/core/helpers";

export default async function Page() {
  const user = await getServerUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="w-full h-full">
      <div className="mx-auto max-w-6xl w-full">
        <div className="bg-gradient-to-bl from-slate-300 border-t border-x border-zinc-300 pt-14 pb-4 sm:pl-10 pl-4 mt-4 rounded-t-2xl">
          <div className="mb-3 rounded-full h-20 w-20 flex flex-row items-center justify-center overflow-hidden">
            <span>
              <Image
                src={user.image!}
                width="150"
                height="150"
                alt={user.name!}
              />
            </span>
          </div>
          <p className="text-lg font-medium">{user.name}</p>
          <p className="text-[14px]">{user.email}</p>
        </div>
        <div className="border border-zinc-300 sm:px-0 px-1">
          <div className="grid gap-1 md:w-[50%] w-full grid-cols-2">
            <div className="col-span-1 sm:p-3 p-2 flex flex-row items-center justify-center cursor-pointer border-b ease-in duration-100 border-primary">
              <p className="text-[14px] text-center text-zinc-900">Orders</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
          <span />
        </div>
      </div>
    </div>
  );
}
