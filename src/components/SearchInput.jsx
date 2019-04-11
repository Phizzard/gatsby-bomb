import React, { useState } from "react";
import styled from "@emotion/styled";
import { MdClose } from "react-icons/md";

const SearchInput = ({ className, placeHolder, allowToggle }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Container className={`${className ? className : ""}`}>
        <Input placeholder={placeHolder} />
        {allowToggle && (
          <CloseButton onClick={() => setShow(false)}>
            <MdCloseIcon />
          </CloseButton>
        )}
      </Container>
    );
  } else {
    return null;
  }
};

SearchInput.defaultProps = {
  placeHolder: "Search"
};

const Container = styled.div`
  position: relative;
  width: 100vw;
`;

const Input = styled.input`
  height: 100%;
  background-color: #000;
  width: 100%;
  border: none;
  padding: 0.5rem;
  color: #fff;
  font-size: 2rem;
  outline: none;
`;

const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  right: 2rem;
  bottom: 0;
  z-index: 999;
  outline: none;
  cursor: pointer;
`;
const MdCloseIcon = styled(MdClose)`
  font-size: 3rem;
  color: #fff;
`;

export default SearchInput;
