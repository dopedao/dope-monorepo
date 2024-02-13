import { getRandomNumber } from 'utils/utils';
import { Image } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import useInterval from 'hooks/useInterval';

const Fireworks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomX = () => getRandomNumber(0, 100);
  const getRandomY = () => getRandomNumber(0, 100);
  const getRandomWidth = () => getRandomNumber(5, 33);

  const [posX, setPosX] = useState(getRandomX());
  const [posY, setPosY] = useState(getRandomY());
  const [containerWidth, setContainerWidth] = useState(getRandomWidth());

  const setRandomValues = () => {
    setPosX(getRandomX());
    setPosY(getRandomY());
    setContainerWidth(getRandomWidth());
  };

  useInterval(() => {
    setRandomValues();
  }, 2500);

  const FireworkContainer = styled.div`
    position: absolute;
    display: inline-block;
    z-index: 2;
    top: ${posY}%;
    left: ${posX}%;
    width: ${containerWidth}%;
  `;
  return (
    <FireworkContainer ref={containerRef}>
      <Image src="/images/lunar_new_year_2022/fireworks.gif" alt="fireworks" />
    </FireworkContainer>
  );
};

export default Fireworks;
