import { useEffect, useState } from 'react';
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

const ZoomControls = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
  const selected = ZOOM_WINDOWS.indexOf(config.zoomWindow);

  return (
    <ZoomContainer>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[1],
            isVehicle: false,
            renderName: false,
          });
        }}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        backgroundColor={selected == 1 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: selected == 1 ? '#434345' : 'unset',
        }}
      >
        <PersonHeadIcon color={selected == 1 ? '#fff' : undefined} />
      </Button>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[0],
            isVehicle: false,
            renderName: config.renderName,
          });
        }}
        borderRadius="0"
        borderLeft="unset"
        borderRight="unset"
        backgroundColor={selected == 0 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: selected == 0 ? '#434345' : 'unset',
        }}
      >
        <PersonIcon color={selected == 0 ? '#fff' : undefined} />
      </Button>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[2],
            isVehicle: true,
            renderName: false,
          });
        }}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        backgroundColor={selected == 2 ? '#434345' : '#DEDEDD'}
        _hover={{
          backgroundColor: selected == 2 ? '#434345' : 'unset',
        }}
      >
        <VehicleIcon color={selected == 2 ? '#fff' : undefined} />
      </Button>
    </ZoomContainer>
  );
};

export default ZoomControls;
