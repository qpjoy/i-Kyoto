import Header from "@/components/Header";
import { Outlet } from "react-router";

import "./Root.scss";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
