
/* ============ BLOCK 9 ============ */
gsap.registerPlugin(ScrollTrigger,SplitText,InertiaPlugin,ScrambleTextPlugin,ScrollSmoother,ScrollToPlugin,TextPlugin,CustomEase);


/* ============ BLOCK 12 ============ */
$(document).ready(function () {
  requestAnimationFrame(() => {
    let t = gsap.timeline();
    t.to(".page-transition_column", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    t.set(".page-transition", { display: "none" });
  });

  $("a:not([page-transition-ignore])").on("click", function (e) {
    let href = $(this).attr("href");
    if (
      $(this).prop("hostname") === window.location.host &&
      !href.includes("#") &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();

      // 🎚️ Fade out audio before leaving
      if (window.bgSound && bgSound.playing()) {
        bgSound.fade(bgSound.volume(), 0, 700);
      }

      const exitTimeline = gsap.timeline({
        onComplete: () => {
          window.location.href = href;
        }
      });

      exitTimeline.set(".page-transition", { display: "flex" });
      exitTimeline.fromTo(".page-transition_column", {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  });

  window.onpageshow = function (e) {
    if (e.persisted) window.location.reload();
  };
});


/* ============ BLOCK 14 ============ */
document.addEventListener("DOMContentLoaded", function() {
  // Pagina's waar ScrollSmoother NIET mag worden ingeladen
  const excludePages = ['/sell-your-painting', '/contact'];

  if (!excludePages.includes(window.location.pathname)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/devuncommon/gsap/ScrollSmoother.min.js';
    script.onload = () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: true,
        smoothTouch: 0.1,
        effects: true,
      });
    };
    document.head.appendChild(script);
  }
});


/* ============ BLOCK 15 ============ */
document.addEventListener('DOMContentLoaded', function() {
  const maskEls = document.querySelectorAll('.sound-icon_mask');
  const toggleBtn = document.querySelector('.sound-toggle');
  let soundEnabled = localStorage.getItem('soundEnabled') === 'true';

  // Initieel instellen
  maskEls.forEach(el => {
    gsap.set(el, { height: '10%' });
  });

  // Animaties per element met lichte variatie in max-height
  const maskAnimations = Array.from(maskEls).map((el, i) => {
    const maxHeight = 45 + (i % 3) * 5; // 45%, 50%, 55% afwisselend
    return gsap.to(el, {
      height: `${maxHeight}%`,
      duration: 0.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: !soundEnabled
    });
  });

  function updateMaskAnimations() {
    soundEnabled = localStorage.getItem('soundEnabled') === 'true';

    maskAnimations.forEach((anim, index) => {
      const el = maskEls[index];
      if (!el) return;

      if (soundEnabled) {
        gsap.set(el, { height: '10%' });
        anim.play();
      } else {
        anim.pause();
        gsap.to(el, { height: '10%', duration: 0.2, ease: 'sine.inOut' });
      }
    });
  }

  updateMaskAnimations();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      setTimeout(updateMaskAnimations, 50);
    });
  }
});


/* ============ BLOCK 16 ============ */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  const shouldAnimate = (el) => {
    const attr = el.closest("[data-gsap-text]");
    return !attr || attr.getAttribute("data-gsap-text") !== "false";
  };

  // Mark all targets so CSS can hide them BEFORE the scrolltrigger fires
  const headings   = Array.from(document.querySelectorAll("h1, h2, h3, h4")).filter(shouldAnimate);
  const paragraphs = Array.from(document.querySelectorAll("p")).filter(shouldAnimate);
  const extraElements = Array.from(document.querySelectorAll("[data-gsap-text='true']")).filter(shouldAnimate);

  [...headings, ...paragraphs, ...extraElements].forEach(el => {
    el.setAttribute("data-gsap-reveal", ""); // matches CSS selector
  });

  // SplitText depends on fonts for correct line breaks
  document.fonts.ready.then(() => {

    headings.forEach(heading => {
      const split = new SplitText(heading, { type: "lines" });

      // make visible right before we animate
      gsap.set(heading, { visibility: "visible" });

      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "cubic-bezier(.509, .188, .041, .989)",
        stagger: 0.15
      });
    });

    paragraphs.forEach(p => {
      const split = new SplitText(p, { type: "lines" });

      gsap.set(p, { visibility: "visible" });

      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: p,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "cubic-bezier(.509, .188, .041, .989)",
        stagger: 0.1
      });
    });

    ScrollTrigger.refresh();
  });

  // Non-split elements
  extraElements.forEach(el => {
    gsap.set(el, { visibility: "visible" });

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out"
    });
  });
});


/* ============ BLOCK 17 ============ */
gsap.registerPlugin(ScrollTrigger);

  // Controleer de waarde van data-nav-ignore
  const navIgnore = document.querySelector("[data-nav-ignore]")?.getAttribute("data-nav-ignore");
  const navTrigger = document.querySelector("[nav-scroll-trigger]"); // Controleer of nav-scroll-trigger bestaat

  // Als data-nav-ignore NIET "true" is en nav-scroll-trigger bestaat, voer het script uit
  if (navIgnore !== "true" && navTrigger) {
    ScrollTrigger.create({
      trigger: navTrigger, // Gebruik de gevonden nav-scroll-trigger element
      start: "top top",   // Startpunt: wanneer de top van het element de top van het viewport raakt
      onEnter: () => {
        // Scroll naar beneden voorbij de trigger
        document.querySelector(".nav")?.classList.add("is-nav-small");
        document.querySelector(".navbar")?.classList.add("is-nav-small");
      },
      onLeaveBack: () => {
        // Scroll naar boven terug boven de trigger
        document.querySelector(".nav")?.classList.remove("is-nav-small");
        document.querySelector(".navbar")?.classList.remove("is-nav-small");
      }
    });
  }


/* ============ BLOCK 21 ============ */
document.addEventListener("DOMContentLoaded", function () {
  // Controleer of de schermbreedte groter is dan 992 pixels
  if (window.innerWidth > 992) {
    const navSpotlightItems = document.querySelectorAll(
      '[hover-spotlight="list"] [hover-spotlight="item"]'
    );

    navSpotlightItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const siblings = item.parentNode.querySelectorAll(
          '[hover-spotlight="item"]'
        );
        siblings.forEach((sibling) => {
          if (sibling !== item) {
            gsap.to(sibling, {
              opacity: 0.5,
              duration: 0.3, // Update duur naar 0.3 seconden
              ease: "cubic-bezier(.509, .188, .041, .989)" // Toevoegen van cubic-bezier easing
            });
          }
        });
      });

      item.addEventListener("mouseleave", function () {
        const siblings = item.parentNode.querySelectorAll(
          '[hover-spotlight="item"]'
        );
        siblings.forEach((sibling) => {
          gsap.to(sibling, {
            opacity: 1,
            duration: 0.3, // Update duur naar 0.3 seconden
            ease: "cubic-bezier(.509, .188, .041, .989)" // Toevoegen van cubic-bezier easing
          });
        });
      });
    });
  }
});


/* ============ BLOCK 24 ============ */
window.addEventListener("load", function() {
    const heroVideo = document.querySelector("#hero-video");
    if (heroVideo) {
      heroVideo.style.display = "block";
    }
  });


/* ============ BLOCK 25 ============ */
document.addEventListener("DOMContentLoaded", function() {
  const videos = document.querySelectorAll("video");
  
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
        entry.target.currentTime = 0;
      }
    });
  }, { threshold: 0.25 }); // 25% van video zichtbaar voordat deze afspeelt
  
  videos.forEach(video => {
    videoObserver.observe(video);
  });
});


/* ============ BLOCK 26 ============ */
document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector("[data-popup-trigger]");
  const popupText = document.querySelector(".popup-text");
  const popupTextInner = popupText?.querySelector(".popup-text-inner");

  if (trigger && popupText && popupTextInner) {
    const fadeIn = () => {
      popupText.classList.add("open");
      gsap.to(popupTextInner, { opacity: 1, duration: 0.4, delay: 0.5 });
    };

    const fadeOut = () => {
      gsap.to(popupTextInner, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          popupText.classList.remove("open");
          popupTextInner.classList.remove("visible");
        }
      });
    };

    gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          fadeIn();
          popupTextInner.classList.add("visible");
        },
        onLeaveBack: fadeOut
      }
    });
  }
});


/* ============ BLOCK 27 ============ */
document.addEventListener("DOMContentLoaded", () => {
    const popupToggle = document.querySelector(".popup-toggle");
    const popupComp = document.querySelector(".popup-comp");
    let popupShown = false;
    let popupDismissed = false;

    function showPopup() {
        if (popupDismissed || popupShown) return;
        popupShown = true;
        popupComp.classList.remove("compact");
        gsap.to(popupComp, { autoAlpha: 1, duration: 0.3 });
    }

    function hidePopup() {
        gsap.to(popupComp, {
            autoAlpha: 0,
            duration: 0.3,
            onComplete: () => {
                popupComp.classList.add("compact");
                popupComp.style.display = "none";
            },
        });
    }

    popupToggle.addEventListener("click", () => {
        popupDismissed = true;
        hidePopup();
    });

    const popupTrigger = document.querySelector("[data-popup-trigger]");
    if (popupTrigger) {
        gsap.timeline({
            scrollTrigger: {
                trigger: popupTrigger,
                start: "top center",
                onEnter: showPopup,
                once: true
            }
        });
    }

    // Startconditie: compact, zichtbaar
    popupComp.classList.add("compact");
    popupComp.style.opacity = "1";
    popupComp.style.display = "block";
});


/* ============ BLOCK 28 ============ */
document.addEventListener("DOMContentLoaded",(()=>{window.history.scrollRestoration="manual";const o=window.ScrollSmoother&&ScrollSmoother.get();if(o?o.scrollTop(0,!0):window.scrollTo(0,0),"undefined"==typeof gsap||"undefined"==typeof CustomEase)return void console.error("GSAP of CustomEase is niet geladen. Controleer je CDN-links.");gsap.registerPlugin(CustomEase,ScrollTrigger);const e=CustomEase.create("custom",".87,0,.13,1");function t(){gsap.set(".video-container",{scale:0,rotation:20}),gsap.to(".hero",{clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1,ease:e,onStart:()=>{gsap.to(".video-container",{scale:1,rotation:0,clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:1.25,ease:e}),gsap.set([".navbar",".popup-comp"],{visibility:"visible"}),gsap.to(".navbar",{y:"0%",opacity:1,duration:1,ease:"power2.out",delay:.7,onComplete:()=>{gsap.to(".navbar_menu > *",{opacity:1,y:0,duration:.6,ease:"power2.out",stagger:.15,onComplete:()=>{document.body.style.overflow="visible",document.querySelector(".navbar-mask")?.style.setProperty("overflow","visible"),o&&o.paused(!1)}})}}),gsap.to(".popup-comp",{y:"0%",opacity:1,duration:1,ease:"power2.out",delay:.5})}})}if(!!localStorage.getItem("introPlayed"))return gsap.set(".intro-signature",{opacity:0,display:"none"}),gsap.set(".intro-content",{opacity:0,display:"none"}),gsap.set(".hero-outline_wrap",{visibility:"visible",scale:1,opacity:1}),document.body.style.overflow="visible",o&&o.paused(!1),void t();document.body.style.overflow="hidden",o&&o.paused(!0),gsap.set(".intro-content",{opacity:0}),gsap.set(".navbar",{y:"-150%",opacity:0,visibility:"hidden"}),gsap.set(".popup-comp",{y:"150%",opacity:0,visibility:"hidden"}),gsap.set(".hero-outline_wrap",{scale:1.1,opacity:0,visibility:"hidden"}),gsap.set(".navbar_menu > *",{opacity:0,y:20}),gsap.set(".intro-signature",{opacity:1});const i=gsap.timeline();i.to(".hero-outline_wrap",{visibility:"visible",opacity:1,scale:1,duration:1,ease:"power2.out"},"+=0.3"),i.to(".intro-signature",{opacity:0,duration:.6,ease:"power2.out"},"+=1.0"),i.to(".intro-content",{visibility:"visible",opacity:1,duration:.6,ease:e},">+=0.1"),document.querySelectorAll("#with-audio, #without-audio").forEach((o=>{o.addEventListener("click",(()=>{gsap.to(".intro-content",{opacity:0,duration:.6,ease:"power2.out",onComplete:()=>{document.querySelector(".intro-content").style.display="none",t(),localStorage.setItem("introPlayed","true")}})}))}))}));


/* ============ BLOCK 30 ============ */
document.addEventListener("DOMContentLoaded",(function(){window.innerWidth>991&&(gsap.registerPlugin(ScrollTrigger),ScrollTrigger.create({trigger:".usp-cards-section",start:"top top",end:"bottom bottom",pin:".panel",pinSpacing:!1,scrub:!1}))}));


/* ============ BLOCK 31 ============ */
gsap.registerPlugin(ScrollTrigger),window.addEventListener("DOMContentLoaded",(()=>{if(window.innerWidth>991){const e=document.querySelector(".usp-cards-section .pin-height"),t=document.querySelectorAll(".uc-circle");gsap.fromTo(".usp-cards-section .uc-circles",{y:"0%"},{y:"0%",ease:"none",scrollTrigger:{trigger:e,start:"top top",end:"bottom bottom",pin:".usp-cards-section .uc-container",scrub:!0}});let r=3,o=-((t.length-1)*r/2);const n=(e.clientHeight-window.innerHeight)/t.length;t.forEach(((t,c)=>{gsap.to(t,{rotation:o,ease:"power1.out",scrollTrigger:{trigger:e,start:"top top-="+n*c,end:"+="+n,scrub:!0}}),gsap.to(t.querySelector(".uc-card"),{rotation:o,y:"-50%",ease:"power1.out",scrollTrigger:{trigger:e,start:"top top-="+n*c,end:"+="+n,scrub:!0}}),o+=r}))}}));


/* ============ BLOCK 32 ============ */
gsap.registerPlugin(ScrollTrigger),window.addEventListener("DOMContentLoaded",(()=>{gsap.to(".scroll",{autoAlpha:0,duration:.2,scrollTrigger:{trigger:".mwg_effect031",start:"top top",end:"top top-=1",toggleActions:"play none reverse none"}});const e=document.querySelectorAll(".mwg_effect031 .slide");e.forEach(((t,r)=>{const o=t.querySelector(".content-wrapper"),n=t.querySelector(".content"),a=window.matchMedia("(max-width: 991px)").matches?"top 10%":"top 20%";r!==e.length-1&&gsap.to(n,{rotationZ:10*(Math.random()-.5),scale:.7,rotationX:40,ease:"power1.in",scrollTrigger:{pin:o,trigger:t,start:a,end:"+="+window.innerHeight,scrub:!0}}),gsap.to(n,{autoAlpha:0,ease:"power1.in",scrollTrigger:{trigger:n,start:"top -80%",end:"+="+.2*window.innerHeight,scrub:!0}})}))}));
