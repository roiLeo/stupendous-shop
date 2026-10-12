/** polkadot-api ≥ 3 returns on-chain byte strings as plain Uint8Array. */
export function bytesToText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}
