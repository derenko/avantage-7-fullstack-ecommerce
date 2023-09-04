import { prisma } from "@/core/db";
import { add } from "@/core/actions/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.id || !body.size) {
    return NextResponse.json(
      {
        message: "Missing id or size",
      },
      { status: 422 }
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      id: body.id,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  if (product) {
    await add(product, body.size);

    return NextResponse.json(
      {
        revalidated: true,
        now: Date.now(),
      },
      { status: 201 }
    );
  }
}
