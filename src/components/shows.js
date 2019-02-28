import React from "react";
import injectSheet from "react-jss";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const styles = ({ screens }) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    margin: ".75rem 0",
    position: "relative",
    flexBasis: "100%",
    [`@media screen and (min-width: ${screens.tablet})`]: {
      flexBasis: "31.5%"
    }
  },
  image: {
    position: "relative",
    alignSelf: "strech",
    height: "100%",
    width: "100%"
  },
  title: {
    position: "absolute",
    bottom: ".5rem",
    left: ".5rem",
    marginBottom: "0",
    padding: ".15rem .35rem",
    backgroundColor: "#242628",
    fontSize: "14px",
    borderRadius: ".15rem"
  }
});

export default injectSheet(styles)(({ classes, data }) => {
  return (
    <div className={classes.container}>
      {data.map(({ node }) => (
        <div key={node.id} className={classes.item}>
          <AniLink
            className={classes.image}
            to={`/${node.slug}`}
            swipe
            direction="left"
            duration={0.4}
          >
            <img
              className={classes.image}
              src={node.image.medium_url}
              alt={node.name}
            />
          </AniLink>
          <p className={classes.title}>{node.title}</p>
        </div>
      ))}
    </div>
  );
});
