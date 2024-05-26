"use strict";

const btnOpenModal = document.querySelectorAll(".open-modal");
const modal = document.querySelector(".account-main");
const loginModal = document.querySelector(".login-main");
const overlay = document.querySelector(".overlay");
const btnSwitchToSignup = document.querySelector("#switchToSignup");
const btnSwitchToLogin = document.querySelector("#switchToLogin");
const scrollHeader = document.querySelector(".body-header");
const scrollCollection = document.querySelector(".expensive-nft");
const scrollContact = document.querySelector(".address");
const mainMenu = document.querySelector("#menuCheck");
const menuToggle = document.querySelectorAll("#menuToggle");
const menuItems = document.querySelectorAll(".menu-item");

// Function to show the modal, overlay
const openModal = function () {
  modal.classList.remove("hidden"); // Show the main Modal
  overlay.classList.remove("hidden"); // Show the overlay
  showSignUpForm();
};

// Function to hide the modal, overlay
const closeModal = function () {
  modal.classList.add("hidden"); // Hide the main modal
  loginModal.classList.add("hidden");
  overlay.classList.add("hidden"); // Hide the overlay
};

// Function to show the Login Form
const showLoginForm = function () {
  loginModal.classList.remove("hidden"); //Show the Login form
  modal.classList.add("hidden"); // Hide the sign up form
};

// Function to show the Sign up form
const showSignUpForm = function () {
  modal.classList.remove("hidden"); // Show the SignUp Form
  loginModal.classList.add("hidden"); // Hide the Login Form
};

// Add event listeners to open modal buttons
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener("click", openModal); // Open Modal onclick
}

// Add event listeners to overlay to close modal
overlay.addEventListener("click", closeModal); // Close Modal on Overlay click

// Add event listeners to overlay to close modal when user scroll up
window.addEventListener("scroll", closeModal); // Close Modal on any scroll at all

// Add eventListener to switch form button
btnSwitchToSignup.addEventListener("click", showSignUpForm); //Switch to signUp Form
btnSwitchToLogin.addEventListener("click", showLoginForm); //Switch to login Form

// Function to scroll to collection
function scrollToExNft() {
  scrollCollection.scrollIntoView({ behavior: "smooth" });
}

// Function to scroll to Header
function scrollToHeader() {
  scrollHeader.scrollIntoView({ behavior: "smooth" });
}

// Function to scroll to Contact
function scrollToContact() {
  scrollContact.scrollIntoView({ behavior: "smooth" });
}

// Function to toggle the menu
function toggleMenu() {
  if (mainMenu.classList.contains("active")) {
    openMenu();
  } else {
    closeMenu();
  }
}

// Function to show the Menu
const openMenu = function () {
  mainMenu.classList.remove("active");
};

// Function to hide the menu
const closeMenu = function () {
  mainMenu.classList.add("active");
};

// Add event listener to menu toggle button
menuToggle.addEventListener("click", toggleMenu);

// Function to close menu-items on click
function exitMenu() {
  mainMenu.classList.add("active");
}
