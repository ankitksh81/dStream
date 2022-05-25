type ActivityType = 'created' | 'edited';

interface StreamEvent {
  _id: string;
  uuid: string;
  name: string;
  description: string;
  livepeer: {
    lastSeen: number;
    isActive: boolean;
    record: boolean;
    suspended: boolean;
    sourceSegments: number;
    transcodedSegments: number;
    sourceSegmentsDuration: number;
    transcodedSegmentsDuration: number;
    sourceBytes: number;
    transcodedBytes: number;
    name: string;
    profiles: [
      {
        name: string;
        bitrate: number;
        fps: number;
        width: number;
        height: number;
      }
    ];
    kind: string;
    userId: string;
    id: string;
    createdAt: number;
    streamKey: string;
    playbackId: string;
    createdByTokenName: string;
    createdByTokenId: string;
    multistream: {
      targets: any[];
    };
  };
  nft: {
    name: string;
    contractAddress: string;
    contractType: string;
    image: string;
  };
  startsAt: string;
  endsAt: string;
  playbackId: string;
  playbackUrl: string;
  permission: string;
  owner: string;
  createdAt: number;
}

interface Activity {
  activityType: ActivityType;
  by: User;
  timestamp: number;
}

interface User {
  _id: string;
  address: string;
  createdAt: number;
  __v: number;
  email: string;
  name: string;
  username: string;
}

interface NFT {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  amount: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  synced_at: string;
  is_valid: 0 | 1;
  syncing: 0 | 1;
  frozen: 0 | 1;
  image: string;
}
