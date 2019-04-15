import React, { useState, useEffect, Fragment } from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import { Videos } from "../components/Videos";
import { Shows } from "../components/Shows";
import Layout from "../components/layout";
import SearchInput from "../components/SearchInput";

const SearchPage = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showsResults, setShowsResults] = useState([]);
  const [videosResults, setVideosResults] = useState([]);

  // Search Show Title
  useEffect(() => {
    if (searchValue === "") {
      setShowsResults([]);
    } else {
      let newShowsResults = search(
        searchValue,
        data.allGiantBombShow.edges,
        "title"
      );
      setShowsResults(newShowsResults);
    }
  }, [searchValue]);

  // Search Video Name
  useEffect(() => {
    if (searchValue === "") {
      setVideosResults([]);
    } else {
      let newVideosResults = search(
        searchValue,
        data.allGiantBombVideo.edges,
        "name"
      );

      setVideosResults(
        newVideosResults.sort((a, b) => {
          if (a.node.publish_date < b.node.publish_date) {
            return -1;
          }
          if (a.node.publish_date > b.node.publish_date) {
            return 1;
          }
          return 0;
        })
      );
    }
  }, [searchValue]);

  function search(searchValue, data, field) {
    let searchValueWords = searchValue
      .split(" ")
      .filter(value => value !== "" && value.length > 2);
    let regexString = "";

    if (searchValueWords.length) {
      searchValueWords.forEach((word, index) => {
        index === searchValueWords.length
          ? (regexString += `(${searchValueWords.join("|")})`)
          : (regexString += `(${searchValueWords.join("|")}).*`);
      });
      let searchRegex = new RegExp(regexString, "i");

      return data.filter(({ node }, i) => {
        return node[field].search(searchRegex) > -1;
      });
    } else {
      return [];
    }
  }

  return (
    <Layout>
      <TopSearchInput onInput={e => setSearchValue(e.target.value)} />
      {showsResults && showsResults.length > 0 && (
        <Fragment>
          <h2>Show Results</h2>
          <Shows data={showsResults} />
        </Fragment>
      )}
      <h2>Video Results</h2>
      {videosResults && videosResults.length > 0 && (
        <Videos direction="row" data={videosResults} />
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
          localImage {
            name
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
        }
      }
    }
    allGiantBombVideo {
      edges {
        node {
          id
          name
          slug
          length_seconds
          publish_date
          image {
            super_url
          }
          localImage {
            name
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
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
