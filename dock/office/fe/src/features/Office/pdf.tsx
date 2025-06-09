import { Outlet } from "react-router";

export default function PDF() {
  return (
    <div>
      <h1>PDF</h1>
      {/* will either be <PDF> or <Settings> */}
      <Outlet />
    </div>
  );
}
