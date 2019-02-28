import React from "react";
import injectSheet from "react-jss";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexBasis: props => (props.flexBasis ? props.flexBasis : "100%")
  },
  item: {
    flexBasis: "100%",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
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
};
export default injectSheet(styles)(({ data, classes }) => {
  return (
    <div className={classes.container}>
      {data
        .map(({ node }) => (
          <div key={node.id} className={classes.item}>
            <img
              alt={node.name}
              className={classes.image}
              src={node.image.medium_url}
            />
            <p className={classes.title}>{node.name}</p>
          </div>
        ))
        .reverse()}
    </div>
  );
});
