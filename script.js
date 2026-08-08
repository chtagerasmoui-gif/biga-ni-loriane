// =========================
// PAGE SYSTEM
// =========================

const pages =
    document.querySelectorAll(".page");

let currentPage = 0;


// =========================
// SHOW PAGE
// =========================

function showPage(index) {

    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === index
        );

    });

    currentPage = index;
}


// =========================
// OPEN BOOK
// =========================

function openBook() {

    showPage(1);

}


// =========================
// NEXT PAGE
// =========================

function nextPage() {

    if (
        currentPage <
        pages.length - 1
    ) {

        showPage(
            currentPage + 1
        );

    }

}


// =========================
// PREVIOUS PAGE
// =========================

function prevPage() {

    if (currentPage > 0) {

        showPage(
            currentPage - 1
        );

    }

}


// =========================
// GIFT SURPRISE
// =========================

function openGift() {

    const message =
        document.getElementById(
            "giftMessage"
        );

    message.classList.add("show");

    celebrate();

}


// =========================
// KEYBOARD
// =========================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            prevPage();

        }

    }
);


// =========================
// BALLOONS
// =========================

const balloonContainer =
    document.getElementById(
        "balloons"
    );


const colors = [

    "#ff4f81",

    "#ffcc33",

    "#44c8ff",

    "#9b59ff",

    "#58e68b",

    "#ff8c42"

];


for (
    let i = 0;
    i < 22;
    i++
) {

    const balloon =
        document.createElement(
            "div"
        );


    balloon.className =
        "balloon";


    balloon.style.left =
        Math.random() *
        100 +
        "%";


    balloon.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    balloon.style.animationDuration =
        7 +
        Math.random() *
        7 +
        "s";


    balloon.style.animationDelay =
        -Math.random() *
        10 +
        "s";


    balloonContainer.appendChild(
        balloon
    );

}


// =========================
// FIREWORKS
// =========================

const canvas =
    document.getElementById(
        "fireworks"
    );


const ctx =
    canvas.getContext("2d");


let W =
    canvas.width =
    window.innerWidth;


let H =
    canvas.height =
    window.innerHeight;


let particles = [];


window.addEventListener(
    "resize",
    function() {

        W =
            canvas.width =
            window.innerWidth;


        H =
            canvas.height =
            window.innerHeight;

    }
);


// =========================
// CREATE FIREWORK
// =========================

function burst(x, y) {

    const hue =
        Math.random() *
        360;


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            2 +
            Math.random() *
            6;


        particles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 80,

            hue: hue

        });

    }

}


// =========================
// CELEBRATE
// =========================

function celebrate() {

    burst(
        W * 0.25,
        H * 0.30
    );


    setTimeout(
        function() {

            burst(
                W * 0.75,
                H * 0.25
            );

        },
        250
    );


    setTimeout(
        function() {

            burst(
                W * 0.50,
                H * 0.35
            );

        },
        500
    );

}


// =========================
// ANIMATE FIREWORKS
// =========================

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    particles.forEach(
        function(p, index) {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += 0.04;

            p.vx *= 0.98;

            p.vy *= 0.98;

            p.life--;


            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                2.5,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `hsla(
                    ${p.hue},
                    100%,
                    65%,
                    ${p.life / 80}
                )`;


            ctx.fill();


            if (
                p.life <= 0
            ) {

                particles.splice(
                    index,
                    1
                );

            }

        }
    );


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();


// =========================
// START ON COVER
// =========================

showPage(0);