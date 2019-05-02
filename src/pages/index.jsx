import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { ShowsSlider } from "../components/ShowsSlider";

const IndexPage = ({ data }) => {
  return (
    <StyledLayout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <ShowsSlider title="Active Shows" shows={data.activeShows.edges} />
      <ShowsSlider
        title="Premium Shows"
        shows={data.premiumShows && data.premiumShows.edges}
      />
      <ShowsSlider title="Free Shows" shows={data.freeShows.edges} />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  padding: 0.5rem;
`;

export const query = graphql`
  query ShowsQuery {
    activeShows: allGiantBombShow(filter: { active: { eq: true } }) {
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
    premiumShows: allGiantBombShow(filter: { premium: { eq: true } }) {
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
    freeShows: allGiantBombShow(filter: { premium: { eq: false } }) {
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
