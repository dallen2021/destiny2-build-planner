import { GearCanvas } from "@/components/render/guardian-canvas";
import { MyGuardian } from "@/components/render/my-guardian";

export const dynamic = "force-dynamic";

// Default: render the signed-in player's equipped Guardian. Override with
// ?items=h1,h2,... or a single ?item=hash to inspect specific gear. Optionally
// preview a shader on those items with ?shader=<hash>&dyes=<h1,h2,h3>.
export default async function SpikeRenderPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string; items?: string; shader?: string; dyes?: string }>;
}) {
  const params = await searchParams;
  const raw = params.items ?? params.item;
  const overrideHashes = raw
    ? raw
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : null;
  const shader = params.shader ?? null;
  const dyes = params.dyes
    ? params.dyes
        .split(",")
        .map(Number)
        .filter((n) => Number.isFinite(n) && n > 0)
    : undefined;

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at 50% 38%, #1c2733 0%, #080c12 70%)",
      }}
    >
      {overrideHashes ? (
        <GearCanvas items={overrideHashes.map((hash) => ({ hash, shader, dyes }))} />
      ) : (
        <MyGuardian />
      )}
    </main>
  );
}
