import { Order, Prisma } from "@prisma/client";
import { prisma } from "../db";
import Stripe from "stripe";
import { stripe } from "../stripe";

export async function checkoutProducts(
  items: { id: string; size: number; price: number }[],
  userId: string
) {
  let totalPrice = 0;
  let order: Order;

  try {
    await prisma.$transaction(async (tx) => {
      await Promise.all(
        items.map(async (item) => {
          const product = await tx.product.update({
            where: {
              id: item.id,
            },
            data: {
              quantity: {
                decrement: 1,
              },
              updatedAt: new Date(),
            },
          });
          if (product.quantity < 0) {
            throw new Error(`Product ${product.id} is out of stock`);
          }
          totalPrice += product.price;
        })
      );
    });

    order = await prisma.order.create({
      data: {
        userId,
        orderItems: {
          createMany: {
            data: items.map((item) => ({
              productId: item.id,
              size: item.size,
            })),
          },
        },
      },
    });
  } catch (ex) {
    if (ex instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error ${ex.code}: ${ex.message}`);
    }

    throw new Error("An error occured");
  }

  let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });
  } catch (ex) {
    throw new Error(`Stripe error: ${JSON.stringify(ex)}`);
  }

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentClientSecret: paymentIntent.client_secret,
      updatedAt: new Date(),
    },
  });

  return {
    orderId: order.id,
    paymentIntentClientSecret: paymentIntent.client_secret,
  };
}
