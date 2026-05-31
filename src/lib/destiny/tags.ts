export const ITEM_TAGS = [
  "peak",
  "keep",
  "review",
  "slop",
  "infusion",
  "build",
] as const;

export type ItemTag = (typeof ITEM_TAGS)[number];
export type ItemTagMap = Record<string, ItemTag[]>;

const ITEM_TAG_SET = new Set<string>(ITEM_TAGS);

export function isItemTag(value: string): value is ItemTag {
  return ITEM_TAG_SET.has(value);
}

export function normalizeTags(tags: readonly string[] | undefined): ItemTag[] {
  const normalized = new Set<ItemTag>();

  for (const tag of tags ?? []) {
    if (isItemTag(tag)) {
      normalized.add(tag);
    }
  }

  return [...normalized];
}

export function toggleItemTag(
  currentTags: readonly ItemTag[],
  tag: ItemTag,
): ItemTag[] {
  return currentTags.includes(tag)
    ? currentTags.filter((currentTag) => currentTag !== tag)
    : [...currentTags, tag];
}

export function setItemTag(
  tagMap: ItemTagMap,
  itemId: string,
  tag: ItemTag,
): ItemTagMap {
  return {
    ...tagMap,
    [itemId]: normalizeTags([...(tagMap[itemId] ?? []), tag]),
  };
}

export function toggleItemTagInMap(
  tagMap: ItemTagMap,
  itemId: string,
  tag: ItemTag,
): ItemTagMap {
  const nextTags = toggleItemTag(tagMap[itemId] ?? [], tag);
  const nextMap = { ...tagMap };

  if (nextTags.length === 0) {
    delete nextMap[itemId];
  } else {
    nextMap[itemId] = nextTags;
  }

  return nextMap;
}

export function createTagStorageKey({
  membershipId,
  membershipType,
}: {
  membershipId: string;
  membershipType: number;
}): string {
  return `d2bp:item-tags:v1:${membershipType}:${membershipId}`;
}

export function parseStoredTagMap(rawValue: string | null): ItemTagMap {
  if (!rawValue) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (parsed == null || Array.isArray(parsed) || typeof parsed !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed)
        .map(([itemId, tags]) => [
          itemId,
          normalizeTags(Array.isArray(tags) ? tags : []),
        ] as const)
        .filter(([, tags]) => tags.length > 0),
    );
  } catch {
    return {};
  }
}
