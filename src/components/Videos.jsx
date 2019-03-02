import React from "react";
import styled from "@emotion/styled";

export const Videos = ({ data }) => {
  return (
    <Container>
      {data
        .map(({ node }) => (
          <Item key={node.id}>
            <Image alt={node.name} src={node.image.medium_url} />
            <Title>{node.name}</Title>
          </Item>
        ))
        .reverse()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: ${props => (props.flexBasis ? props.flexBasis : "100%")};
`;

const Item = styled.div`
  flex-basis: 100%;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Title = styled.p`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  margin-bottom: 0;
  padding: 0.15rem 0.35rem;
  background-color: #242628;
  font-size: 14px;
  border-radius: 0.15rem;
`;
