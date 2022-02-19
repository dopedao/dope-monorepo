import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const Container = styled.div`
  clear: both;
  margin: 32px;
  background: rgba(0,0,0,0.75);
  margin-bottom: 32px;
  ${media.tablet`
    margin-bottom: 96px;
  `}
  .imageBox {
    position: relative;
    border:4px solid black;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.1);
    // image-rendering: pixelated;
    ${media.tablet`
      width: 40%;
      float:left;
    `}
  }
  .contentBox {
    color: white;
    text-shadow: 1px 1px rgba(0,0,0,0.5);
    max-height: 100%;
    padding: 16px;
    ${media.tablet`
      width: 60%;
      float:right;
    `}
  }
  &:nth-of-type(2n){
    ${media.tablet`
      .imageBox { float:right; }
      .contentBox { 
        float: left; 
      }
    `}
`;

const TitleContainer = styled.h3`
  margin: 0;
  margin-bottom: 16px;
  font-size: var(--text-02) !important;
  padding: 0 !important;
`;

const Date = styled.div`
  font-size: var(--text-00) !important;
  padding: 8px 16px;
  padding-top: 0px;
`;
const Content = styled.div`
  padding: 0px 16px;
  * {
    font-family: Courier, monospace !important;
  }
  a {
    text-decoration: underline;
    color: yellow;
    font-weight: bold;
  }
`;

interface Props {
  title: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
  imageReplacement?: ReactNode;
  complete?: boolean;
  children?: ReactNode;
}

const RoadmapItem = ({
  title,
  imageReplacement,
  imageUrl,
  imageAlt,
  date,
  complete,
  children,
}: Props) => {
  return (
    <Container>
      <div className="imageBox">
        {imageReplacement && imageReplacement}
        {imageUrl && imageAlt && <Image src={imageUrl} alt={imageAlt} width="100%" />}
        {complete && (
          <Image
            src="/images/icon/check.svg"
            alt="Completed"
            position="absolute"
            marginTop="-32px"
            marginLeft="8px"
            opacity="0.5"
          />
        )}
      </div>
      <div className="contentBox">
        <TitleContainer>{title}</TitleContainer>
        <Content>{children}</Content>
        <Date>{date}</Date>
      </div>
      <div
        css={css`
          clear: both;
        `}
      ></div>
    </Container>
  );
};

export default RoadmapItem;
