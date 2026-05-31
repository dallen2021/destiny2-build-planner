import { describe, expect, it } from "vitest";

import {
  createTagStorageKey,
  parseStoredTagMap,
  toggleItemTag,
  toggleItemTagInMap,
} from "./tags";

describe("item tag helpers", () => {
  it("toggles tags without duplicating values", () => {
    expect(toggleItemTag(["keep"], "slop")).toEqual(["keep", "slop"]);
    expect(toggleItemTag(["keep", "slop"], "slop")).toEqual(["keep"]);
  });

  it("updates tag maps and removes empty entries", () => {
    const added = toggleItemTagInMap({}, "item-1", "peak");
    expect(added).toEqual({ "item-1": ["peak"] });

    expect(toggleItemTagInMap(added, "item-1", "peak")).toEqual({});
  });

  it("scopes storage by membership", () => {
    expect(
      createTagStorageKey({ membershipId: "123", membershipType: 2 }),
    ).toBe("d2bp:item-tags:v1:2:123");
  });

  it("parses stored maps defensively", () => {
    expect(
      parseStoredTagMap(
        JSON.stringify({
          "item-1": ["peak", "fake", "keep"],
          "item-2": "slop",
        }),
      ),
    ).toEqual({ "item-1": ["peak", "keep"] });
    expect(parseStoredTagMap("{nope")).toEqual({});
  });
});
