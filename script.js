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

    // function revealSpan() {
    //     document.querySelectorAll('.reveal').forEach((elem) => {
    //         let parent = document.createElement("span");
    //         let child = document.createElement("span");

    //         parent.classList.add("parent");
    //         child.classList.add("child");

    //         child.innerHTML = elem.innerHTML;
    //         parent.appendChild(child);
    //         elem.innerHTML = "";
    //         elem.appendChild(parent);
    //     });
    // }
    // revealSpan();

    // Add any additional functionality or animations here  

    // let tl = gsap.timeline();

    // tl.from(".child span", {
    //     opacity: 0,
    //     x: "100",
    //     duration: 2,
    //     stagger: 0.2,
    //     delay: 1,
    //     ease: "Power3.easeInOut",
    // });

    // tl.to(".parent .child", {
    //     y: "-100%",
    //     duration: 1,
    //     ease: "Circ.easeInOut",
    // });

    // gsap.set(".top-heading span", { opacity: 0 });

    // tl.to(".loader1", {
    //     height: "0",
    //     duration: 1,
    //     ease: "Power3.easeInOut",
    //     onComplete: () => {
    //         // hide the loader
    //         document.querySelector(".loader1").style.display = "none";
    //     }
    // }, "-=0.5");
    document.fonts.ready.then(() => {

        const tl = gsap.timeline();

        let Split = new SplitText('.Intro-heading h5', {
            type: 'words',
            mask: 'words',
            autoSplit: true,
        });

        tl.from(Split.words, {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 1,
            ease: 'Power3.easeInOut',
        });

        tl.to(Split.words,
            {
                y: -100,
                duration: 1.2,
                delay: 1.5,
            }, "1"
        );

        let Split2 = new SplitText('.topHeading h5', {
            type: 'words',
            mask: 'words',
            autoSplit: true,
        });

        tl.to(
            Split2.words,
            {
                y: -100,
                duration: 1.2,
                delay: 1.5,
            },
            '1'
        );

        let Split3 = new SplitText('.loaderAnimation1 h5, .loaderAnimation1 p', {
            type: 'words',
            mask: 'words',
            autoSplit: true,
        });

        tl.to(
            Split3.words,
            {
                y: -100,
                duration: 1.2,
                delay: 1.5,
            },
            '1'
        );

        tl.to('.loader1', {
            y: -100,
            height: 0,
            duration: 1.2,
            onComplete: () => {
                // hide the loader
                document.querySelector(".loader1").style.display = "none";
            }
        });

        const split4 = new SplitText('.top-heading span', {
            type: 'chars',
            mask: 'chars',
            autoSplit: true,
        });

        tl.from(
            split4.chars,
            {
                y: 200,
                duration: 0.5,
                opacity: 1,
                stagger: 0.05,
            },
            '-=0.9'
        );
    });











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





    //card Stack Animation
    function setupPins(pinConfigs) {
        pinConfigs.forEach(({ selector, start, end, pinSpacing, markers = false }) => {
            gsap.to(selector, {
                scrollTrigger: {
                    trigger: selector,
                    id: `pin-${selector.replace('.', '')}`,
                    start,
                    end,
                    endTrigger: ".box3",
                    pin: true,
                    pinSpacing,
                    markers,
                },
                duration: 1,
                ease: "power3.out",
            });
        });
    }

    setupPins([
        { selector: ".box1", start: "top 50px", end: "10% 20%", pinSpacing: false },
        { selector: ".box2", start: "top 150px", end: "10% 20%", pinSpacing: false },
        { selector: ".box3", start: "top 250px", end: "10% 20%", pinSpacing: true },
    ]);

    //cursor Follower

    const containers = document.querySelectorAll(".projectImg");
    containers.forEach(container => {
        const button = container.querySelector(".btn-magnetic button");

        if (!button) return; // safety check

        gsap.set(button, { opacity: 0, scale: 0.8 });

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.2,
                y: y * 0.2,
                scale: 1.05,
                ease: "power2.out",
                duration: 0.3,
            });
        });

        container.addEventListener("mouseenter", () => {
            gsap.to(button, {
                opacity: 1,
                scale: 1,
                rotate: "0deg",
                ease: "power3.out",
                duration: 0.9,
            });
        });

        container.addEventListener("mouseleave", () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: "60deg",
                ease: "power3.out",
                duration: 1,
            });
        });
    });

    //date
    const yearSpan = document.getElementById("current-year");
    yearSpan.textContent = new Date().getFullYear();

    //about section

    function animateAboutSection(trigger, start, end, markers = false) {
        gsap.to(".aboutme", {
            y: -50,
            scale: 0.99,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger,
                start,
                end,
                markers,
                scrub: 1,
            }
        });
    }
    animateAboutSection(".aboutme", "bottom 80%", "bottom 70%");

    gsap.fromTo(".footer1",
        { y: -100 }, // 👈 start: thoda upar se
        {
            y: 0, // 👇 end: apni jagah pe aa jaye
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".footer1",
                start: "top 80%",
                end: "bottom 60%",
                scrub: 1,
            },
        }
    );


    //Card pin section
    const slides = gsap.utils.toArray(".project-detail");
    const numberAnimated = document.querySelector(".number-animated");
    let currentY = 0;
    let targetY = 0;
    const setY = gsap.quickSetter(numberAnimated, "yPercent");

    const createScrollTrigger = ({ start, end, pinSpacing, markers }) => {
        ScrollTrigger.create({
            trigger: ".Project",
            scrub: 0.2,
            pin: ".number-counter",
            anticipatePin: 1,
            markers,
            start,
            end,
            pinSpacing,
        });
    }

    // ✨ Animate each slide (fade + y)
    slides.forEach((slide, index) => {

        // Trigger for number change
        ScrollTrigger.create({
            trigger: slide,
            start: "top 20%",
            end: "bottom 70%",
            onEnter: () => setTarget(index),
            onEnterBack: () => setTarget(index),

        });
    });

    // 🧠 Set target index for number
    function setTarget(index) {
        targetY = -100 * index;
    }

    // 🚀 LERP Ticker for smooth animation
    gsap.ticker.add(() => {
        currentY += (targetY - currentY) * 0.1; // Smooth transition
        setY(currentY);
    });

    createScrollTrigger({
        start: "top top",
        end: "bottom 80%", // Adjusted end point
        pinSpacing: false, // Enable pinSpacing for desktop
    });


});

