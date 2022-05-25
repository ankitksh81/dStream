import { useState } from 'react';

import clsx from 'clsx';

interface NFTImagePreviewProps {
  nft: StreamEvent['nft'];
}

const NFTMap: Record<string, string> = {
  '0x72b6dc1003e154ac71c76d3795a3829cfd5e33b9': '/1.png',
  '0xfd1dbd4114550a867ca46049c346b6cd452ec919': '/2.gif',
};

export const NFTImagePreview = ({ nft }: NFTImagePreviewProps) => {
  const [isImageErr, setIsImageErr] = useState(false);

  return (
    <div className="w-full border border-gray-900 rounded-sm">
      <div
        className={clsx(
          'flex relative gap-2 flex-col items-center justify-center h-40 text-xl font-semibold  rounded-md'
        )}
      >
        <div className="w-full h-40">
          <img
            src={NFTMap[nft?.contractAddress!] || nft?.image}
            alt={'NFT image'}
            className={clsx('w-full h-40 object-cover rounded-sm', {
              hidden: isImageErr,
            })}
            onError={() => setIsImageErr(true)}
          />

          <video
            src={NFTMap[nft?.contractAddress!] || nft?.image}
            className={clsx('w-full h-40 rounded-sm', {
              hidden: !isImageErr,
            })}
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};
