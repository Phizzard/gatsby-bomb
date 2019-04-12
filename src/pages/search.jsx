import React, { useState, useEffect, Fragment } from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SearchInput from "../components/SearchInput";

const SearchPage = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showsResults, setShowsResults] = useState([]);
  const [videosResults, setVideosResults] = useState([]);

  // Search Show Title
  useEffect(() => {
    let newShowsResults = data.allGiantBombShow.edges.filter(({ node }) =>
      node.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (searchValue === "") {
      setShowsResults([]);
    } else {
      setShowsResults(newShowsResults);
    }
  }, [searchValue]);

  // Search Video Name
  useEffect(() => {
    if (searchValue === "") {
      setVideosResults([]);
    } else {
      let searchValueWords = searchValue.split(" ");
      let regexString = "";
      searchValueWords.forEach((word, index) => {
        index === searchValueWords.length
          ? (regexString += `(${searchValueWords.join("|")})`)
          : (regexString += `(${searchValueWords.join("|")}).*`);
      });
      let searchRegex = new RegExp(regexString, "i");
      let newVideosResults = data.allGiantBombVideo.edges.filter(({ node }) => {
        return node.name.search(searchRegex) > -1;
      });
      setVideosResults(newVideosResults);
    }
  }, [searchValue]);

  return (
    <Layout>
      <TopSearchInput onInput={e => setSearchValue(e.target.value)} />
      {showsResults && showsResults.length > 0 && (
        <Fragment>
          <h2>Show Results</h2>
          <ul>
            {showsResults.map(({ node }) => (
              <li key={node.id}>{node.title}</li>
            ))}
          </ul>
        </Fragment>
      )}
      {videosResults && videosResults.length > 0 && (
        <Fragment>
          <h2>Video Results</h2>
          <ul>
            {videosResults.map(({ node }) => (
              <li key={node.id}>{node.name}</li>
            ))}
          </ul>
        </Fragment>
      )}
    </Layout>
  );
};

export const query = graphql`
  query SearchItemsQuery {
    allGiantBombShow {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
    allGiantBombVideo(limit: 100) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

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
