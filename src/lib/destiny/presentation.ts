import type {
  NormalizedIconLayers,
  NormalizedDestinyItem,
  NormalizedItemState,
  NormalizedPlug,
  NormalizedSocket,
} from "@/lib/destiny/inventory";

export type ItemPlugSections = {
  appearance: NormalizedSocket[];
  intrinsic: NormalizedSocket[];
  mods: NormalizedSocket[];
  other: NormalizedSocket[];
  perks: NormalizedSocket[];
  setBonuses: NormalizedSocket[];
  upgrades: NormalizedSocket[];
};

export function getItemPresentationIconPath(
  item: Pick<NormalizedDestinyItem, "icon" | "ornament">,
) {
  return item.icon;
}

export function getItemTileTier(
  item: Pick<NormalizedDestinyItem, "gearTier" | "kind" | "weaponTier">,
) {
  const tier =
    item.kind === "weapon"
      ? (item.weaponTier ?? item.gearTier)
      : item.gearTier;

  return tier != null && tier > 0 ? Math.min(tier, 5) : 0;
}

export function getItemTileWatermarkPath(
  iconLayers: Pick<
    NormalizedIconLayers,
    "featuredWatermark" | "ornamentWatermark" | "shelvedWatermark" | "watermark"
  >,
) {
  return (
    iconLayers.watermark ??
    iconLayers.shelvedWatermark ??
    iconLayers.featuredWatermark ??
    iconLayers.ornamentWatermark
  );
}

export function isItemMasterworked(
  item: {
    masterwork: NormalizedPlug | null;
    state: Pick<NormalizedItemState, "masterworked">;
  },
) {
  return item.state.masterworked || Boolean(item.masterwork);
}

function plugSearchText(plug: Pick<NormalizedPlug, "category" | "name">) {
  return `${plug.category ?? ""} ${plug.name}`.toLowerCase();
}

function plugMatches(
  plug: Pick<NormalizedPlug, "category" | "name">,
  pattern: RegExp,
) {
  return pattern.test(plugSearchText(plug));
}

function shouldHideSocket(socket: NormalizedSocket) {
  return !socket.isVisible || !socket.isEnabled || plugMatches(socket, /tracker/);
}

export function getItemPlugSections(
  item: Pick<NormalizedDestinyItem, "kind" | "sockets">,
): ItemPlugSections {
  const sections: ItemPlugSections = {
    appearance: [],
    intrinsic: [],
    mods: [],
    other: [],
    perks: [],
    setBonuses: [],
    upgrades: [],
  };

  for (const socket of item.sockets) {
    if (shouldHideSocket(socket)) {
      continue;
    }

    if (plugMatches(socket, /masterwork/)) {
      sections.upgrades.push(socket);
      continue;
    }

    if (plugMatches(socket, /shader|ornament|skin|memento/)) {
      sections.appearance.push(socket);
      continue;
    }

    if (plugMatches(socket, /intrinsic|frame/)) {
      sections.intrinsic.push(socket);
      continue;
    }

    if (plugMatches(socket, /set[\s._-]*bonus|armor[\s._-]*set|setbonus/)) {
      sections.setBonuses.push(socket);
      continue;
    }

    if (
      plugMatches(socket, /mod|enhancement/) &&
      !plugMatches(socket, /weapon[\s._-]*perk/)
    ) {
      sections.mods.push(socket);
      continue;
    }

    if (
      item.kind === "weapon" &&
      plugMatches(socket, /barrel|battery|blade|guard|haft|magazine|origin|stock|grip|sight|scope|trait|perk/)
    ) {
      sections.perks.push(socket);
      continue;
    }

    if (item.kind === "armor") {
      sections.mods.push(socket);
      continue;
    }

    sections.other.push(socket);
  }

  return sections;
}

function socketSortText(socket: Pick<NormalizedSocket, "category" | "name">) {
  return `${socket.category ?? ""} ${socket.name}`.toLowerCase();
}

function getWeaponSocketOrder(socket: NormalizedSocket) {
  const text = socketSortText(socket);

  if (/origin|foundry/.test(text)) {
    return 4;
  }

  if (/barrel|blade|haft|sight|scope/.test(text)) {
    return 0;
  }

  if (/battery|guard|magazine/.test(text)) {
    return 1;
  }

  if (/trait|perk/.test(text)) {
    return 2;
  }

  return 3;
}

function compareWeaponSockets(
  left: NormalizedSocket,
  right: NormalizedSocket,
) {
  const orderDelta = getWeaponSocketOrder(left) - getWeaponSocketOrder(right);

  if (orderDelta !== 0) {
    return orderDelta;
  }

  return left.index - right.index;
}

export function getItemSocketBoardSockets(
  item: Pick<NormalizedDestinyItem, "kind" | "sockets">,
) {
  const sections = getItemPlugSections(item);

  if (item.kind === "weapon") {
    return [
      ...sections.perks.slice().sort(compareWeaponSockets),
      ...sections.mods,
      ...sections.intrinsic,
      ...sections.upgrades,
      ...sections.appearance,
      ...sections.other,
    ];
  }

  const sectionOrder: (keyof ItemPlugSections)[] =
    item.kind === "armor"
      ? ["mods", "setBonuses", "upgrades", "appearance", "other"]
      : ["intrinsic", "perks", "mods", "setBonuses", "upgrades", "appearance", "other"];

  return sectionOrder.flatMap((section) => sections[section]);
}
