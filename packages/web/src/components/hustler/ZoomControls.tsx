import { useState } from 'react';
import { ZoomWindow, ZOOM_WINDOWS } from 'utils/HustlerConfig';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import PersonHeadIcon from 'ui/svg/PersonHeadIcon';
import PersonIcon from 'ui/svg/PersonIcon';
import VehicleIcon from 'ui/svg/VehicleIcon';

const ZoomContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    margin: 0;
    flex-grow: 1;
  }
`;

const indexFromZoomValue = (zoomValue: ZoomWindow) => {
  let index = ZOOM_WINDOWS.findIndex(window => window == zoomValue);
  if (index == -1) index = 0;
  return index;
};

const ZoomControls = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    indexFromZoomValue(config.zoomWindow ?? [0, 0, 0, 0]),
  );
  const minIndex = 0;
  const maxIndex = ZOOM_WINDOWS.length - 1;

  const decrementZoomWindowIndex = () => {
    let newIndex = currentIndex - 1;
    if (minIndex > newIndex) newIndex = maxIndex;
    setCurrentIndex(newIndex);
    handleSetHustlerConfig();
  };

  const incrementZoomWindowIndex = () => {
    let newIndex = currentIndex + 1;
    if (maxIndex < newIndex) newIndex = minIndex;
    setCurrentIndex(newIndex);
    handleSetHustlerConfig();
  };

  const handleSetHustlerConfig = () => {
    let renderName = config.renderName;
    // for mugshots doesn't make sense to render name, because it gets cut off.
    if (currentIndex == 1) renderName = false;
    setHustlerConfig({
      ...config,
      zoomWindow: ZOOM_WINDOWS[currentIndex],
      renderName: renderName,
    });
  };

  return (
    <ZoomContainer>
      <Button
        onClick={() => decrementZoomWindowIndex()}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        backgroundColor={currentIndex == 0 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: currentIndex == 0 ? '#434345' : 'unset',
        }}
      >
        <PersonHeadIcon color={currentIndex == 0 ? '#fff' : undefined} />
      </Button>
      <Button
        onClick={() => incrementZoomWindowIndex()}
        borderRadius="0"
        borderLeft="unset"
        borderRight="unset"
        backgroundColor={currentIndex == 1 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: currentIndex == 1 ? '#434345' : 'unset',
        }}
      >
        <PersonIcon color={currentIndex == 1 ? '#fff' : undefined} />
      </Button>
      <Button
        onClick={() => {}}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        backgroundColor={currentIndex == 2 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: currentIndex == 2 ? '#434345' : 'unset',
        }}
      >
        <VehicleIcon color={currentIndex == 2 ? '#fff' : undefined} />
      </Button>
    </ZoomContainer>
  );
};

export default ZoomControls;
