import { notFound } from "next/navigation";

import { GearCanvas } from "@/components/render/guardian-canvas";

export const dynamic = "force-dynamic";

// Dev-only 3D render spike (Phase 1). 404 in production. Default item is
// Riskrunner (3089417789); override with ?item=<hash>.
export default async function SpikeRenderPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { item } = await searchParams;
  const itemHash = item ?? "3089417789";

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at 50% 38%, #1c2733 0%, #080c12 70%)",
      }}
    >
      <GearCanvas itemHash={itemHash} />
    </main>
  );
}
