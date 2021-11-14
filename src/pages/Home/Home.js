import React, { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import { MoreButton } from "components/MoreButton";
import { Footer } from "components/Footer";
import { gsap, Power4, Power2, Expo } from "gsap";
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

  //text animation functions
  const animateText = (ref, options) => {
    gsap.from(ref, 1.8, options);
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

  const imageMaskReveal = () => {
    const imageContainers = gsap.utils.toArray(".image-container");
    const revealCover = gsap.utils.toArray(".reveal-cover");
    const motionImages = gsap.utils.toArray(".reveal-image");
    let scrollTrigger = null;
    imageContainers.forEach((container, i) => {
      scrollTrigger = {
        trigger: container,
        start: "top bottom",
      };
      gsap.from(container, 1.4, {
        scale: 0.6,
        ease: Power2.easeOut,
        duration: 3,
        scrollTrigger: scrollTrigger,
      });

      gsap.from(revealCover[i], 2, {
        scale: 1.4,
        top: 0,
        ease: Power2.easeOut,
        duration: 3,
        scrollTrigger: scrollTrigger,
      });

      gsap.from(motionImages[i], 2, {
        autoAlpha: 0,
        scale: 0.2,
        top: 0,
        ease: Power2.easeOut,
        duration: 3,
        scrollTrigger: scrollTrigger,
      });
    });
  };

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

  const loadWorks = () => {
    // gsap.from(workRef.current, {
    //   // borderTopLeftRadius: 1000,
    //   // borderTopRightRadius: 1000,
    //   // // borderRadius: 1000,
    //   // yPercent: 20,
    //   ease: Power2.easeInOut,
    //   duration: 2,
    //   scrollTrigger: {
    //     trigger: workRef.current,
    //     start: "top bottom",
    //     pin: workRef.current,
    //   },
    // });
  };

  //reveal images on scroll

  useEffect(() => {
    //run main title animation
    animateText(mainTitleRef.current.children, {
      ease: Power4.easeOut,
      duration: 0.8,
      delay: 0.3,
      y: 700,
      skewY: "10deg",
      stagger: 0.3,
    });

    //run subtitle animations
    animateText(subTitleRef.current.children, {
      ease: Power4.easeOut,
      delay: 0.3,
      y: 500,
      skewY: "10deg",
      stagger: 0.3,
    });

    //run scroll down animations
    animateScrollDown();

    //run move hero text on scroll
    moveHeroItemsOnScroll();

    //run move items on scroll
    moveItemsOnScroll();

    //run text reveal mask animations
    textMaskReveal(descriptionRef.current, ".description", 0.04, "top center");
    textMaskReveal(quoteRef.current, ".quote-text", 0.08, "top center");

    //run image mask reveal animations
    imageMaskReveal();
    loadWorks();
  }, []);
  return (
    <>
      <main className={styles["main-body"]}>
        <section className={styles["hero"]}>
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
              className={`${styles["hero-image-container"]} ${styles["first"]} border-overlay image-container `}
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
              className={`${styles["hero-image-container"]} ${styles["second"]} image-container`}
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
                  <div
                    className={`${styles["item-image-holder"]} d-mobile-flex image-container`}
                  >
                    <h3
                      className={`${styles["item-title"]} d-mobile-none item-title horizontal-move`}
                      data-speed={width <= 768 ? 0 : 2}
                    >
                      Decoration Mirors
                    </h3>
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
                    Iran Glass Technology with more than 40 years of experience
                    and with the aim of meeting the needs of customers and
                    improving the quality of products since 2001 has changed its
                    name and created the Iranian glass technology brand (with
                    the brand name Gilda Glass)
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
                  <div
                    className={`${styles["item-image-holder"]} d-mobile-flex image-container`}
                  >
                    <h3
                      className={`${styles["item-title"]} d-mobile-none item-title-2 horizontal-move`}
                      data-speed="-2"
                    >
                      Smart Monitor Mirors
                    </h3>
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
                    data-speed="-2"
                  >
                    Smart Monitor Mirors
                  </h3>
                  <p className={styles["item-description"]}>
                    Iran Glass Technology with more than 40 years of experience
                    and with the aim of meeting the needs of customers and
                    improving the quality of products since 2001 has changed its
                    name and created the Iranian glass technology brand (with
                    the brand name Gilda Glass)
                  </p>
                  <MoreButton to="/" className={styles["info-button"]}>
                    More information
                  </MoreButton>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer classes={styles["custom-footer"]} />
    </>
  );
}
