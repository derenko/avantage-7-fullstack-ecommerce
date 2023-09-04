import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import rawBody from "raw-body";
import { Status } from "@prisma/client";
import { stripe } from "@/core/stripe";
import { prisma } from "@/core/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await rawBody(req);
  const signature = req.headers["stripe-signature"];

  console.log("here", signature);

  if (!signature) {
    return res.status(400).end();
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (ex) {
    return res.status(400).send(`Webhook error: ${JSON.stringify(ex)}`);
  }

  const eventObj = event.data.object as Stripe.PaymentIntent;
  const stripePaymentIntentId = eventObj.id;

  let status: Status | undefined;

  switch (event.type) {
    case "payment_intent.created":
    case "payment_intent.processing":
      status = Status.Processing;
      break;
    case "payment_intent.succeeded":
      status = Status.Paid;
      break;
    case "payment_intent.payment_failed":
      status = Status.NotPaid;
      break;
    default:
      status = undefined;
      break;
  }

  if (stripePaymentIntentId && status) {
    await prisma.order.update({
      where: {
        stripePaymentIntentId,
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  }

  return res.status(200).end();
}
