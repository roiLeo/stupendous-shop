/**
 * Accepts 'polkadot' | 'kusama' | 'ahp' | 'ahk' (the values used in .env)
 * and returns the Chain used by the PAPI clients. Defaults to polkadot.
 */
export function resolveChain(value: unknown): Chain {
  switch (String(value ?? '').toLowerCase()) {
    case 'kusama':
    case 'ahk':
      return 'kusama'
    default:
      return 'polkadot'
  }
}
