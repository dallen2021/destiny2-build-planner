const UINT32_SIZE = 0x100000000;
const INT32_MAX = 0x7fffffff;

function toFiniteNumber(hash: number | string): number {
  const value = Number(hash);
  if (!Number.isFinite(value)) {
    throw new TypeError(`Invalid Destiny hash: ${hash}`);
  }
  return value;
}

export function toSignedHash(hash: number | string): number {
  const value = toFiniteNumber(hash);
  return value > INT32_MAX ? value - UINT32_SIZE : value;
}

export function toUnsignedHash(hash: number | string): number {
  const value = toFiniteNumber(hash);
  return value < 0 ? value + UINT32_SIZE : value;
}
