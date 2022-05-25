const Moralis = require('../../infra/utils/moralis');
const moralisInstance = new Moralis();

function formatNFT(nft) {
  const nftMetadata = JSON.parse(nft.metadata);
  nft.image = nftMetadata && nftMetadata.image;
  return nft;
}

async function getByAccount(address) {
  const { result } = await moralisInstance.getNFTs(address);
  return result.map((elem) => formatNFT(elem));
}

module.exports = getByAccount;
