import { describe, expect, it } from "vitest";

import {
  getItemPresentationIconPath,
  getItemPlugSections,
  isItemMasterworked,
} from "./presentation";
import type { NormalizedSocket } from "./inventory";

function makeSocket(
  overrides: Partial<NormalizedSocket> & Pick<NormalizedSocket, "category" | "name" | "plugHash">,
): NormalizedSocket {
  return {
    description: null,
    icon: null,
    index: 0,
    isEnabled: true,
    isVisible: true,
    reusablePlugHashes: [],
    reusablePlugs: [],
    ...overrides,
  };
}

describe("destiny presentation helpers", () => {
  it("keeps ornament plug icons out of the primary item artwork", () => {
    expect(
      getItemPresentationIconPath({
        icon: "/base-icon.png",
        ornament: {
          category: "ornament",
          description: null,
          icon: "/ornament-icon.png",
          index: 2,
          isEnabled: true,
          isVisible: true,
          name: "Ornament",
          plugHash: 123,
        },
      }),
    ).toBe("/base-icon.png");
  });

  it("falls back to the base item icon when there is no ornament icon", () => {
    expect(
      getItemPresentationIconPath({
        icon: "/base-icon.png",
        ornament: null,
      }),
    ).toBe("/base-icon.png");
  });

  it("treats either state or plug data as a masterwork signal", () => {
    expect(
      isItemMasterworked({
        masterwork: null,
        state: { masterworked: true },
      }),
    ).toBe(true);
    expect(
      isItemMasterworked({
        masterwork: {
          category: "masterwork",
          description: null,
          icon: "/mw.png",
          index: 4,
          isEnabled: true,
          isVisible: true,
          name: "Range Masterwork",
          plugHash: 456,
        },
        state: { masterworked: false },
      }),
    ).toBe(true);
  });

  it("classifies selected weapon sockets into Destiny inspect sections", () => {
    const sections = getItemPlugSections({
      kind: "weapon",
      sockets: [
        makeSocket({
          category: "intrinsics",
          name: "Rapid-Fire Frame",
          plugHash: 1,
        }),
        makeSocket({
          category: "barrels",
          name: "Arrowhead Brake",
          plugHash: 2,
        }),
        makeSocket({
          category: "magazines",
          name: "Tactical Mag",
          plugHash: 3,
        }),
        makeSocket({
          category: "weapon_perks",
          name: "Shoot to Loot",
          plugHash: 4,
        }),
        makeSocket({
          category: "v400.plugs.weapons.mods",
          name: "Counterbalance Stock",
          plugHash: 5,
        }),
        makeSocket({
          category: "v400.plugs.weapons.masterworks",
          name: "Range Masterwork",
          plugHash: 6,
        }),
        makeSocket({
          category: "v400.plugs.weapon_skins",
          name: "Blue Ornament",
          plugHash: 7,
        }),
      ],
    });

    expect(sections.intrinsic.map((socket) => socket.name)).toEqual([
      "Rapid-Fire Frame",
    ]);
    expect(sections.perks.map((socket) => socket.name)).toEqual([
      "Arrowhead Brake",
      "Tactical Mag",
      "Shoot to Loot",
    ]);
    expect(sections.mods.map((socket) => socket.name)).toEqual([
      "Counterbalance Stock",
    ]);
    expect(sections.upgrades.map((socket) => socket.name)).toEqual([
      "Range Masterwork",
    ]);
    expect(sections.appearance.map((socket) => socket.name)).toEqual([
      "Blue Ornament",
    ]);
  });

  it("classifies armor sockets as mods and set bonuses instead of perks", () => {
    const sections = getItemPlugSections({
      kind: "armor",
      sockets: [
        makeSocket({
          category: "v400.plugs.armor.mods",
          name: "Grenade Loader",
          plugHash: 11,
        }),
        makeSocket({
          category: "armor_set_bonus",
          name: "Reactive Booster",
          plugHash: 12,
        }),
        makeSocket({
          category: "v400.plugs.armor_skins",
          name: "Aion Renewal Ornament",
          plugHash: 13,
        }),
      ],
    });

    expect(sections.perks).toEqual([]);
    expect(sections.mods.map((socket) => socket.name)).toEqual([
      "Grenade Loader",
    ]);
    expect(sections.setBonuses.map((socket) => socket.name)).toEqual([
      "Reactive Booster",
    ]);
    expect(sections.appearance.map((socket) => socket.name)).toEqual([
      "Aion Renewal Ornament",
    ]);
  });
});
