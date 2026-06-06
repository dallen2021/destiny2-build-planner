import { GearCanvas } from "@/components/render/guardian-canvas";
import { MyGuardian } from "@/components/render/my-guardian";

export const dynamic = "force-dynamic";

// Default: render the signed-in player's equipped Guardian. Override with
// ?items=h1,h2,... or a single ?item=hash to inspect specific gear.
export default async function SpikeRenderPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string; items?: string }>;
}) {
  const params = await searchParams;
  const raw = params.items ?? params.item;
  const overrideHashes = raw
    ? raw
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : null;

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at 50% 38%, #1c2733 0%, #080c12 70%)",
      }}
    >
      {overrideHashes ? (
        <GearCanvas items={overrideHashes.map((hash) => ({ hash }))} />
      ) : (
        <MyGuardian />
      )}
    </main>
  );
}
