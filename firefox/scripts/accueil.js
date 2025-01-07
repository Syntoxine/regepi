console.log("accueil.js successfully loaded.");
const menuHamburger = document.querySelector(".menu-hamburger");
const navLinks = document.querySelector(".nav-links");

menuHamburger.addEventListener('click', ()=>{navLinks.classList.toggle('mobile-menu')});