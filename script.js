document.addEventListener('DOMContentLoaded', function () {
    //lenis scroll setup
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

    function revealSpan() {
        document.querySelectorAll('.reveal').forEach((elem) => {
            let parent = document.createElement("span");
            let child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");

            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);
            elem.innerHTML = "";
            elem.appendChild(parent);
        });
    }
    revealSpan();

    // Add any additional functionality or animations here  
    let tl = gsap.timeline();

    tl.from(".child span", {
        opacity: 0,
        x: "100",
        duration: 2,
        stagger: 0.2,
        delay: 1,
        ease: "Power3.easeInOut",
    });

    tl.to(".parent .child", {
        y: "-100%",
        duration: 1,
        ease: "Circ.easeInOut",
    });

    tl.to(".loader1", {
        height: "0",
        duration: 1,
        ease: "Power3.easeInOut",
        onComplete: () => {
            document.querySelector(".loader1").style.display = "none";
        }
    }, "-=0.5");

    //Home Pg pin animation
    gsap.to("#page1", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 2,
            invalidateOnRefresh: true,
        }
    });


    //menus animations
    const hamburger = document.querySelector(".hamburger");
    const navBox = document.querySelector(".mobile-nav-box");
    const navItems = document.querySelectorAll(".mobile-nav-list .item");
    const contactItems = document.querySelectorAll(".animated-div p, .animated-div span, .animated-div a");
    const socialItems = document.querySelectorAll(".social-media a");
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");

    gsap.set(navBox, { x: '100%' }); // 💡 Start off-screen
    document.querySelectorAll('.nav-links').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute("href");

            // ✅ Check if it's an internal anchor link (starts with "#")
            if (href.startsWith("#")) {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 100
                        },
                        ease: "power2.out"
                    });
                }
            }
        });
    });

    const tl0 = gsap.timeline({
        paused: true,
        reversed: true,
        onReverseComplete: () => {
            // Reset hamburger lines
            line1.classList.remove("rotate-45", "translate-x-[0px]", "translate-y-[4px]");
            line2.classList.remove("-rotate-45", "translate-x-[0px]", "translate-y-[-2px]");
        }
    });

    tl0.to(navBox, {
        x: 0,
        duration: 1,
        ease: "power4.out"
    })
        .from(navItems, {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .from(contactItems, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.4")
        .from(socialItems, {
            scale: 0.5,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");

    hamburger.addEventListener("click", () => {
        if (gsap.isTweening(navBox)) return;

        if (tl0.reversed()) {
            tl0.play();
            line1.classList.add("rotate-45", "translate-x-[0px]", "translate-y-[4px]");
            line2.classList.add("-rotate-45", "translate-x-[0px]", "translate-y-[-2px]");
        } else {
            tl0.reverse();
        }
    });

    document.querySelectorAll('.mobile-nav-list .item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = link.getAttribute("href");

            if (targetID !== "#" && document.querySelector(targetID)) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetID,
                        offsetY: 100,
                    },
                    ease: "power2.out"
                });
            }

            // Close nav and reset hamburger if open
            if (!tl0.reversed()) {
                tl0.reverse();
                // Reset hamburger (because it only resets on onReverseComplete)
                line1.classList.remove("rotate-45", "translate-x-[0px]", "translate-y-[4px]");
                line2.classList.remove("-rotate-45", "translate-x-[0px]", "translate-y-[-2px]");
            }
        });
    })

    // Social Media Button Animation
    document.querySelectorAll(".social-link").forEach((btn) => {
        btn.addEventListener("click", () => {
            gsap.fromTo(btn,
                {
                    scale: 1,
                    backgroundColor: "#4e4b47"
                },
                {
                    scale: 0.94,
                    backgroundColor: "#5c5954",
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                }
            );
        });
    });





    function AnimateSplitTextScroll({
        elem,                // element selector, e.g. ".heading"
        triggerElem,
        type = "words",      // "lines" | "words" | "chars"
        mask = null,         // "lines" | "words" | "chars" (optional)
        start = "top 75%",   // scroll start position
        end = "bottom top",  // scroll end position
        once = true,         // play once only
        markers = false,     // debug markers
        duration = 1,        // animation duration
        ease = "expo.out",   // easing
        yPercent = 100,      // Y movement
        opacity = 0,         // opacity start
        stagger = 0.1        // stagger delay
    }) {
        if (!gsap || !ScrollTrigger || !SplitText) {
            console.error("GSAP / SplitText / ScrollTrigger not loaded!");
            return;
        }

        // Wait for fonts to load (avoid SplitText font bug)
        document.fonts.ready.then(() => {
            const split = SplitText.create(elem, {
                type,
                mask,
                autoSplit: true,
            });

            gsap.from(split[type], {
                yPercent,
                opacity,
                duration,
                ease,
                stagger,
                scrollTrigger: {
                    trigger: triggerElem,
                    start,
                    end,
                    once,
                    markers,
                },

            });
        });
    }

    AnimateSplitTextScroll({
        elem: ".animateHeadingPg2 h2",
        type: "words",
        mask: "words",
        start: "top 75%",
        end: "bottom top",
        once: true,
        ease: "expo.out",
        stagger: 0.1,
        triggerElem: ".animateHeadingPg2"
    })

    AnimateSplitTextScroll({
        elem: ".serviText2 p",
        type: "lines",
        mask: "lines",
        delay: 1,
        start: "top 75%",
        end: "bottom top",
        once: true,
        ease: "expo.out",
        stagger: 0.1,
        triggerElem: ".serviText2"
    })

    AnimateSplitTextScroll({
        elem: ".animateHeadingPg3 p",
        type: "words",
        mask: "words",
        start: "top 50%",
        end: "bottom top",
        once: true,
        ease: "expo.out",
        markers: false,
        stagger: 0.1,
        triggerElem: ".works"
    })

    AnimateSplitTextScroll({
        elem: ".ProjectText2 p",
        type: "lines",
        mask: "lines",
        delay: 1,
        start: "top 60%",
        end: "bottom top",
        once: true,
        markers: false,
        ease: "expo.out",
        stagger: 0.1,
        triggerElem: ".ProjectText2"
    })

    AnimateSplitTextScroll({
        elem: ".about-heading div h2",
        type: "words",
        mask: "words",
        start: "top 50%",
        end: "bottom top",
        once: true,
        ease: "expo.out",
        markers: false,
        stagger: 0.1,
        triggerElem: ".about-heading"
    })

    AnimateSplitTextScroll({
        elem: ".aboutChildDesciption p",
        type: "lines",
        mask: "lines",
        delay: 1,
        start: "top 60%",
        end: "bottom top",
        once: true,
        markers: false,
        ease: "expo.out",
        stagger: 0.1,
        triggerElem: ".aboutChild3"
    })

    AnimateSplitTextScroll({
        elem: ".aboutChildDesciption2 p",
        type: "lines",
        mask: "lines",
        delay: 1,
        start: "top 60%",
        end: "bottom top",
        once: true,
        markers: false,
        ease: "expo.out",
        stagger: 0.1,
        triggerElem: ".aboutChild4"
    })












});

