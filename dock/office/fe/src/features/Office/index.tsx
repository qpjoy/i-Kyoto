import { Outlet } from "react-router";

export default function Office() {
  return (
    <div>
      <h1>Office</h1>
      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
