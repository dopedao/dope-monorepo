import { css } from "@emotion/react";
import { Image } from "@chakra-ui/react";
import { media } from "ui/styles/mixins";
import styled from "@emotion/styled";

const Container = styled.div`
  margin: 32px;
  width: 40%;
  float:left;
  clear:both;
  &:nth-of-type(2n){
    float:right;
  }
`;

const TitleContainer = styled.h3`
  text-align: center;
  color: black;
  margin-bottom: 4px;
  text-shadow: 4px 4px rgba(0,0,0,0.1);
  font-size: var(--text-03) !important;
`;

const ImageContainer = styled.div`
  border:4px solid black;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.1);
  image-rendering: pixelated;
`;

const Date = styled.div`
  font-size: var(--text-00) !important;
  text-align: center;
  padding: 8px 0px;
  color: black;
`

interface Props {
  title: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;

}

const RoadmapItem = ({title, imageUrl, imageAlt, date}: Props) => {
  return(
    <Container>
      <TitleContainer>{title}</TitleContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={imageAlt} />
      </ImageContainer>
      <Date>{date}</Date>
    </Container>
  );
}

export default RoadmapItem;
