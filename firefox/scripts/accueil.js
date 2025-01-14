const menuHamburger = document.querySelector(".menu-hamburger");
const menuCross = document.querySelector(".menu-cross")
const navLinks = document.querySelector(".nav-links");

menuHamburger.addEventListener('click', ()=>{navLinks.classList.toggle('mobile-menu')});
menuHamburger.addEventListener('click', ()=>{menuHamburger.classList.toggle('mobile-menu')});
menuHamburger.addEventListener('click', ()=>{menuCross.classList.toggle('mobile-menu')});
menuCross.addEventListener('click', ()=>{navLinks.classList.remove('mobile-menu')});
menuCross.addEventListener('click', ()=>{menuHamburger.classList.toggle('mobile-menu')});
menuCross.addEventListener('click', ()=>{menuCross.classList.toggle('mobile-menu')});
console.log("accueil.js successfully loaded.");