import { Outlet } from "react-router";
import Footer from "@/components/Footer";
import "./index.scss";
import "./office.scss";

export default function Office() {
  return (
    <div className="body-container">
      {/* will either be <PDF> or <Settings> */}
      <Outlet />

      <Footer />
    </div>
  );
}
