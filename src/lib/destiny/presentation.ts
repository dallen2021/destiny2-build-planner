import type {
  NormalizedDestinyItem,
  NormalizedItemState,
  NormalizedPlug,
} from "@/lib/destiny/inventory";

export function getItemPresentationIconPath(
  item: Pick<NormalizedDestinyItem, "icon" | "ornament">,
) {
  return item.icon;
}

export function isItemMasterworked(
  item: {
    masterwork: NormalizedPlug | null;
    state: Pick<NormalizedItemState, "masterworked">;
  },
) {
  return item.state.masterworked || Boolean(item.masterwork);
}
