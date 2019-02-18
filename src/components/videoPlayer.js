import React from "react";
import injectSheet from "react-jss";

const styles = {
  container: {
    display: "flex",
    position: "relative",
    height: "70vh",
    width: "100vw",
    marginLeft: "-2rem"
  },
  player: {
    border: "none",
    height: "100%",
    width: "100%"
  }
};

export default injectSheet(styles)(({ classes, src, title }) => (
  <div className={classes.container}>
    <iframe
      title={title}
      className={classes.player}
      allowFullScreen="1"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      src={src}
    />
  </div>
));
