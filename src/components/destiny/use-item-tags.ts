"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createTagStorageKey,
  parseStoredTagMap,
  toggleItemTagInMap,
  type ItemTag,
  type ItemTagMap,
} from "@/lib/destiny/tags";

export function useItemTags(
  scope:
    | {
        membershipId: string;
        membershipType: number;
      }
    | null
    | undefined,
) {
  const storageKey = useMemo(
    () => (scope ? createTagStorageKey(scope) : null),
    [scope],
  );
  const [tagMap, setTagMap] = useState<ItemTagMap>({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!storageKey) {
        setTagMap({});
        setHasLoaded(false);
        return;
      }

      setTagMap(parseStoredTagMap(window.localStorage.getItem(storageKey)));
      setHasLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) {
      return;
    }
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(tagMap));
  }, [hasLoaded, storageKey, tagMap]);

  const toggleTag = useCallback((itemId: string, tag: ItemTag) => {
    setTagMap((currentMap) => toggleItemTagInMap(currentMap, itemId, tag));
  }, []);

  return {
    tagMap,
    toggleTag,
  };
}
