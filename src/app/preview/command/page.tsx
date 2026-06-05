import { notFound } from "next/navigation";

import { CommandCenter } from "@/components/destiny/command-center";
import { PREVIEW_COMMAND_PAYLOAD } from "@/lib/destiny/preview-fixtures";

export const dynamic = "force-static";

/**
 * Dev-only visual harness for the Command console. Renders the real component
 * with fixture data so the UI can be iterated without a live Bungie session.
 * Returns 404 in production so it never ships as a real route.
 */
export default function CommandPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <CommandCenter previewData={PREVIEW_COMMAND_PAYLOAD} />;
}
