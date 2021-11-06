import styled from '@emotion/styled';
import { useReactiveVar } from '@apollo/client';
import { HustlerInitConfig } from '../../src/HustlerInitiation';
import { useRouter } from 'next/router';
import DesktopWindow from '../../components/DesktopWindow';
import Head from '../../components/Head';
import RenderFromLootId from '../../components/hustler/RenderFromLootId';


const HustlerFromLoot = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const router = useRouter();
  const { id } = router.query;

  const title = `Hustler Preview: ${id}`;

  const HustlerContainer = styled.div`
    background-color: ${hustlerConfig.bgColor};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    & > * {
      flex: 1;
    }
  `;
  
  return (
    <DesktopWindow title={title}>
      <Head title={title} />
      <HustlerContainer>
        <RenderFromLootId 
          id={id?.toString() ?? '1'} 
          sex={hustlerConfig.sex}
          body={hustlerConfig.body}
          hair={hustlerConfig.hair}
          facialHair={hustlerConfig.facialHair}
          bgColor={hustlerConfig.bgColor}
        />
      </HustlerContainer>
    </DesktopWindow>
  );
};

export default HustlerFromLoot;
