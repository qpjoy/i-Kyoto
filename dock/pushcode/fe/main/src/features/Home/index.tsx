import "./Home.scss";
// import HomeSocial from "./HomeSocial";

// Image
// import LadyImage from "@/assets/img/lady_img.png";
// import Smiley from "@/assets/img/smiley_1.svg";
// import LadyBgPath from "@/assets/img/lady_bgpath.svg";
// import Star1 from "@/assets/img/star.svg";
// import Star2 from "@/assets/img/star_2.svg";
// import Star3 from "@/assets/img/star_3.svg";
// import medal from "@/assets/img/medal.svg";
// import { useEffect, useLayoutEffect } from "react";
// import gsap, { TimelineLite } from "gsap";
// import { FaArrowRight } from "react-icons/fa";

import Effecient from "@/assets/img/effecient.svg";
import Continus from "@/assets/img/continus.svg";
import Support from "@/assets/img/support.svg";
import Assurance from "@/assets/img/assurance.svg";
import Download from "../Components/Download";
function Home() {
  // useEffect(() => {
  //   const tl = new TimelineLite({ delay: 0.3 });

  //   tl.fromTo(
  //     ".home_title",
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       duration: 0.5,
  //       opacity: 1,
  //       y: 15,
  //       delay: 1.5,
  //       ease: "back.out(1.7)",
  //     }
  //   )
  //     .fromTo(
  //       ".profileBg",
  //       { opacity: 0.5, scale: 0 },
  //       { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
  //     )
  //     .fromTo(
  //       ".button",
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         duration: 0.5,
  //         opacity: 1,
  //         y: 20,
  //         ease: "bounce.out",
  //       }
  //     )
  //     .fromTo(
  //       ".homeSocial a",
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         y: 160,
  //         opacity: 1,
  //         stagger: 0.1,
  //         duration: 0.8,
  //         ease: "back.out(1.7)",
  //       }
  //     )
  //     .fromTo(".profileImg", { opacity: 0 }, { duration: 0.8, opacity: 1 })
  //     .fromTo(
  //       ".smiley",
  //       { opacity: 0.5, scale: 0 },
  //       { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
  //     )
  //     .fromTo(
  //       ".Star1",
  //       { opacity: 0.5, scale: 0 },
  //       { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
  //     )
  //     .fromTo(
  //       ".Star2",
  //       { opacity: 0.5, scale: 0 },
  //       { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
  //     )
  //     .fromTo(
  //       ".Star3",
  //       { opacity: 0.5, scale: 0 },
  //       { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
  //     )
  //     .fromTo(
  //       ".box1",
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         duration: 0.8,
  //         opacity: 1,
  //         xPercent: 100,
  //         ease: "back.out(1.7)",
  //       }
  //     )
  //     .fromTo(
  //       ".box2",
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         duration: 0.8,
  //         opacity: 1,
  //         xPercent: 100,
  //         ease: "back.out(1.7)",
  //       }
  //     );
  // }, []);

  return (
    <>
      <section className="home bd_grid" id="home">
        <div className="home_bg"></div>

        <div className="section-box zhibo-box">
          <div className="use-pushcode">
            <div className="use-title">
              直播就用
              <a>PushCode推流助手</a>
            </div>
            <div className="use-content">
              一键获取推流码，支持
              <a>OBS直播</a>
              推流，让直播更高效
            </div>

            <Download />
          </div>
        </div>

        {/* <div className="circle circleOne"></div>
      <div className="circle circleTwo"></div>
      <div className="circle circleThree"></div>
      <div className="home_data">
        <h1 className="home_title">
          Hi, I'am <br /> <span>Cathy James</span> <br /> Web Designer
        </h1>

        <a href="#" className="button">
          Contact
        </a>
      </div>

      <div className="homeSocial">
        {HomeSocial &&
          HomeSocial.map((social) => (
            <a href={social.iconLink} key={social.id}>
              {social.iconName}
            </a>
          ))}
      </div>

      <div className="home_img">
        <img src={LadyImage} alt="" className="profileImg" />
        <img src={LadyBgPath} alt="" className="profileBg" />

        <img src={Smiley} alt="" className="smiley" />
        <img src={Star1} alt="" className="Star1" />
        <img src={Star2} alt="" className="Star2" />
        <img src={Star3} alt="" className="Star3" />

        <div className="box box1">
          <div className="imageBox">
            <img src={Smiley} alt="" />
          </div>
          <div className="ContentBox">
            <h2>Ui/Ux</h2>
            <p>Type some content over here</p>
          </div>
        </div>

        <div className="box box2">
          <div className="imageBox">
            <img src={medal} alt="" />
          </div>
          <div className="ContentBox">
            <h2>Awards</h2>
            <p>Type some content over here</p>
          </div>
        </div>
      </div> */}
      </section>
      <section className="bd_grid">
        <div className="section-box why-us" id="why-us">
          <div className="why-title section_title_">为什么选择我</div>

          <div className="why-content">
            <div className="why-item">
              <img src={Effecient} />
              <span>便捷高效</span>
            </div>

            <div className="why-item">
              <img src={Continus} />
              <span>软件持续升级</span>
            </div>
            <div className="why-item">
              <img src={Support} />
              <span>全程技术支持</span>
            </div>
            <div className="why-item">
              <img src={Assurance} />
              <span>售后保障</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
