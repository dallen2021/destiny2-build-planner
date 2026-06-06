import { CommandCenter } from "@/components/destiny/command-center";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const { stage } = await searchParams;
  return <CommandCenter stageVariant={stage} />;
}
