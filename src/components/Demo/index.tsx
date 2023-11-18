import { useLayoutEffect, useRef } from "react";
import "./style.scss";
import { gsap } from "gsap-trial";
import { SplitText, TextPlugin, GSDevTools } from "gsap-trial/all";

gsap.registerPlugin(TextPlugin, SplitText, GSDevTools);

GSDevTools.create();

export default function Demo() {
  const app = useRef<HTMLDivElement>(null);
  const tlList = useRef<gsap.core.Timeline[]>([]);
  const activeTl = useRef<gsap.core.Timeline>();
  const expandersRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(".expander", {
        backgroundColor: gsap.utils.wrap(["#f5ce5b", "#c570b6", "#78d6e0"]),
      });

      expandersRef.current.forEach((expander) => {
        const close = expander.querySelector(".close");

        const tl = gsap
          .timeline({ paused: true })
          .to(expander, { width: 200, duration: 0.4 })
          .from(
            close,
            { opacity: 0, scale: 0.4, duration: 0.1, x: "-=10" },
            "-=0.1"
          );
        tlList.current.push(tl);
      });
    }, app);

    return () => ctx.revert();
  }, []);

  const onOpen = (index: number) => () => {
    if (activeTl.current) {
      activeTl.current.reverse();
    }
    tlList.current[index]?.play();
    activeTl.current = tlList.current[index];
  };

  const onClose = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    tlList.current[index]?.reverse();
  };

  const onMouseEnter = ({ currentTarget }: React.MouseEvent) => {
    const split = new SplitText(currentTarget, { type: "lines" });
    gsap.from(split.lines, {
      opacity: 0,
      rotationX: -90,
      rotationY: -80,
      stagger: 0.2,
      transformOrigin: "50% 50% -200",
    });
  };

  return (
    <div ref={app} className="h-screen">
      <h1 id="title" className="block mb-40" onMouseEnter={onMouseEnter}>
        The Only Way To Do Great Work Is To Love What You Do.
        <br />
        If You Haven’t
        <br />
        Found It Yet, Keep Looking.
        <br />
        Don’t Settle.
      </h1>
      <div className="wrapper">
        {new Array(3).fill(0).map((_, index) => (
          <div
            className={`expander`}
            key={index}
            onClick={onOpen(index)}
            ref={(el) => (el ? expandersRef.current.push(el) : null)}
          >
            <div className="close" onClick={onClose(index)}>
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
