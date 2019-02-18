import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Shows from "../components/shows";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Shows data={data.allGiantBombShow} />
    </Layout>
  );
};

export const query = graphql`
  query ShowsQuery {
    allGiantBombShow {
      edges {
        node {
          id
          title
          slug
          image {
            small_url
            medium_url
          }
        }
      }
    }
  }
`;

export default IndexPage;
