import React from "react";
import Layout from "../components/layout";

export default ({ pageContext }) => {
  const { title } = pageContext;
  return (
    <Layout>
      <h1>{title}</h1>
    </Layout>
  );
};
