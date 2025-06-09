import { Outlet } from "react-router";
import Banner from "@/components/Banner";
import Sections from "@/components/Sections";

export default function Home() {
  return (
    <div>
      <Banner />
      {/* will either be <Home> or <Settings> */}
      <Sections />
      {/* will either be <Home> or <Settings> */}
      <Outlet />
    </div>
  );
}
