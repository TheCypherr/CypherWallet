"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  // logout,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFLkKBpshxbqJst4fEswjtAg0kLOkLdnk",
  authDomain: "authentication-app-2c25e.firebaseapp.com",
  databaseURL: "https://authentication-app-2c25e-default-rtdb.firebaseio.com",
  projectId: "authentication-app-2c25e",
  storageBucket: "authentication-app-2c25e.appspot.com",
  messagingSenderId: "197240886998",
  appId: "1:197240886998:web:dffb5ebbde31e61d365b77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// DOM ELEMENTS
document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.querySelectorAll(".open-modal");
  const modal = document.querySelector(".account-main");
  const loginModal = document.querySelector(".login-main");
  const overlay = document.querySelector(".overlay");
  const btnSwitchToSignup = document.querySelector("#switchToSignup");
  const usernameDisplay = document.querySelector("#usernameDisplay");
  const btnSwitchToLogin = document.querySelector("#switchToLogin");
  const scrollHeader = document.querySelector(".body-header");
  const scrollCollection = document.querySelector(".expensive-nft");
  const scrollContact = document.querySelector(".address");
  const mainMenu = document.querySelector("#menuCheck");
  const menuToggle = document.querySelector("#menuToggle");
  const menuItems = document.querySelectorAll(".menu-item");

  // Monitor authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const userId = user.uid;

      //   Fetch user data
      get(child(ref(database), `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            usernameDisplay.innerHTML = `Hey, ${userData.username}!`;
          }
        })
        .catch((error) => {
          console.error(error);
        });

      dashboard.classList.remove("hidden"); // Show the dashboard
      closeModal(); // Hide the login/signup modal
    } else {
      // User is signed out
      dashboard.classList.add("hidden"); // Hide the dashboard
      window.location.assign("index.html");
    }
  });

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

  // scrollCollection.addEventListener("click", scrollToExNft);
  // scrollHeader.addEventListener("click", scrollToHeader);
  // scrollContact.addEventListener("click", scrollToContact);

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

  menuItems.forEach((item) => {
    item.addEventListener("click", exitMenu);
  });
});
