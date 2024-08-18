//Set Footer Copyright Year
Webflow.push(function () {
    $('.copyright-year').text(new Date().getFullYear());
});


//Cookie Banner
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const cookieBanner = document.querySelector('#cookie-banner');
const hasCookieConsent = getCookie('cookies-consent');

if (!hasCookieConsent) {
    cookieBanner.classList.remove('cookie-message');
}

const consentCta = cookieBanner.querySelector('#consent-cookies');

consentCta.addEventListener('click', () => {
    cookieBanner.classList.add('cookie-message');
    setCookie('cookies-consent', 1, 365);
});



//Body no scroll on Menu open
function toggleMenu() {
    const body = $('body');
    const menu = $('.hamburger__menu');
    const menuLinks = $('.mobile__menu-wrapper');

    menu.on("click", function () {
        body.toggleClass("o-hidden");
        menuLinks.toggleClass("is--open");
    })

}
toggleMenu();

//Modal open - Body no scroll
$('.modal-btn').on('click', function () {
    $('body').addClass('o-hidden');
});
$('.modal__close-btn').on('click', function () {
    $('body').removeClass('o-hidden');
});
$('.modal__close-area').on('click', function () {
    $('body').removeClass('o-hidden');
});

gsap.registerPlugin(ScrollTrigger);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const hasReload = (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance.getEntriesByType("navigation").map((nav) => nav.type).includes("reload");
if (hasReload) setTimeout(() => window.scrollTo(0, 0), 200);


function tabScrollTriggerRefresh() {
    const tabLinks = document.querySelectorAll(".w-tab-link");
    tabLinks.forEach(tabLink => tabLink.addEventListener("click", function () {
        console.log("clck");
        ScrollTrigger.refresh();
    }));
}

function textUnderline() {
    const textWrappers = document.querySelectorAll(".js-text-underline");
    textWrappers.forEach(addUnderline);
    textWrappers.forEach(addScrollTrigger);
    function addUnderline(wrapper) {
        let template = null;
        const templateValue = wrapper.getAttribute("data-underline");
        if (templateValue === "sm") {
            template = `
<svg class="svg-underline" width="430" height="16" viewBox="0 0 430 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="top-line" d="M2 7.94972C135.772 5.76704 284.063 2 418.739 2" stroke="#8247FF" stroke-width="3" stroke-linecap="round"/>
<path class="bottom-line" d="M153.261 13.8994C245.06 13.3972 336.602 11.6868 428 10.3296" stroke="#8247FF" stroke-width="3" stroke-linecap="round"/>
  </svg>       
`;
        } else {
            template = `
<svg class="svg-underline" width="448" height="26" viewBox="0 0 448 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="top-line" d="M73.3804 22.8573C166.579 20.3422 259.873 18.2243 352.949 14.802C356.34 14.6774 368.152 14.4647 374.62 13.754" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
<path class="bottom-line" d="M1.99989 20.173C62.4908 14.9745 123.484 13.4458 184.125 11.1428C262.309 8.17355 340.509 5.23404 418.755 4.25167C427.273 4.14472 452.789 3.54451 444.281 3.07897" stroke="#8247FF" stroke-width="4" stroke-linecap="round"/>
  </svg>        
`;
        }
        wrapper.insertAdjacentHTML("beforeend", template);
        const svg = wrapper.querySelector(".svg-underline");
        const topLine = svg.querySelector(".top-line");
        const bottomLine = svg.querySelector(".bottom-line");
        svg.setAttribute("width", wrapper.scrollWidth);
        topLine.style.setProperty("--length", topLine.getTotalLength());
        bottomLine.style.setProperty("--length", bottomLine.getTotalLength());
    }
    function addScrollTrigger(wrapper) {
        if (textWrappers[0] === wrapper) {
            wrapper.style.setProperty("--animation", "title-underline");
            return;
        }
        ScrollTrigger.create({
            trigger: wrapper,
            start: "top bottom-=25%",
            end: "top bottom-=25%",
            once: true,
            onEnter: () => {
                wrapper.style.setProperty("--animation", "title-underline");
            },
        });
    }
}

// Add in page: Homepage
function textCircleAnimation() {
    const words = document.querySelectorAll(".js-text-circle");
    const svg = `
    <svg class="svg-text-circle" width="100%" height="96" viewBox="0 0 311 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M192.042 8.51079C227.541 7.23839 267.329 11.0439 291.445 21.6762C314.405 31.7648 316.001 48.8231 289.311 63.3423C263.469 77.379 222.928 83.7734 190.024 87.948C155.408 92.3269 119.963 94.8084 86.6437 93.7954C57.635 92.9228 24.0719 89.9085 8.35569 78.1718C-2.48089 70.0325 1.07051 58.8717 12.2783 48.8235C41.2866 22.835 106.134 5.40489 158.556 2.27205C194.378 0.12187 226.38 5.42059 249.504 16.1542" stroke="#A9CECC" stroke-width="3" stroke-linecap="round" />
    </svg>`;
    words.forEach((word) => {
        word.insertAdjacentHTML("beforeend", svg);
        const circle = word.querySelector("svg");
        ScrollTrigger.create({
            trigger: word,
            start: "top bottom-=25%",
            end: "top bottom-=25%",
            once: true,
            onEnter: () => circle.style.setProperty("--animation", "text-circle"),
        });
    });
}

// Add in page: Homepage
function threeLinesAnimation() {
    const elements = document.querySelectorAll(".js-three-lines");
    const svg = `
    <svg class="svg-three-lines" width="45" height="50" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 27C3.3557 18.4591 6.90298 10.3881 9 2" stroke="#8247FF" stroke-width="3" stroke-linecap="round" />
        <path d="M17.5 32C25.9926 27.1537 34.4984 22.3305 43 17.5" stroke="#8247FF" stroke-width="3" stroke-linecap="round" />
        <path d="M19.8228 47.1832C26.5813 47.234 33.3158 47.9922 40.048 47.9922" stroke="#8247FF" stroke-width="3" stroke-linecap="round" />
    </svg>`;
    elements.forEach((element) => {
        element.insertAdjacentHTML("beforeend", svg);
        const paths = element.querySelectorAll(".svg-three-lines path");
        ScrollTrigger.create({
            trigger: element,
            start: "top bottom-=25%",
            end: "top bottom-=25%",
            once: true,
            onEnter: () => popAnimation(paths, { stagger: 0.15 }),
        });
    });
}
function heroAnimation(config) {
    // TODO
    //  1. Make arrows like power grid animation
    //  2. Maybe add linear interpolation on mouse move instead linear transition...

    const hero = document.querySelector(".section__hero");
    const svg = document.querySelector(".hero__svg");
    const arrows = svg.querySelectorAll(".svg-arrow");
    const imgWrappers = document.querySelectorAll(".js-hero-img-wrapper");
    const maskedArrows = svg.querySelectorAll("mask");
    const mouse = { x: 0, y: 0 };
    let translateX = null;
    let translateY = null;
    let windowWidth = window.innerWidth;

    window.addEventListener("load", initAnimation);
    window.addEventListener("resize", function () {
        if (windowWidth != window.innerWidth) {
            windowWidth = window.innerWidth;
            positionCards();
        }
    });

    function initAnimation() {
        setTimeout(function () {
            positionCards();
            popAnimation(imgWrappers, { stagger: 0.12 });
            popAnimation(arrows, { stagger: 0.24 });

            setTimeout(() => {
                const master = gsap.timeline();
                const path = (mask) => mask.firstElementChild;
                const circle = (mask) =>
                    svg.querySelector(`[mask="url(#${mask.id})"]`).firstElementChild;
                const width = (circle) => circle.getBoundingClientRect().width;

                master
                    .add(
                        animateCircle({
                            path: path(maskedArrows[3]),
                            circle: circle(maskedArrows[3]),
                            width: width(circle(maskedArrows[3])),
                            start: 0,
                            end: 1,
                        })
                    )
                    .add(
                        animateCircle({
                            path: path(maskedArrows[2]),
                            circle: circle(maskedArrows[2]),
                            width: width(circle(maskedArrows[2])),
                            start: 0,
                            end: 1,
                        }),
                        "<80%"
                    )
                    .add(
                        animateCircle({
                            path: path(maskedArrows[1]),
                            circle: circle(maskedArrows[1]),
                            width: width(circle(maskedArrows[1])),
                            start: 0,
                            end: 1,
                        }),
                        "<60%"
                    )
                    .add(
                        animateCircle({
                            path: path(maskedArrows[0]),
                            circle: circle(maskedArrows[0]),
                            width: width(circle(maskedArrows[0])),
                            start: 1,
                            end: 0,
                        }),
                        "<80%"
                    );

                master.repeat(-1);

                return master;
            }, 1700);

            hero.addEventListener("mousemove", function (e) {
                mouse.x = e.clientX / window.innerWidth - 0.5;
                mouse.y = e.clientY / window.innerHeight - 0.5;
                translateX = mouse.x * 30;
                translateY = mouse.y * 30;
                document.body.style.setProperty("--translate-x", -translateY + "px");
                document.body.style.setProperty("--translate-y", -translateX + "px");
            });
            hero.addEventListener("mouseleave", function (e) {
                document.body.style.setProperty("--translate-x", 0 + "px");
                document.body.style.setProperty("--translate-y", 0 + "px");
            });
        }, config.startAnimation);
    }
    function positionCards() {
        imgWrappers.forEach((card, i) => {
            const svgCard = document.querySelector(
                "." + card.getAttribute("data-target")
            );
            const { width, height } = svgCard.getBoundingClientRect();
            card.style.width = width.toFixed(2) + "px";
            card.style.height = height.toFixed(2) + "px";
            card.style.top = getPosition(svgCard).top + "px";
            card.style.left = getPosition(svgCard).left + "px";
        });
    }
    function getPosition(el) {
        const { top, left, right, bottom } = el.getBoundingClientRect();
        const { scrollY, scrollX } = window;
        return {
            top: top + scrollY,
            bottom: bottom + scrollY,
            left: left + scrollX,
            right: right + scrollX,
        };
    }
    function animateCircle(config) {
        const tl = gsap.timeline();
        tl.to(config.circle, { opacity: 1 })
            .fromTo(
                config.circle,
                { attr: { cx: () => -config.width - 4 } },
                { attr: { cx: () => -config.width / 2 } },
                "<0%"
            )
            .to(
                config.circle,
                {
                    duration: 1.28,
                    ease: Power2.easeInOut,
                    motionPath: {
                        path: config.path,
                        align: config.path,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                        start: config.start,
                        end: config.end,
                    },
                },
                "<25%"
            )
            .fromTo(
                config.circle,
                { attr: { cx: () => -config.width / 2 } },
                { attr: { cx: () => 0 } },
                "<25%"
            )
            .to(config.circle, { opacity: 0 });
        return tl;
    }
}

function popAnimation(el, config) {
    const tl = gsap.timeline({ duration: 0.4 });
    tl.set(el, { willChange: "transform" }).fromTo(
        el,
        { scale: 0, autoAlpha: 0 },
        {
            ease: Back.easeOut.config(1.1),
            scale: 1,
            autoAlpha: 1,
            stagger: config.stagger,
            onComplete: () => gsap.set(el, { willChange: "auto" }),
        }
    );
}

window.addEventListener("DOMContentLoaded", function () {
    heroAnimation({ startAnimation: 2000 });
    setTimeout(textUnderline, 2000);
    textCircleAnimation();
    playIframe();
    formSubmit();
    threeLinesAnimation();
    paymentsPowerGridAnimation();
    tabScrollTriggerRefresh();
    initMarquee({
        wrappers: ".marquee__wrapper", // <-- Add Marquee Wrapper class
        duration: (90 * 2), // <-- Add Duration
    });
});

//Marquee
function initMarquee(e) { let t = gsap.utils.toArray(e.wrappers); if (t.length) { let r = function e(t, r) { t = gsap.utils.toArray(t), r = r || {}; let n = gsap.timeline({ repeat: r.repeat, paused: r.paused, defaults: { ease: "none" }, onReverseComplete: () => n.totalTime(n.rawTime() + 100 * n.duration()) }), o = t.length, i = t[0].offsetLeft, s = [], a = [], p = [], $ = 0, u = 100 * (r.speed || 1), d = !1 === r.snap ? e => e : gsap.utils.snap(r.snap || 1), _, l, f, m, c, g; for (gsap.set(t, { xPercent(e, t) { let r = a[e] = parseFloat(gsap.getProperty(t, "width", "px")); return p[e] = d(parseFloat(gsap.getProperty(t, "x", "px")) / r * 100 + gsap.getProperty(t, "xPercent")), p[e] } }), gsap.set(t, { x: 0 }), _ = t[o - 1].offsetLeft + p[o - 1] / 100 * a[o - 1] - i + t[o - 1].offsetWidth * gsap.getProperty(t[o - 1], "scaleX") + (parseFloat(r.paddingRight) || 0), g = 0; g < o; g++)c = t[g], l = p[g] / 100 * a[g], m = (f = c.offsetLeft + l - i) + a[g] * gsap.getProperty(c, "scaleX"), n.to(c, { xPercent: d((l - m) / a[g] * 100), duration: m / u }, 0).fromTo(c, { xPercent: d((l - m + _) / a[g] * 100) }, { xPercent: p[g], duration: (l - m + _ - l) / u, immediateRender: !1 }, m / u).add("label" + g, f / u), s[g] = f / u; function x(e, t) { t = t || {}, Math.abs(e - $) > o / 2 && (e += e > $ ? -o : o); let r = gsap.utils.wrap(0, o, e), i = s[r]; return i > n.time() != e > $ && (t.modifiers = { time: gsap.utils.wrap(0, n.duration()) }, i += n.duration() * (e > $ ? 1 : -1)), $ = r, t.overwrite = !0, n.tweenTo(i, t) } return n.next = e => x($ + 1, e), n.previous = e => x($ - 1, e), n.current = () => $, n.toIndex = (e, t) => x(e, t), n.times = s, n.progress(1, !0).progress(0, !0), r.reversed && (n.vars.onReverseComplete(), n.reverse()), n }(t, { repeat: -1 }); r.duration(e.duration) } }

// iFrame
function playIframe() { ScrollTrigger.create({ trigger: ".wizard-video", start: "top bottom", end: "top bottom", once: !0, onEnter() { let t = document.querySelector(".wizard-video"); t.setAttribute("src", "https://player.vimeo.com/video/798424591?background=1&loop=1") } }) }
// Form
function formSubmit() { let e = document.querySelector(".contact-form_main-wrapper"), t = e.querySelector("[type='submit']"), r = e.querySelector(".b-button__wrap"); r.addEventListener("click", function (e) { e.preventDefault(), t.click() }) }

function paymentsPowerGridAnimation() {
    const svg = document.querySelector(".svg-contiant-links");
    const maskTop = svg.querySelector(".mask-top");
    const topCircle = maskTop.querySelector("circle");
    const topPath = maskTop.querySelector("path");
    const maskBottom = svg.querySelector(".mask-bottom");
    const bottomCircle = maskBottom.querySelector("circle");
    const bottomPath = maskBottom.querySelector("path");
    const { width } = topCircle.getBoundingClientRect();

    ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "top bottom",
        once: true,
        onEnter: () => {
            animateCircle(topCircle, width, topPath);
            animateCircle(bottomCircle, width, bottomPath);
        }
    });

    function animateCircle(circle, circleWidth, path) {
        const tl = gsap.timeline();
        tl.repeat(-1);
        tl.repeatDelay(0.2);

        tl.fromTo(
            circle,
            { attr: { cx: () => -circleWidth - 4 } },
            { attr: { cx: () => -circleWidth / 2 } }
        )
            .to(
                circle,
                {
                    duration: 1.5,
                    ease: Power2.easeInOut,
                    motionPath: {
                        path: path,
                        align: path,
                        autoRotate: true,
                        alignOrigin: [0.5, 0.5],
                        start: 1,
                        end: 0,
                    },
                },
                "<25%"
            )
            .fromTo(
                circle,
                { attr: { cx: () => -width / 2 } },
                { attr: { cx: () => 0 } },
                "<25%"
            );

        return tl;
    }
}

$('.specific-link').on('click', function () {
    $('.hamburger__menu').click();
});

var body = $('body');
body.addClass('o-hidden');
setTimeout(function () {
    body.removeClass('o-hidden');
}, 2500);


//Animate Radio Button
$('input').on('click', function () {
    $(this).closest('.demo__radio-group').find('.selected-item').removeClass('selected-item');
    $(this).siblings('.link_circle').addClass('selected-item');
    $(this).siblings('.link__checkmark').addClass('selected-item');
    $(this).closest('.link-demo__radio-btn-wrapper').addClass('selected-item');
});


window.addEventListener("DOMContentLoaded", function () {
    setTimeout(threeLinesAnimation, 2000);
    textCircleAnimation();
    formSubmit();
});

//Marquee
function initMarquee(e) { let t = gsap.utils.toArray(e.wrappers); if (t.length) { let r = function e(t, r) { t = gsap.utils.toArray(t), r = r || {}; let n = gsap.timeline({ repeat: r.repeat, paused: r.paused, defaults: { ease: "none" }, onReverseComplete: () => n.totalTime(n.rawTime() + 100 * n.duration()) }), o = t.length, i = t[0].offsetLeft, s = [], a = [], p = [], $ = 0, u = 100 * (r.speed || 1), d = !1 === r.snap ? e => e : gsap.utils.snap(r.snap || 1), _, l, f, m, c, g; for (gsap.set(t, { xPercent(e, t) { let r = a[e] = parseFloat(gsap.getProperty(t, "width", "px")); return p[e] = d(parseFloat(gsap.getProperty(t, "x", "px")) / r * 100 + gsap.getProperty(t, "xPercent")), p[e] } }), gsap.set(t, { x: 0 }), _ = t[o - 1].offsetLeft + p[o - 1] / 100 * a[o - 1] - i + t[o - 1].offsetWidth * gsap.getProperty(t[o - 1], "scaleX") + (parseFloat(r.paddingRight) || 0), g = 0; g < o; g++)c = t[g], l = p[g] / 100 * a[g], m = (f = c.offsetLeft + l - i) + a[g] * gsap.getProperty(c, "scaleX"), n.to(c, { xPercent: d((l - m) / a[g] * 100), duration: m / u }, 0).fromTo(c, { xPercent: d((l - m + _) / a[g] * 100) }, { xPercent: p[g], duration: (l - m + _ - l) / u, immediateRender: !1 }, m / u).add("label" + g, f / u), s[g] = f / u; function x(e, t) { t = t || {}, Math.abs(e - $) > o / 2 && (e += e > $ ? -o : o); let r = gsap.utils.wrap(0, o, e), i = s[r]; return i > n.time() != e > $ && (t.modifiers = { time: gsap.utils.wrap(0, n.duration()) }, i += n.duration() * (e > $ ? 1 : -1)), $ = r, t.overwrite = !0, n.tweenTo(i, t) } return n.next = e => x($ + 1, e), n.previous = e => x($ - 1, e), n.current = () => $, n.toIndex = (e, t) => x(e, t), n.times = s, n.progress(1, !0).progress(0, !0), r.reversed && (n.vars.onReverseComplete(), n.reverse()), n }(t, { repeat: -1 }); r.duration(e.duration) } }

// iFrame
function playIframe() { ScrollTrigger.create({ trigger: ".wizard-video", start: "top bottom", end: "top bottom", once: !0, onEnter() { let t = document.querySelector(".wizard-video"); t.setAttribute("src", "https://player.vimeo.com/video/798424591?background=1&loop=1") } }) }
// Form
function formSubmit() { let e = document.querySelector(".contact-form_main-wrapper"), t = e.querySelector("[type='submit']"), r = e.querySelector(".b-button__wrap"); r.addEventListener("click", function (e) { e.preventDefault(), t.click() }) }

function paymentsPowerGridAnimation() {
    const svg = document.querySelector(".svg-contiant-links");
    const maskTop = svg.querySelector(".mask-top");
    const topCircle = maskTop.querySelector("circle");
    const topPath = maskTop.querySelector("path");
    const maskBottom = svg.querySelector(".mask-bottom");
    const bottomCircle = maskBottom.querySelector("circle");
    const bottomPath = maskBottom.querySelector("path");
    const { width } = topCircle.getBoundingClientRect();

    ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "top bottom",
        once: true,
        onEnter: () => {
            animateCircle(topCircle, width, topPath);
            animateCircle(bottomCircle, width, bottomPath);
        }
    });

    function animateCircle(circle, circleWidth, path) {
        const tl = gsap.timeline();
        tl.repeat(-1);
        tl.repeatDelay(0.2);

        tl.fromTo(
            circle,
            { attr: { cx: () => -circleWidth - 4 } },
            { attr: { cx: () => -circleWidth / 2 } }
        )
            .to(
                circle,
                {
                    duration: 1.5,
                    ease: Power2.easeInOut,
                    motionPath: {
                        path: path,
                        align: path,
                        autoRotate: true,
                        alignOrigin: [0.5, 0.5],
                        start: 1,
                        end: 0,
                    },
                },
                "<25%"
            )
            .fromTo(
                circle,
                { attr: { cx: () => -width / 2 } },
                { attr: { cx: () => 0 } },
                "<25%"
            );

        return tl;
    }
}

$('.specific-link').on('click', function () {
    $('.hamburger__menu').click();
});

var body = $('body');
body.addClass('o-hidden');
setTimeout(function () {
    body.removeClass('o-hidden');
}, 2500);

$(document).ready(function () {
    $('.radio-button-none').on('click', function () {
        $(this).toggleClass('selected');
        updateClearLinkVisibility();
    });

    function updateClearLinkVisibility() {
        var selectedFilters = $('.radio-button-none.selected');
        if (selectedFilters.length > 0) {
            $('#clear-link').show();
        } else {
            $('#clear-link').hide();
        }
    }
});

$(document).ready(function () {
    $('.radio-button-none').on('click', function () {
        $(this).toggleClass('selected');
        updateClearLinkVisibility();
    });

    function updateClearLinkVisibility() {
        var selectedFilters = $('.radio-button-none.selected');
        if (selectedFilters.length > 0) {
            $('#clear-link').show();
        } else {
            $('#clear-link').hide();
        }
    }
});