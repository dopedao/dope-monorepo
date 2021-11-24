import { useEffect, useMemo, useState } from 'react';
import { BigNumber, providers } from 'ethers';
import { NETWORK } from 'src/constants';
import { SwapMeet__factory } from '@dopewars/contracts';
import RenderFromItemIds, { HustlerRenderProps } from 'components/hustler/RenderFromItemIds';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useSwapMeet } from 'hooks/contracts';

interface RenderFromLootIdProps extends Omit<HustlerRenderProps, 'itemIds'> {
  id: string;
}

const RenderFromLootId = ({
  bgColor,
  body,
  facialHair,
  hair,
  id,
  name,
  renderName,
  sex,
  textColor,
  zoomWindow,
}: RenderFromLootIdProps) => {
  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const swapmeet = useSwapMeet();

  useEffect(() => {
    if (id) {
      swapmeet.itemIds(id).then(ids =>
        // Excludes vehicle (2) and orders layers
        setItemIds([ids[6], ids[8], ids[5], ids[1], ids[3], ids[4], ids[7], ids[0]]),
      );
    }
  }, [swapmeet, id]);

  if (itemIds) {
    return (
      <RenderFromItemIds
        bgColor={bgColor}
        body={body}
        facialHair={facialHair}
        hair={hair}
        itemIds={itemIds}
        name={name}
        renderName={renderName}
        sex={sex}
        textColor={textColor}
        zoomWindow={zoomWindow}
      />
    );
  } else {
    return <LoadingBlockSquareCentered />;
  }
};

export default RenderFromLootId;
