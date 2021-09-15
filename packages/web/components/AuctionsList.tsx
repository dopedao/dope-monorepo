import { useRouter } from 'next/router';
import { TokenThumbnail } from './CustomThumbnail';

import { ZoraToken } from '../pages';

export const AuctionsList = ({ tokens }: { tokens: ZoraToken[] }) => {
  return (
    <div css={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {tokens &&
        tokens.map(token => {
          return <TokenThumbnail key={token.nft.tokenData.id} token={token.nft.tokenData} />;
        })}
    </div>
  );
};
