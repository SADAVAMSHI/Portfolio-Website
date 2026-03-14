/* =================== TYPED JS =================== */
document.addEventListener('DOMContentLoaded', () => {
    const typed = new Typed('.typed', {
        strings: ["Web Developer", "B.Tech AIML Student", "Frontend Enthusiast", "Google Student Ambassador"],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1000,
        loop: true,
    });
});

/* =================== STICKY NAVBAR & ACTIVE LINKS =================== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /* Sticky Header Logic */
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Close mobile menu on scroll */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =================== MOBILE NAV TOGGLE =================== */
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}; 
