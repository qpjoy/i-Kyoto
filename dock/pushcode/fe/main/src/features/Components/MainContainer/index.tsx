import "./MainContainer.css";

import Home from "@/features/Home";
// import About from "@/features/About";
import Footer from "../Footer";

import LiveSection from "@/features/Lives";
// import Member from "@/features/Member";

function MainContainer() {
  return (
    <main className="mainBox">
      {/* Home Section */}
      <Home />
      {/* About Section */}
      {/* <About /> */}
      {/* Project Section */}
      <LiveSection />

      {/* <Member /> */}
      <Footer />
    </main>
  );
}

export default MainContainer;
