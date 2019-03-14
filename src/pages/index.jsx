import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import { Shows } from "../components/Shows";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const [showList, setShowList] = useState([...data.allGiantBombShow.edges]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    switch (activeFilter) {
      case "premium":
        setShowList(
          data.allGiantBombShow.edges.filter(({ node }) => node.premium)
        );
        break;
      case "free":
        setShowList(
          data.allGiantBombShow.edges.filter(({ node }) => !node.premium)
        );
        break;
      default:
        setShowList(data.allGiantBombShow.edges);
        break;
    }
  });

  return (
    <StyledLayout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Filters>
        <StyledFilter
          active={(activeFilter === "all").toString()}
          onClick={() => setActiveFilter("all")}
        >
          All
        </StyledFilter>
        <StyledFilter
          active={(activeFilter === "free").toString()}
          onClick={() => setActiveFilter("free")}
        >
          Free
        </StyledFilter>
        <StyledFilter
          active={(activeFilter === "premium").toString()}
          onClick={() => setActiveFilter("premium")}
        >
          Premium
        </StyledFilter>
      </Filters>
      <Shows data={showList} />
    </StyledLayout>
  );
};

const Filter = ({ children, ...atrs }) => <span {...atrs}>{children}</span>;

const Filters = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
`;

const StyledFilter = styled(Filter)`
  cursor: pointer;
  margin: 0 0.5rem;
  color: ${props => (props.active === true ? "#fff" : "#999")};
  &:first-of-type {
    margin-left: 0;
  }
  &:hover {
    color: #fff;
  }
`;

const StyledLayout = styled(Layout)`
  padding: 0.5rem;
`;

export const query = graphql`
  query ShowsQuery {
    allGiantBombShow {
      edges {
        node {
          id
          title
          slug
          premium
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

export default IndexPage;
