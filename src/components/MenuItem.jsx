import React from "react";
import styled from "@emotion/styled";
import arrow from "../images/arrow-right-white-32.png";

export const MenuItem = ({ children, ...attrs }) => {
  return (
    <Container {...attrs}>
      <Text>{children}</Text>
      <Icon src={arrow} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: #000;
  cursor: pointer;
  border-top: 1px solid #fff;
  justify-content: space-between;
  :first-of-type {
    border: none;
  }
  :hover {
    background-color: #111;
  }
`;

const Text = styled.p`
  color: #fff;
  margin: 0;
`;

const Icon = styled.img`
  width: 2rem;
  color: #fff;
`;
export default { MenuItem };
