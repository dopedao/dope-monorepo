import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import RenderFromItemIds, { HustlerRenderProps } from 'components/hustler/RenderFromItemIds';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useSwapMeet } from 'hooks/contracts';

interface RenderFromDopeIdProps extends Omit<HustlerRenderProps, 'itemIds'> {
  id: string;
  ogTitle?: string;
}

const RenderFromDopeId = ({
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
  ogTitle,
  isVehicle,
}: RenderFromDopeIdProps) => {
  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const swapmeet = useSwapMeet();

  useEffect(() => {
    if (id) {
      swapmeet
        .itemIds(id)
        .then(ids =>
          setItemIds([ids[2], ids[6], ids[8], ids[5], ids[1], ids[3], ids[4], ids[7], ids[0]]),
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
        ogTitle={ogTitle}
        dopeId={id}
        isVehicle={isVehicle}
      />
    );
  } else {
    return <LoadingBlockSquareCentered />;
  }
};

export default RenderFromDopeId;
