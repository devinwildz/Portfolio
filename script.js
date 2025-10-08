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

    // tl.to(".loader1", {
    //     height: "0",
    //     duration: 1,
    //     ease: "Power3.easeInOut",
    // },"-=0.5");

    // tl.to(".loader2", {
    //     height: "100%",
    //     duration:1,
    //     delay:-0.1,
    //     ease: "Power3.easeInOut",
    // },"-=1");

    // tl.to(".home", {
    //     height: "100%",
    //     duration: 1,
    //     ease: "Power3.easeInOut",
    // }, "-=0.7");


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
            markers:true,
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



    const tl2 = gsap.timeline();

    let Split = new SplitText(".top-heading span", {
        type: "chars", mask: "chars", autoSplit: true,
    });

    tl2.from(Split.chars, {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 1,
        ease: "power3.out",

    })

    let Split2 = new SplitText(".intro-text p, .work-status p, .joined_year span ", {
        type: "lines", mask: "lines", autoSplit: true,
    })

    tl2.from(Split2.lines, {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        // onComplete: () => {
        //     Split2.revert();
        // }
    }, "0.5")

    tl2.from(".button-clip-wrapper button", {
        y: 50,
        opacity: 0,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
    }, "0.5");

    tl2.from(".pfpImage img", {
        scale: 0,
        opacity: 0,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
    }, "0.5");



    let Split3 = new SplitText(".animateHeadingPg2 h2 ", {
        type: "chars", mask: "chars", autoSplit: true,
    })

    gsap.from(Split3.chars, {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".animateHeadingPg2",
            start: "top 50%",
            end: "bottom 60%",
        },
    })

    let Split4 = new SplitText(".serviText2 p", {
        type: "lines", linesClass: "line", mask: "lines", autoSplit: true,
        onSplit: (self) => {
            return gsap.from(self.lines, {
                yPercent: 40,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".page2Child",
                    start: "top 50%",
                    end: "bottom 60%",
                },
                // onComplete: () => {
                //     self.revert()
                // }
            })
        }
    })


    //Services Pin section
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



   











});

