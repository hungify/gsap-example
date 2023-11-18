import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import "./style.scss";
import wowSvg from "~/assets/scroll-to-explorer/wow.svg?inline";
import arrowRightSvg from "~/assets/scroll-to-explorer/arrow-right.svg?inline";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToExplore() {
  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");
    const totalPanels = panels.length;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top top",
          end: "+=" + (100 * totalPanels + 1) + "%",
          scrub: true,
          pin: true,
          markers: {
            startColor: "white",
            endColor: "white",
          },
        },
      })
      .to(".wrapper", {
        clipPath: "circle(71% at 50% 50%)",
        duration: 1 / totalPanels,
      })
      .to(panels, {
        xPercent: -100 * (totalPanels - 1),
        duration: 1,
        ease: "none",
      });
  }, []);

  return (
    <>
      <div className="section p-20">
        <div className="flex">
          <img src={wowSvg} alt="wow" />
          <h1 className="ml-20 text-9xl">FROM COOL IDEA</h1>
        </div>

        <h1 className="ml-14 text-9xl">TO INSTANTLY GREAT</h1>
        <div className="flex items-center">
          <h1 className="ml-[14rem] text-9xl">PRODUCT</h1>
          <div className="ml-[6rem] max-w-[13rem]">
            <span>
              A full-service design studio specializing in mobile and web
              design, branding, and animation.
            </span>
          </div>
          <div>
            <img src={arrowRightSvg} alt="arrow right" />
          </div>
        </div>
      </div>

      <div className="section wrapper">
        <div className="content">
          <div className="panel">
            <h1 className="text-9xl">FIRST SLIDE</h1>
          </div>
          <div className="panel green">
            <h1>SECOND SLIDE</h1>
          </div>
          <div className="panel purple">
            <h1>THIRD SLIDE</h1>
          </div>
          <div className="panel teal">
            <h1>FOURTH SLIDE</h1>
          </div>
          <div className="panel orange">
            <h1>FIFTH SLIDE</h1>
          </div>
        </div>
      </div>
      <div className="section"></div>
    </>
  );
}
