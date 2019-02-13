import React from "react";

export default ({ pageContext }) => {
  const { title } = pageContext;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
