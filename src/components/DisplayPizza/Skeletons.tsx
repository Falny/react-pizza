import React from "react";
import ContentLoader from "react-content-loader";

export const Skeletons = () => {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={600}
      viewBox="0 0 300 600"
      backgroundColor="#c2c2c2"
      foregroundColor="#ecebeb"
    >
      <circle cx="145" cy="122" r="122" />
      <rect x="0" y="322" rx="5" ry="5" width="280" height="85" />
      <rect x="0" y="425" rx="2" ry="2" width="95" height="40" />
      <rect x="183" y="425" rx="3" ry="3" width="95" height="40" />
      <rect x="0" y="278" rx="2" ry="2" width="280" height="25" />
    </ContentLoader>
  );
};
