import { describe, expect, test } from 'vitest';

// utilities
import avmGenesisHashToCAIP002Reference from './avmGenesisHashToCAIP002Reference';

interface TestParameters {
  expected: string;
  input: string;
}

describe('avmGenesisHashToCAIP002Reference', () => {
  test.each([
    {
      expected: 'r20fSQI8gWe_kFZziNonSPCXLwcQmH_n', // Voi mainnet
      input: 'r20fSQI8gWe/kFZziNonSPCXLwcQmH/nxROvnnueWOk=',
    },
    {
      expected: 'mufvzhECYAe3WaU075v0z4k1_SNUIuUP', // Voi testnet
      input: 'mufvzhECYAe3WaU075v0z4k1/SNUIuUPCyBTE+Z/08s=',
    },
    {
      expected: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73k', // Algorand mainnet
      input: 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
    },
    {
      expected: 'mFgazF-2uRS1tMiL9dsj01hJGySEmPN2', // Algorand betanet
      input: 'mFgazF+2uRS1tMiL9dsj01hJGySEmPN28B/TjjvpVW0=',
    },
    {
      expected: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe', // Algorand testnet
      input: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
    },
    {
      expected: 'kUt08LxeVAAGHnh4JoAoAMM9ql_hBwSo', // Algorand fnet
      input: 'kUt08LxeVAAGHnh4JoAoAMM9ql/hBwSoiFtlnKNeOxA=',
    },
  ])(`should parse $input to $expected`, ({ expected, input }: TestParameters) => {
    expect(avmGenesisHashToCAIP002Reference(input)).toBe(expected);
  });
});
