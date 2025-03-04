declare module "*.mdx" {
  import { ReactElement, ReactNode } from "react";
  const MDXComponent: (props: any) => ReactElement;
  export default MDXComponent;
}
