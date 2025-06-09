import { Outlet } from "react-router";

export default function About() {
  return (
    <div>
      <h1>关于我</h1>
      {/* will either be <About> or <Settings> */}
      <Outlet />
    </div>
  );
}
