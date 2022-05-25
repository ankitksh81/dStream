const config = require('../../../config');
const MoralisSDK = require('moralis/node');

class Moralis {
  constructor() {
    this.moralis = MoralisSDK;
    this.moralis.start({
      serverUrl: config.MORALIS_SERVER_URL,
      appId: config.MORALIS_APP_ID,
    });
  }

  async getNFTs(address) {
    try {
      return await this.moralis.Web3API.account.getNFTs({
        address,
        chain: config.MORALIS_CHAIN,
        limit: 10,
      });
    } catch (error) {
      return { result: [] };
    }
  }

  async verifyOwnership(address, contractAddress) {
    if (!contractAddress || !address) return false;
    const data = await this.moralis.Web3API.account.getNFTsForContract({
      address,
      chain: config.MORALIS_CHAIN,
      token_address: contractAddress,
    });
    return data.total > 0;
  }
}

module.exports = Moralis;
