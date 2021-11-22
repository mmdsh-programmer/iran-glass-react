import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { MoreButton } from "components/MoreButton";
import { gsap, Power4, Power2 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import useWindowSize from "hooks/useWindowSize";

export default function Home(props) {
  gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);
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

    new gsap.timeline({
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
              src={process.env.PUBLIC_URL + "/images/home/image-1.png"}
              className="reveal-image"
            />
          </div>
          <div
            className={`${styles["hero-image-container"]} ${styles["second"]} image-container parallax`}
            data-depth={width <= 768 ? 0.2 : 0.6}
          >
            <div className={`${styles["reveal-cover"]} reveal-cover`}></div>
            <img
              src={process.env.PUBLIC_URL + "/images/home/image-2.png"}
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
        <div className={`${styles["quote-border"]}`}>
          <div className={styles["quote-image-holder"]}>
            <img
              src={process.env.PUBLIC_URL + "/images/home/quote-image.png"}
              alt="quote"
              title="quote"
            />
          </div>
        </div>
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
                        src={process.env.PUBLIC_URL + "/images/home/work-1.jpg"}
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
                        src={process.env.PUBLIC_URL + "/images/home/work-2.jpg"}
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
