// Verified against https://docs.robinhood.com/chain/connecting/ on 2026-09-22.
export const robinhoodTestnet = Object.freeze({
  name: 'Robinhood Chain Testnet',
  chainId: 46630,
  nativeCurrency: 'ETH',
  rpcUrl: 'https://rpc.testnet.chain.robinhood.com',
  explorerUrl: 'https://explorer.testnet.chain.robinhood.com',
});

export const robinhoodMainnet = Object.freeze({
  name: 'Robinhood Chain',
  chainId: 4663,
  nativeCurrency: 'ETH',
  rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
  explorerUrl: 'https://robinhoodchain.blockscout.com',
});

export const defaultNetwork = robinhoodTestnet;
