import { notFound } from "next/navigation";

import { GearCanvas } from "@/components/render/guardian-canvas";

export const dynamic = "force-dynamic";

// Default: a Titan exotic set (helm / arms / chest / legs) assembled together.
// Override with ?items=h1,h2,... or a single ?item=hash.
const TITAN_SET = [
  "1362342075", // Helm of Saint-14
  "241462142", // Synthoceps
  "1192890598", // Hallowfire Heart
  "1437375562", // Dunemarchers
];

export default async function SpikeRenderPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string; items?: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;
  const raw = params.items ?? params.item;
  const itemHashes = raw
    ? raw.split(",").map((value) => value.trim()).filter(Boolean)
    : TITAN_SET;

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at 50% 38%, #1c2733 0%, #080c12 70%)",
      }}
    >
      <GearCanvas itemHashes={itemHashes} />
    </main>
  );
}
