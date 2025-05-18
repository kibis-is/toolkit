import { type Chain, type ChainWithNetworkParameters, networkParametersFromChain, VOI_ICON_URI } from '@kibisis/chains';
import algosdk from 'algosdk';
import { beforeAll, beforeEach, describe } from 'vitest';

// decorators
import ARC0200Asset from './ARC0200Asset';

describe(`${__dirname}#ARC0200Asset`, () => {
  const decimals = BigInt(6);
  const name = 'Kibisis Token';
  const symbol = 'KIBI';
  const totalSupply = BigInt('10000000000000000');
  let app: ARC0200Asset;
  let chain: ChainWithNetworkParameters;

  beforeAll(async () => {
    const response = await fetch('http://127.0.0.1:4001/genesis');

    const genesis = await response.json();

    const _chain: Chain = {
      algods: {
        default: 0,
        nodes: [
          {
            id: 'localhost',
            origin: 'http://127.0.0.1',
            port: '4001',
            token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          },
        ],
      },
      caip002: {
        namespace: 'avm',
      },
      displayName: 'LocalNet',
      indexers: {
        default: 0,
        nodes: [
          {
            id: 'localhost',
            origin: 'http://127.0.0.1',
            port: '8980',
          },
        ],
      },
      isTestnet: true,
      nativeCurrency: {
        decimals: 6,
        iconURI: VOI_ICON_URI,
        name: 'Voi',
        symbol: 'VOI',
      },
    };

    try {
      chain = await networkParametersFromChain(_chain);
    } catch (error) {
      console.log('error:', error);
    }

    console.log('chain:', chain);
  });

  beforeEach(() => {});

  // describe('when getting the balanceOf', () => {
  //   it('should return 0 for a new account', async () => {
  //     // arrange
  //     const account: Account = generateAccount();
  //     // act
  //     const result: BigNumber = await contract.balanceOf(account.addr);
  //
  //     // assert
  //     expect(result.toNumber()).toBe(0);
  //   });
  // });

  // describe('when getting the decimals', () => {
  //   it('should return the decimals', async () => {
  //     // arrange
  //     // act
  //     const result: BigNumber = await contract.decimals();
  //
  //     // assert
  //     expect(result.eq(decimals)).toBe(true);
  //   });
  // });
  //
  // describe('when getting the name', () => {
  //   it('should return the name', async () => {
  //     // arrange
  //     // act
  //     const result: string = await contract.name();
  //
  //     // assert
  //     expect(result).toBe(name);
  //   });
  // });
  //
  // describe('when getting the symbol', () => {
  //   it('should return the symbol', async () => {
  //     // arrange
  //     // act
  //     const result: string = await contract.symbol();
  //
  //     // assert
  //     expect(result).toBe(symbol);
  //   });
  // });
  //
  // describe('when creating transfer transactions', () => {
  //   it('should create a payment transaction as well as an application write transaction', async () => {
  //     // arrange
  //     const account: Account = generateAccount();
  //     // act
  //     const transactions: Transaction[] = await contract.buildUnsignedTransferTransactions({
  //       amountInAtomicUnits: new BigNumber('1'),
  //       fromAddress: 'KREOFZLBZNCFTBNY4NQQMYZHPZLCCHR66FKZ3DQPXY6BIXXL4YIS232YAU',
  //       toAddress: account.addr,
  //     });
  //
  //     // assert
  //     expect(transactions.length).toBe(2);
  //   });
  //
  //   it('should only create an application write transaction', async () => {
  //     // arrange
  //     const account: Account = generateAccount();
  //     // act
  //     const transactions: Transaction[] = await contract.buildUnsignedTransferTransactions({
  //       amountInAtomicUnits: new BigNumber('1'),
  //       fromAddress: 'KREOFZLBZNCFTBNY4NQQMYZHPZLCCHR66FKZ3DQPXY6BIXXL4YIS232YAU',
  //       toAddress: account.addr,
  //     });
  //
  //     // assert
  //     expect(transactions.length).toBe(1);
  //   });
  // });
  //
  // describe('when getting the total supply', () => {
  //   it('should return the total supply', async () => {
  //     // arrange
  //     // act
  //     const result: BigNumber = await contract.totalSupply();
  //
  //     // assert
  //     expect(result.eq(totalSupply)).toBe(true);
  //   });
  // });
});
