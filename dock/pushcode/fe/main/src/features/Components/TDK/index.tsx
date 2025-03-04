import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const TDK = ({ title, description, keywords }: any) => {
  const [dynamicTitle, setDynamicTitle] = useState(title);
  const [dynamicDescription, setDynamicDescription] = useState(description);
  const [dynamicKeywords, setDynamicKeywords] = useState(keywords);

  useEffect(() => {
    setDynamicTitle(title);
    setDynamicDescription(description);
    setDynamicKeywords(keywords);
  }, [title, description, keywords]);
  return (
    <div>
      <Helmet>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content={dynamicKeywords} />
      </Helmet>
    </div>
  );
};

export default TDK;
