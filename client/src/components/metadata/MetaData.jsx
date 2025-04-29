import React from "react";
import { Helmet } from "react-helmet";

function MetaData({ title, description, keywords, image }) {
  return (
    <Helmet>
      <title>{title || "Dokan - Online Shopping"}</title>
      <meta name="description" content={description || "Welcome to Dokan, your favorite online store."} />
      <meta name="keywords" content={keywords || "shopping, online store, fashion, electronics"} />
      <meta name="author" content="Pustam Rai" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={title || "Dokan - Online Shopping"} />
      <meta property="og:description" content={description || "Shop the latest trends at Dokan."} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

export default MetaData;
