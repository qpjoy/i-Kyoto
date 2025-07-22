import { Outlet } from "react-router";
import Banner from "@/components/Banner";
import Sections from "@/components/Sections";
import { useCountDown } from "@/utils/hooks/useCountdown";

export default function Home() {
  const registerCounter = useCountDown()[0];
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
