import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import injectSheet from "react-jss";
import Layout from "../components/layout";
import Shows from "../components/shows";
import SEO from "../components/seo";

const styles = {
  filters: {
    display: "flex",
    position: "relative",
    justifyContent: "flex-start"
  },
  filter: {
    cursor: "pointer",
    margin: "0 .5rem",
    color: props => (props.active === "true" ? "#fff" : "#999"),
    "&:first-child": {
      marginLeft: 0
    },
    "&:hover": {
      color: "#fff"
    }
  }
};

const IndexPage = ({ classes, data }) => {
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
    <Layout
      style={{
        marginTop: "1.45rem"
      }}
    >
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={classes.filters}>
        <Filter
          active={(activeFilter === "all").toString()}
          onClick={() => setActiveFilter("all")}
        >
          All
        </Filter>
        <Filter
          active={(activeFilter === "free").toString()}
          onClick={() => setActiveFilter("free")}
        >
          Free
        </Filter>
        <Filter
          active={(activeFilter === "premium").toString()}
          onClick={() => setActiveFilter("premium")}
        >
          Premium
        </Filter>
      </div>
      <Shows data={showList} />
    </Layout>
  );
};

const Filter = injectSheet(styles)(({ classes, children, ...atrs }) => (
  <span className={classes.filter} {...atrs}>
    {children}
  </span>
));

export const query = graphql`
  query ShowsQuery {
    allGiantBombShow {
      edges {
        node {
          id
          title
          slug
          premium
          image {
            small_url
            medium_url
          }
        }
      }
    }
  }
`;

export default injectSheet(styles)(IndexPage);
