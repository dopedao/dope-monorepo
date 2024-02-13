import RenderFromItemRles, {
  HustlerRenderProps,
} from 'features/hustlers/components/RenderFromItemRles';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import { useRenderDopeQuery } from 'generated/graphql';
import { useDopeRles } from 'hooks/render';
import { REFETCH_INTERVAL } from 'utils/constants';
import { Box } from '@chakra-ui/react';

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
  showVehicle,
}: RenderFromDopeIdProps) => {
  const { data, isFetching } = useRenderDopeQuery(
    {
      where: {
        id,
      },
    },
    {
      queryKey: ['renderDope', id],
      refetchInterval: REFETCH_INTERVAL,
    },
  );

  const node = data?.dopes?.edges?.[0]?.node || null;
  const itemRles = useDopeRles(sex, node);

  if (isFetching) {
    return <LoadingBlockSquareCentered />;
  }

  if (!isFetching && !node) {
    console.error(data);
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
        Error loading preview
      </Box>
    );
  }

  return (
    <RenderFromItemRles
      bgColor={bgColor}
      body={body}
      facialHair={facialHair}
      hair={hair}
      itemRles={itemRles || []}
      name={name}
      renderName={renderName}
      sex={sex}
      textColor={textColor}
      zoomWindow={zoomWindow}
      ogTitle={ogTitle}
      dopeId={id}
      showVehicle={showVehicle}
    />
  );
};

export default RenderFromDopeId;
