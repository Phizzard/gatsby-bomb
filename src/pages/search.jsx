import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SearchInput from "../components/SearchInput";

const SearchPage = () => {
  return (
    <Layout>
      <TopSearchInput />
      <h1>Search some stuff</h1>
    </Layout>
  );
};

const TopSearchInput = styled(SearchInput)`
  margin: 0 2%;
  width: auto;
  input {
    text-align: center;
    border-bottom-left-radius: 5rem;
    border-bottom-right-radius: 5rem;
    padding-right: 2.2rem;
    padding-left: 2.2rem;
    padding-top: 4rem;
    padding-bottom: 1rem;
    margin-top: -4rem;
    z-index: 10;
    @media screen and (min-width: ${props => props.theme.screens.tablet}) {
      text-align: left;
    }
  }
  @media screen and (min-width: ${props => props.theme.screens.tablet}) {
    margin: 0 19.9%;
  }
`;

export default SearchPage;
