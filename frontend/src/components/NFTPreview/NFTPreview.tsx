import { useState } from 'react';

import clsx from 'clsx';

interface NFTPreviewProps {
  nft: NFT;
  isSelected: boolean;
  handleSelectNFT: (nft: NFT) => void;
}

const NFTMap: Record<string, string> = {
  '0x72b6dc1003e154ac71c76d3795a3829cfd5e33b9': '/1.png',
  '0xfd1dbd4114550a867ca46049c346b6cd452ec919': '/2.gif',
};

export const NFTPreview = ({
  nft,
  isSelected,
  handleSelectNFT,
}: NFTPreviewProps) => {
  const [isImageErr, setIsImageErr] = useState(false);

  return (
    <div className="p-1 border w-[200px] border-gray-900 rounded-sm">
      <button
        key={nft.token_address}
        type="button"
        className={clsx(
          'flex relative gap-2 flex-col items-center justify-center min-w-[190px] h-40 text-xl font-semibold border rounded-md'
        )}
        onClick={() => handleSelectNFT(nft)}
      >
        <div
          className={clsx(
            'w-6 h-6 absolute top-2 right-2 rounded-full bg-white border-2 border-gray-900 ',
            {
              'bg-red-400 ': isSelected,
            }
          )}
        />

        <div className="w-full h-40">
          <img
            src={NFTMap[nft.token_address] || nft.image}
            alt={'NFT image'}
            className={clsx('w-full h-40 object-cover rounded-sm', {
              hidden: isImageErr,
            })}
            onError={() => setIsImageErr(true)}
          />

          <video
            src={NFTMap[nft.token_address] || nft.image}
            className={clsx('w-full h-40 rounded-sm', {
              hidden: !isImageErr,
            })}
            autoPlay
            loop
          />
        </div>
      </button>

      <p className="my-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {nft.name}
      </p>
    </div>
  );
};
