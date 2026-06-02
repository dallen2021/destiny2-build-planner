import { describe, expect, it } from "vitest";

import {
  getItemPresentationIconPath,
  isItemMasterworked,
} from "./presentation";

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
});
