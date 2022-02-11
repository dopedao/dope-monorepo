import { useMemo } from 'react';
import RenderFromItemIds, { HustlerRenderProps } from 'components/hustler/RenderFromItemIds';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useRenderDopeQuery } from 'generated/graphql';

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

  const itemRles = useMemo<string[] | undefined>(
    () =>
      data?.dopes?.edges?.at(0)?.node?.items?.reduce((prev, item) => {
        if (item.rles) {
          return sex == 'male' ? [...prev, item.rles.male] : [...prev, item.rles.female];
        } else if (item.base?.rles) {
          return sex == 'male' ? [...prev, item.base.rles.male] : [...prev, item.base.rles.female];
        }
        return prev;
      }, [] as string[]),
    [data, sex],
  );

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
