'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const heroSplit = new SplitText('.title', {
      type: 'chars, words',
    });

    const paragraphSplit = new SplitText('.subtitle', {
      type: 'lines',
    });

    // Apply text-gradient class once before animating
    heroSplit.chars.forEach((char: Element) =>
      char.classList.add('text-gradient')
    );

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.right-leaf', { y: 200 }, 0)
      .to('.left-leaf', { y: -200 }, 0)
      .to('.arrow', { y: 100 }, 0);

    const isMobile = window.innerWidth < 768;
    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
          });
        }
      };
    }
  }, []);

  return (
    <section id="hero" className="noisy">
      <h1 className="title relative z-20">MOJITO</h1>

      <img
        src="/templates/gsap-cocktails/images/hero-left-leaf.png"
        alt="left-leaf"
        className="left-leaf relative z-10"
      />
      <img
        src="/templates/gsap-cocktails/images/hero-right-leaf.png"
        alt="right-leaf"
        className="right-leaf relative z-10"
      />

      <div className="body relative z-20">
        <div className="content">
          <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic.</p>
            <p className="subtitle">
              Sip the Spirit <br /> of Summer
            </p>
          </div>

          <div className="view-cocktails">
            <p className="subtitle">
              Every cocktail on our menu is a blend of premium ingredients,
              creative flair, and timeless recipes — designed to delight your
              senses.
            </p>
            <a href="#cocktails">View cocktails</a>
          </div>
        </div>
      </div>

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src="/templates/gsap-cocktails/videos/output.mp4"
        className="!z-0"
      />
    </section>
  );
};

export default Hero;
