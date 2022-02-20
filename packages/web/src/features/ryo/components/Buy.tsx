import { Box, Button } from '@chakra-ui/react';
import { NavLink } from 'components/NavLink';
import { useDrugQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Container from './Container';
import ContainerFooter from './ContainerFooter';
import ContainerHeader from './ContainerHeader';
import DrugQuantityGauge from './DrugQuantityGauge';
import { buildIconSVG } from 'utils/svg-builder';
import { css } from '@emotion/react';

const Buy = () => {
  const router = useRouter();
  const { drugId } = router.query;

  const { data } = useDrugQuery(
    {
      id: drugId as string,
    },
    {
      enabled: !!drugId,
    },
  );

  const drug = useMemo(() => {
    if (!data?.items.edges) return;

    const [drugItem] = data.items.edges;

    if (!drugItem?.node) return;

    return drugItem.node;
  }, [data]);

  const rle = drug?.rles?.male ? drug?.rles?.male : drug?.base?.rles?.male;

  return (
    <Box>
      <NavLink href="/roll-your-own">
        <Button>Back</Button>
      </NavLink>
      <Container>
        <ContainerHeader>
          <span>BUY</span>
        </ContainerHeader>

        {rle && (
          <div
            css={css`
          width: 100%;
          height: 100%;
          overflow: hidden;
        }`}
            dangerouslySetInnerHTML={{ __html: buildIconSVG([rle]) }}
          />
        )}

        <ContainerFooter>
          <span>{drug?.name}</span>
        </ContainerFooter>
      </Container>
      <DrugQuantityGauge gaugeColor="#22B617" />
    </Box>
  );
};

export default Buy;
