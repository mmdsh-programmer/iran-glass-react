import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { MoreButton } from "components/MoreButton";
import { gsap, Power4, Power2 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import SplitType from "split-type";
import useWindowSize from "hooks/useWindowSize";

export default function Home(props) {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const { width } = useWindowSize();

  //refs
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const scrollDownRef = useRef(null);
  const quoteRef = useRef(null);
  const descriptionRef = useRef(null);
  const workRef = useRef(null);
  const heroRef = useRef(null);

  //hero animation function
  const heroAnimations = () => {
    const tl = gsap.timeline();
    tl.from(mainTitleRef.current.children, {
      ease: Power4.easeOut,
      duration: 1.3,
      delay: 0.5,
      y: 700,
      stagger: 0.3,
    }).from(
      subTitleRef.current.children,
      {
        ease: Power4.easeOut,
        duration: 1.3,
        y: 500,
        stagger: 0.3,
      },
      "-=1.3"
    );
  };

  const parallax = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top center",
        scrub: 1,
      },
    });

    gsap.utils.toArray(".parallax").forEach((layer) => {
      const depth = layer.dataset.depth;
      const movement = -(layer.offsetHeight * depth);
      tl.to(
        layer,
        {
          y: movement,
          ease: Power4.easeOut,
        },
        0
      );
    });
  };

  //scroll down animation functions
  const animateScrollDown = () => {
    gsap.fromTo(
      scrollDownRef.current,
      { rotation: 0 },
      {
        rotation: 360,
        duration: 9,
        repeat: -1,
        ease: "linear",
      }
    );
  };

  const quoteAnimations = () => {
    new SplitType(quoteRef.current, {
      types: "lines",
      linesClass: "split-child",
    });

    new SplitType(quoteRef.current, {
      linesClass: "split-parent",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "center bottom - 20%",
          end: "bottom start",
        },
      })
      .from(quoteRef.current.parentNode, {
        opacity: 0,
        duration: 1.2,
        ease: Power4.easeOut,
      })
      .from(
        ".quote-text .word",
        {
          duration: 1.2,
          y: 500,
          stagger: 0.01,
          ease: Power4.easeOut,
        },
        "-=1.2"
      );

    gsap
      .timeline({
        defaults: { duration: 3, ease: "power1.out" },
        scrollTrigger: {
          trigger: quoteRef.current.parentNode,
          start: "top center",
          scrub: 3,
        },
      })
      .to(
        "#ellipse",
        {
          motionPath: {
            path: "#borderPath",
            align: "#borderPath",
            alignOrigin: [0.5, 0.5],
            start: width <= 575 ? 2.1 : 2.05,
            end: width <= 575 ? 2.3 : 2.2,
          },
        },
        0
      );
  };

  //reveal texts on scroll
  const textMaskReveal = (
    ref,
    parentClass,
    stagger = 0,
    start = "top bottom"
  ) => {
    new SplitType(ref, {
      types: "lines",
      linesClass: "split-child",
    });

    new SplitType(ref, {
      linesClass: "split-parent",
    });

    gsap.from(`${parentClass} .word`, {
      scrollTrigger: {
        trigger: ref,
        start: start,
      },
      duration: 1,
      y: 200,
      ease: "power4",
      stagger: stagger,
    });
  };

  //image mask reveal function
  const imageMaskReveal = () => {
    const imageContainers = gsap.utils.toArray(".image-container");
    const revealCover = gsap.utils.toArray(".reveal-cover");
    const motionImages = gsap.utils.toArray(".reveal-image");

    imageContainers.forEach((container, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
        },
      });

      tl.from(container, {
        scale: 0.6,
        ease: Power2.easeOut,
        duration: 1.3,
      });

      tl.from(
        revealCover[i],
        {
          scale: 1.4,
          top: 0,
          ease: Power2.easeOut,
          duration: 2,
          onComplete: () => {
            gsap.set(revealCover[i], { opacity: 0 });
          },
        },
        "-=1.3"
      );

      tl.from(
        motionImages[i],
        {
          autoAlpha: 0,
          scale: 0.2,
          top: 0,
          ease: Power2.easeOut,
          duration: 2,
        },
        "-=2"
      );
    });
  };

  //move hero items functions
  const moveHeroItemsOnScroll = () => {
    const items = gsap.utils.toArray(".hero-title-move");
    const animation = gsap.timeline({
      defaults: { ease: "powe2.out" },
      scrollTrigger: {
        trigger: document.body,
        start: "start start",
        end: "bottom start",
        scrub: 3,
      },
    });
    items.forEach((item) => {
      const speed = item.dataset.speed;
      const movement = item.offsetWidth * speed;
      animation.to(item, { x: movement }, 0);
    });
  };

  //move items on scroll function
  const moveItemsOnScroll = () => {
    gsap.utils.toArray(".horizontal-move").forEach((layer) => {
      const moveTextAnim = gsap.timeline({
        defaults: { ease: "powe4.out" },
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          scrub: 2,
        },
      });
      const speed = layer.dataset.speed;
      moveTextAnim.to(
        layer,
        { x: Math.round(-layer.offsetWidth / (speed * 3)) },
        0
      );
    });
  };

  //reveal section when enters the viewport
  const revealSection = () => {
    let path = document.querySelector(".path");
    const tween = gsap
      .timeline({ paused: true })
      .to(path, {
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        ease: Power2.easeIn,
        duration: 0.5,
      })
      .to(path, {
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        ease: Power2.easeOut,
        duration: 1,
      })
      .from(
        workRef.current.children[1],
        {
          y: 100,
          autoAlpha: 0,
          duration: 1,
        },
        "-=0.8"
      ); //load content
    ScrollTrigger.create({
      trigger: workRef.current,
      start: width <= 768 ? "top top+=300" : "top top",
      toggleActions: "play none none reverse",
      animation: tween.play(),
    });
  };

  useEffect(() => {
    //run hero animations
    heroAnimations();

    //run subtitle animations

    //run scroll down animations
    animateScrollDown();

    //run move hero text on scroll
    moveHeroItemsOnScroll();

    //run move items on scroll
    moveItemsOnScroll();

    //run text reveal mask animations
    textMaskReveal(descriptionRef.current, ".description", 0.01, "top center");

    //run image mask reveal animations
    imageMaskReveal();

    //run quote text reveal animation
    quoteAnimations();

    //run parallax animation
    parallax();

    //run reaveal section after entering the viewport
    revealSection();
  }, []);
  return (
    <motion.main
      initial={{ opacity: 0, top: 500 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "linear" }}
      className={styles["main-body"]}
    >
      <section className={styles["hero"]} ref={heroRef}>
        <div className={styles["background"]}></div>
        <div className={`container grid ${styles["container"]}`}>
          <h1
            className={`${styles["hero-title"]} ${styles["main-title"]} main-title`}
            ref={mainTitleRef}
          >
            <span className="block hero-title-move" data-speed="0.02">
              Iran
            </span>
            <span className="block hero-title-move" data-speed="0.035">
              Glass
            </span>
            <span
              className={`block ${styles["ml-custom"]} hero-title-move`}
              data-speed="0.045"
            >
              Technology
            </span>
          </h1>
          <div className={styles["hero-subtitle-container"]}>
            <h3 className={styles["hero-subtitle"]} ref={subTitleRef}>
              <span className="block">Decoration</span>
              <span className="block">& Smart Mirors</span>
            </h3>
            <img
              className={styles["scroll-down"]}
              src={process.env.PUBLIC_URL + "/images/home/scroll.svg"}
              alt="scroll down"
              ref={scrollDownRef}
            />
          </div>
          <div
            className={`${styles["hero-image-container"]} ${styles["first"]} border-overlay image-container parallax`}
            data-depth={width <= 768 ? -0.08 : -0.2}
          >
            <div className={`${styles["reveal-cover"]} reveal-cover`}></div>
            <img
              alt="Iran Glass"
              title="Iran Glass"
              src={process.env.PUBLIC_URL + "/images/home/image-1.avif"}
              className="reveal-image"
            />
          </div>
          <div
            className={`${styles["hero-image-container"]} ${styles["second"]} image-container parallax`}
            data-depth={width <= 768 ? 0.2 : 0.6}
          >
            <div className={`${styles["reveal-cover"]} reveal-cover`}></div>
            <img
              src={process.env.PUBLIC_URL + "/images/home/image-2.avif"}
              alt="hero"
              title="Iran Glass"
              className="reveal-image"
            />
          </div>
          <div className={styles["hero-description-container"]}>
            <p
              className={`${styles["hero-description"]} description`}
              ref={descriptionRef}
            >
              Iran Glass Technology with more than 40 years of experience and
              with the aim of meeting the needs of customers and improving the
              quality of products since 2001 has changed its name and created
              the Iranian glass technology brand (with the brand name Gilda
              Glass)
            </p>
            <MoreButton to="/" className={`${styles["more-button"]} content`}>
              More about us
            </MoreButton>
          </div>
        </div>
      </section>

      <section className={styles["quote"]}>
        <blockquote
          cite="#"
          className={`${styles["quote-text"]} quote-text`}
          ref={quoteRef}
        >
          Modern design is about realigning your priorities to help keep you
          focused on the important things in life
        </blockquote>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 712 1020"
          className={styles["quote-image-block"]}
        >
          <defs>
            <pattern
              id="pattern"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              viewBox="0 0 597 860"
            >
              <image
                width="597"
                height="860"
                xlinkHref={
                  process.env.PUBLIC_URL + "/images/home/quote-image.avif"
                }
              />
            </pattern>
          </defs>
          <g
            id="borderContainer"
            data-name="Path 1"
            transform="translate(12)"
            fill="none"
            strokeLinecap="round"
          >
            <path
              d="M 350 1 C 338.0948791503906 1 326.0888671875 1.60626220703125 314.3154907226562 2.8018798828125 C 302.7128601074219 3.980224609375 291.0541381835938 5.759521484375 279.6632385253906 8.09051513671875 C 257.2558898925781 12.67559814453125 235.2153625488281 19.51739501953125 214.1537475585938 28.42572021484375 C 193.4742431640625 37.17236328125 173.5288696289062 47.99835205078125 154.8715209960938 60.6031494140625 C 136.39111328125 73.0882568359375 119.0128784179688 87.426513671875 103.2197265625 103.2197265625 C 87.426513671875 119.0128784179688 73.0882568359375 136.39111328125 60.6031494140625 154.8715209960938 C 47.99835205078125 173.5288696289062 37.17236328125 193.4742431640625 28.42572021484375 214.1537475585938 C 19.51739501953125 235.2153930664062 12.67559814453125 257.255859375 8.09051513671875 279.6632690429688 C 5.759521484375 291.0541381835938 3.980224609375 302.712890625 2.8018798828125 314.3154907226562 C 1.60626220703125 326.0888671875 1 338.0948486328125 1 350 L 1 657 C 1 668.9051513671875 1.60626220703125 680.9111328125 2.8018798828125 692.6843872070312 C 3.980224609375 704.287109375 5.759521484375 715.9458618164062 8.09051513671875 727.3367919921875 C 12.67559814453125 749.7440185546875 19.51739501953125 771.7846069335938 28.42572021484375 792.8462524414062 C 37.17236328125 813.5257568359375 47.99835205078125 833.4711303710938 60.6031494140625 852.1284790039062 C 73.0882568359375 870.60888671875 87.426513671875 887.9869995117188 103.2197265625 903.7802734375 C 119.0128784179688 919.573486328125 136.39111328125 933.9117431640625 154.8715209960938 946.3968505859375 C 173.5288696289062 959.0015258789062 193.4742431640625 969.82763671875 214.1537475585938 978.57421875 C 235.2153625488281 987.4824829101562 257.2558898925781 994.3244018554688 279.6632385253906 998.9094848632812 C 291.0541381835938 1001.240478515625 302.7128601074219 1003.019775390625 314.3154907226562 1004.198120117188 C 326.0888671875 1005.393737792969 338.0948791503906 1006 350 1006 C 361.9051208496094 1006 373.9111328125 1005.393737792969 385.6843872070312 1004.198120117188 C 397.2871398925781 1003.019775390625 408.9458618164062 1001.240478515625 420.3367614746094 998.9094848632812 C 442.7439880371094 994.3244018554688 464.7846069335938 987.4824829101562 485.8462524414062 978.57421875 C 506.5257568359375 969.82763671875 526.4711303710938 959.0015258789062 545.1284790039062 946.3968505859375 C 563.60888671875 933.9117431640625 580.9869995117188 919.573486328125 596.7802734375 903.7802734375 C 612.573486328125 887.9869995117188 626.9117431640625 870.60888671875 639.3968505859375 852.1284790039062 C 652.0015258789062 833.4711303710938 662.82763671875 813.5257568359375 671.57421875 792.8462524414062 C 680.4824829101562 771.7846069335938 687.3244018554688 749.7440185546875 691.9094848632812 727.3367919921875 C 694.240478515625 715.9458618164062 696.019775390625 704.287109375 697.1981201171875 692.6843872070312 C 698.3937377929688 680.9111328125 699 668.9051513671875 699 657 L 699 350 C 699 338.0948486328125 698.3937377929688 326.0888671875 697.1981201171875 314.3154907226562 C 696.019775390625 302.712890625 694.240478515625 291.0541381835938 691.9094848632812 279.6632690429688 C 687.3244018554688 257.255859375 680.4824829101562 235.2153930664062 671.57421875 214.1537475585938 C 662.82763671875 193.4742431640625 652.0015258789062 173.5288696289062 639.3968505859375 154.8715209960938 C 626.9117431640625 136.39111328125 612.573486328125 119.0128784179688 596.7802734375 103.2197265625 C 580.9869995117188 87.426513671875 563.60888671875 73.0882568359375 545.1284790039062 60.6031494140625 C 526.4711303710938 47.99835205078125 506.5257568359375 37.17236328125 485.8462524414062 28.42572021484375 C 464.7846069335938 19.51739501953125 442.7439880371094 12.67559814453125 420.3367614746094 8.09051513671875 C 408.9458618164062 5.759521484375 397.2871398925781 3.980224609375 385.6843872070312 2.8018798828125 C 373.9111328125 1.60626220703125 361.9051208496094 1 350 1 M 350 0 C 543.2996215820312 0 700 156.7002563476562 700 350 L 700 657 C 700 850.2996215820312 543.2996215820312 1007 350 1007 C 156.7002563476562 1007 0 850.2996215820312 0 657 L 0 350 C 0 156.7002563476562 156.7002563476562 0 350 0 Z"
              stroke="none"
              fill="#cfd8dc"
              id="borderPath"
            />
          </g>
          <rect
            id="quoteImage"
            width="600"
            height="900"
            rx="300"
            transform="translate(62 54)"
            fill="url(#pattern)"
          />
          <circle
            id="ellipse"
            data-name="ellipse"
            cx="12.5"
            cy="12.5"
            r="12.5"
            transform="translate(0 417)"
            fill="#cfd8dc"
          />
        </svg>
      </section>

      <section className={styles["works"]} ref={workRef}>
        <svg
          className={styles["transition"]}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="path"
            dur="10s"
            fill="#424242"
            vectorEffect="non-scaling-stroke"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>

        <React.Fragment>
          <div>
            <header className={styles["works-header-holder"]}>
              <h2 className={`${styles["works-header"]}`}>
                We are producer of decoration & smart mirors
              </h2>
            </header>

            <div
              className={`container ${styles["container"]} ${styles["works-container"]}`}
            >
              <div
                className={`row wrap justify-center ${styles["custom-gap"]} ${styles["mobile-column"]}`}
              >
                <article
                  className={`row ${styles["work-item"]} ${styles["typical-item"]}`}
                >
                  <div className={`${styles["col"]} ${styles["image-col"]}`}>
                    <h3
                      className={`${styles["item-title"]} ${styles["item-title-bordered"]} d-mobile-none item-title horizontal-move`}
                      data-speed={width <= 768 ? 0 : 2}
                    >
                      Decoration Mirors
                    </h3>
                    <div
                      className={`${styles["item-image-holder"]} d-mobile-flex image-container`}
                    >
                      <div className="reveal-cover"></div>
                      <img
                        className={`${styles["item-image"]} reveal-image`}
                        src={
                          process.env.PUBLIC_URL + "/images/home/work-1.avif"
                        }
                        alt="work 1"
                      />
                    </div>
                  </div>
                  <div className={`${styles["col"]}`}>
                    <h3
                      className={`${styles["item-title"]} item-title horizontal-move`}
                      data-speed={width <= 768 ? 0 : 2}
                    >
                      Decoration Mirors
                    </h3>
                    <p className={styles["item-description"]}>
                      Iran Glass Technology with more than 40 years of
                      experience and with the aim of meeting the needs of
                      customers and improving the quality of products since 2001
                      has changed its name and created the Iranian glass
                      technology brand (with the brand name Gilda Glass)
                    </p>
                    <MoreButton to="/" className={styles["info-button"]}>
                      More information
                    </MoreButton>
                  </div>
                </article>

                <article
                  className={`row ${styles["work-item"]} ${styles["reverse"]}`}
                >
                  <div
                    className={`${styles["order-desktop-2"]} ${styles["col"]} ${styles["image-col"]}`}
                  >
                    <h3
                      className={`${styles["item-title"]} ${styles["item-title-bordered"]} item-title-bordered d-mobile-none item-title-2 horizontal-move`}
                      data-speed={width <= 768 ? 0 : -2}
                    >
                      Smart Monitor Mirors
                    </h3>
                    <div
                      className={`${styles["item-image-holder"]} d-mobile-flex image-container`}
                    >
                      <div className="reveal-cover"></div>
                      <img
                        className={`${styles["item-image"]} reveal-image`}
                        src={
                          process.env.PUBLIC_URL + "/images/home/work-2.avif"
                        }
                        alt="work 2"
                      />
                    </div>
                  </div>
                  <div className={`${styles["col"]}`}>
                    <h3
                      className={`${styles["item-title"]} item-title-2 horizontal-move`}
                      data-speed={width <= 768 ? 0 : -2}
                    >
                      Smart Monitor Mirors
                    </h3>
                    <p className={styles["item-description"]}>
                      Iran Glass Technology with more than 40 years of
                      experience and with the aim of meeting the needs of
                      customers and improving the quality of products since 2001
                      has changed its name and created the Iranian glass
                      technology brand (with the brand name Gilda Glass)
                    </p>
                    <MoreButton to="/" className={styles["info-button"]}>
                      More information
                    </MoreButton>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </React.Fragment>
      </section>
    </motion.main>
  );
}
