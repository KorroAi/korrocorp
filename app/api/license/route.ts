import { NextResponse } from "next/server";
import Stripe from "stripe";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

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

function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const block = (): string => {
    let s = "";
    for (let i = 0; i < 4; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
  };
  return `KL-${block()}-${block()}-${block()}-${block()}`;
}

interface LicenseEntry {
  license_key: string;
  customer_email: string;
  stripe_session_id: string;
  created_at: string;
  status: "active" | "revoked";
}

function readLicenses(): LicenseEntry[] {
  const dataDir = join(process.cwd(), "data");
  const filePath = join(dataDir, "licenses.json");

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(filePath)) {
    writeFileSync(filePath, "[]", "utf-8");
    return [];
  }

  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as LicenseEntry[];
  } catch {
    return [];
  }
}

function writeLicenses(licenses: LicenseEntry[]): void {
  const dataDir = join(process.cwd(), "data");
  const filePath = join(dataDir, "licenses.json");

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  writeFileSync(filePath, JSON.stringify(licenses, null, 2), "utf-8");
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") ?? "";

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
      return NextResponse.json(
        { error: "Signature webhook invalide." },
        { status: 400 }
      );
    }

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.customer_details?.email) {
      return NextResponse.json(
        { error: "Aucune adresse email trouvee dans la session." },
        { status: 400 }
      );
    }

    const licenseKey = generateLicenseKey();
    const email = session.customer_details.email;

    const entry: LicenseEntry = {
      license_key: licenseKey,
      customer_email: email,
      stripe_session_id: session.id,
      created_at: new Date().toISOString(),
      status: "active",
    };

    const licenses = readLicenses();
    licenses.push(entry);
    writeLicenses(licenses);

    console.log(
      `[Korro Lens] Nouvelle licence creee: ${licenseKey} pour ${email}`
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      "Erreur webhook Stripe:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
