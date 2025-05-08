import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const TDK = ({ title, description, keywords }: any): any => {
  const [dynamicTitle, setDynamicTitle] = useState(title);
  const [dynamicDescription, setDynamicDescription] = useState(description);
  const [dynamicKeywords, setDynamicKeywords] = useState(keywords);

  useEffect(() => {
    setDynamicTitle(title);
    setDynamicDescription(description);
    setDynamicKeywords(keywords);
  }, [title, description, keywords]);
  return (
    <Helmet defaultTitle="PushCode">
      <title>{dynamicTitle}</title>
      <meta name="description" content={dynamicDescription} />
      <meta name="keywords" content={dynamicKeywords} />
    </Helmet>
  );
};

export default TDK;
