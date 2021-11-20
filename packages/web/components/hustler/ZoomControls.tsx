import { useState } from 'react';
import { HustlerInitConfig, ZoomWindow, ZOOM_WINDOWS } from 'src/HustlerConfig';
import { useReactiveVar } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import styled from '@emotion/styled';

const ZoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  width: 100%;
`;
 
const indexFromZoomValue = (
  zoomValue: ZoomWindow
) => {
  let index = ZOOM_WINDOWS.findIndex(window => window == zoomValue);
  if (index == -1) index = 0;
  return index;
}

const ZoomControls = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const [currentIndex, setCurrentIndex] = useState(
    indexFromZoomValue(hustlerConfig.zoomWindow ?? [0,0,0,0])
  );
  const minIndex = 0
  const maxIndex = ZOOM_WINDOWS.length - 1;

  const decrementZoomWindowIndex = () => {
    let newIndex = currentIndex - 1;
    if (minIndex > newIndex) newIndex = maxIndex;
    setCurrentIndex(newIndex);
    setHustlerConfig();
  }

  const incrementZoomWindowIndex = () => {
    let newIndex = currentIndex + 1;
    if (maxIndex < newIndex) newIndex = minIndex;
    setCurrentIndex(newIndex);
    setHustlerConfig();
  }

  const setHustlerConfig = () => {
    let renderName = hustlerConfig.renderName
    // for mugshots doesn't make sense to render name, because it gets cut off.
    if (currentIndex == 1) renderName = false;
    HustlerInitConfig({
      ...hustlerConfig, 
      zoomWindow: ZOOM_WINDOWS[currentIndex],
      renderName: renderName
    });
  }

  return (
    <ZoomContainer>
      <Button onClick={() => decrementZoomWindowIndex() }>
        <Image src="/images/icon/chevron-left.svg" alt="Zoom" />
      </Button>
      <Button onClick={() => incrementZoomWindowIndex() }>
        <Image src="/images/icon/chevron-right.svg" alt="Zoom" />
      </Button>
    </ZoomContainer>
  );
}
export default ZoomControls;
