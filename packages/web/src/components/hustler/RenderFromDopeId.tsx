import { useMemo } from 'react';
import RenderFromItemIds, { HustlerRenderProps } from 'components/hustler/RenderFromItemIds';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useRenderDopeQuery } from 'generated/graphql';
import { useDopeRles } from 'hooks/render';

interface RenderFromDopeIdProps extends Omit<HustlerRenderProps, 'itemRles'> {
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
  const { data, isFetching } = useRenderDopeQuery({
    where: {
      id,
    },
  });

  const itemRles = useDopeRles(sex, data?.dopes?.edges?.[0]?.node);

  if (isFetching || !itemRles) {
    return <LoadingBlockSquareCentered />;
  }

  return (
    <RenderFromItemIds
      bgColor={bgColor}
      body={body}
      facialHair={facialHair}
      hair={hair}
      itemRles={itemRles}
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
};

export default RenderFromDopeId;
