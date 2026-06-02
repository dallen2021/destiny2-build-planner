import type {
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
      plugMatches(socket, /barrel|magazine|stock|grip|sight|scope|trait|perk/)
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
