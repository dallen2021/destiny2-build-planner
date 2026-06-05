"use client";

import { useCallback, useEffect, useState } from "react";

import type { DestinyInventoryApiPayload } from "@/lib/destiny/inventory";

type InventoryErrorPayload = {
  error?: string;
};

export function useDestinyInventory({ enabled = true }: { enabled?: boolean } = {}) {
  const [data, setData] = useState<DestinyInventoryApiPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  const loadInventory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/destiny/inventory", {
        cache: "no-store",
      });
      const payload = (await response.json()) as
        | DestinyInventoryApiPayload
        | InventoryErrorPayload;

      if (!response.ok) {
        const errorPayload = payload as InventoryErrorPayload;
        throw new Error(errorPayload.error ?? "Inventory request failed.");
      }

      setData(payload as DestinyInventoryApiPayload);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Inventory request failed.",
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadInventory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [enabled, loadInventory]);

  return {
    data,
    error,
    isLoading,
    reload: loadInventory,
  };
}
