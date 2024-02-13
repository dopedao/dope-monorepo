import { getRandomDate } from 'utils/utils';
import { HustlerCustomization } from 'utils/HustlerConfig';
import { media } from 'ui/styles/mixins';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';
import RenderFromItemRles from 'features/hustlers/components/RenderFromItemRles';
import styled from '@emotion/styled';

const HustlerTitle = styled.h1`
  font-family: Dope !important;
  position: absolute;
  // left: 50%;
  // transform: translate(-50%, 0%);
  bottom: 0;
  z-index: 2;
  padding: 16px 32px;
  text-align: center;
  color: white;
  background-color: black;
  border: 4px solid white;
`;
const HustlerImage = styled.div`
  // position: absolute;
  // left: 50%;
  // transform: translate(-50%, 0);
  width: 100%;
  padding: 0 15%;
  bottom: 0px;
  right: 0px;
  top: 0px;
  ${media.tablet`
  padding: 0 5%;
  width: 100%;
`}
`;
const MugshotContainer = styled.div`
  position: relative;
  // height: 100%;
  // min-height: 400px;
  // background: #f2f2f2 url(/images/hustler/mugshot_bg.png) center center / contain no-repeat;
`;

interface Props {
  hustlerConfig: Partial<HustlerCustomization>;
  itemRles: string[];
}

const HustlerMugShot = ({ hustlerConfig, itemRles }: Props) => {
  const renderHustler = (zoomWindowIndex: 0 | 1 | 2 | 3) => {
    if (!itemRles) return;
    return (
      <RenderFromItemRles
        bgColor={hustlerConfig.bgColor}
        body={hustlerConfig.body}
        itemRles={itemRles}
        facialHair={hustlerConfig.facialHair}
        hair={hustlerConfig.hair}
        name={hustlerConfig.name}
        renderName={hustlerConfig.renderName}
        sex={hustlerConfig.sex}
        textColor={hustlerConfig.textColor}
        zoomWindow={ZOOM_WINDOWS[zoomWindowIndex]}
        ogTitle={hustlerConfig.title}
        dopeId={hustlerConfig.dopeId}
        showVehicle={zoomWindowIndex >= 2}
      />
    );
  };

  return <HustlerImage>{renderHustler(1)}</HustlerImage>;

  // return (
  //   {/*<MugshotContainer>
  //      <HustlerTitle>
  //       {hustlerConfig.name}
  //       <br />
  //       {getRandomDate('01/01/1980')}
  //     </HustlerTitle> */}
  //   {//</MugshotContainer>}
  // );
};

export default HustlerMugShot;
