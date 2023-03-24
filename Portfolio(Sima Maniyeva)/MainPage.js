const header = document.querySelector("header")
const firstSkill = document.querySelector(".skillsWrap .col-md-3:first-child");
const skCounters = document.querySelectorAll(".counter span");
const progressBars = document.querySelectorAll(".skills svg circle")

const prtSection = document.querySelector(".portfolio");
const zoomIcon = document.querySelectorAll(".zoomIcon");
const modalOverlay = document.querySelector(".modalOverlay");
const images = document.querySelectorAll(".images img");
const nextBtn = document.querySelector(".nextBtn")
const prevBtn = document.querySelector(".prevBtn")

const links = document.querySelectorAll("navLink");
const hamburger = document.getElementsByClassName("hamburger");



window.addEventListener("scroll", () => {

        if (!skillsPlayed) skillsCounter();
    })
    // Sticky Navbar


function stickNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickNavbar();
window.addEventListener("scroll", stickNavbar);
let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});
sr.reveal(".homeInfo", { delay: 600 });
sr.reveal(".homeImage", { origin: "top", delay: 700 });

// Skill PROGRESS BAR

function hasReached(el) {

    let topPosition = el.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12)
    }
}
let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(firstSkill)) return;
    skillsPlayed = true;
    skCounters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);
        progressBars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        })
    });
    progressBars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));
};




// Modal Pop Up


let currentIndex = 0;

zoomIcon.forEach((icn, i) => icn.addEventListener("click", () => {
    prtSection.classList.add("open");
    document.body.classList.add("stopScroll");
    currentIndex = i;
    changeImage(currentIndex)
}));
modalOverlay.addEventListener("click", () => {
    prtSection.classList.remove("open");
    document.body.classList.remove("stopScroll");

});
prevBtn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = 5;
    } else {
        currentIndex--;
    }

    changeImage(currentIndex);

})
nextBtn.addEventListener("click", () => {
    if (currentIndex === 5) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }

    changeImage(currentIndex);

})

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}
// const swiper = new Swiper(".swiper", {
//     loop: true,
//     speed: 500,
//     autoplay: true,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
// });
// // OPEN CLOSE NAVBAR MENU
// hamburger.addEventListener("click", () => {
//     document.body.classList.toggle("open");
// });


// ACTIVE LINK NAVBAR
function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter(sct => sct.y <= 0);
    let currSectionId = passedSections.at(-1).id;
    links.forEach((l) => l.classList.remove("active"));
    links[currSectionId].classList.add("active");
}