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
  button.selected {
    background-color: #434345;
    color: white;
    svg {
      path {
        fill: white;
    }
  }
`;

const ZoomControls = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
  const selected = ZOOM_WINDOWS.indexOf(config.zoomWindow);
  console.log(selected);
  return (
    <ZoomContainer>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[1],
            showVehicle: false,
            renderName: false,
          });
        }}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        className={selected === 1 ? 'selected' : ''}
        // backgroundColor={selected === 1 ? '#434345' : '#DEDEDD'}
        // _hover={{
        //   backgroundColor: selected === 1 ? '#434345' : 'unset',
        // }}
      >
        <PersonHeadIcon />
      </Button>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[0],
            showVehicle: false,
            renderName: config.renderName,
          });
        }}
        borderRadius="0"
        borderLeft="unset"
        borderRight="unset"
        className={selected === 0 ? 'selected' : ''}
      >
        <PersonIcon />
      </Button>
      <Button
        onClick={() => {
          setHustlerConfig({
            ...config,
            zoomWindow: ZOOM_WINDOWS[2],
            showVehicle: true,
            renderName: false,
          });
        }}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        className={selected === 2 ? 'selected' : ''}
      >
        <VehicleIcon />
      </Button>
    </ZoomContainer>
  );
};

export default ZoomControls;
