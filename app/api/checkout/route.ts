import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(key, {
    apiVersion: "2026-06-24.dahlia",
  });
}

export async function POST() {
  try {
    const stripe = getStripe();
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://korrocorp.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Korro Lens - Licence perpetuelle",
              description:
                "Analyse IA de videosurveillance. Licence a vie pour un poste. 100% local, conforme RGPD.",
            },
            unit_amount: 79900,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/korro-lens/success`,
      cancel_url: `${origin}/korro-lens`,
      metadata: {
        product: "korro-lens",
        license_type: "perpetual",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de creer la session de paiement." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error(
      "Erreur Stripe Checkout:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la creation du paiement." },
      { status: 500 }
    );
  }
}
