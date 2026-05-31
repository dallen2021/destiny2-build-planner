import { describe, expect, it } from "vitest";

import { toSignedHash, toUnsignedHash } from "./hash";

describe("manifest hash conversion", () => {
  it("converts unsigned hashes over int32 max to signed Bungie ids", () => {
    expect(toSignedHash(2996146975)).toBe(-1298820321);
  });

  it("converts signed Bungie ids back to unsigned hashes", () => {
    expect(toUnsignedHash(-1298820321)).toBe(2996146975);
  });

  it("keeps small positive hashes unchanged", () => {
    expect(toSignedHash(144602215)).toBe(144602215);
    expect(toUnsignedHash(144602215)).toBe(144602215);
  });

  it("rejects non-numeric hashes", () => {
    expect(() => toSignedHash("not-a-hash")).toThrow(TypeError);
    expect(() => toUnsignedHash("not-a-hash")).toThrow(TypeError);
  });
});
