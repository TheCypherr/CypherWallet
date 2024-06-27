"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
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
  const signUp = document.querySelector("#signUp");
  const signIn = document.querySelector("#Login");
  const btnOpenModal = document.querySelectorAll(".open-modal");
  const modal = document.querySelector(".account-main");
  const successful = document.querySelector(".successful-main");
  const usernameDisplay = document.querySelector("#usernameDisplay");
  const loginModal = document.querySelector(".login-main");
  const overlay = document.querySelector(".overlay");
  const btnSwitchToSignup = document.querySelector("#switchToSignup");
  const btnSwitchToLogin = document.querySelector("#switchToLogin");
  const btnSwitchToLoginAgain = document.querySelector("#switchToLogin2");
  const scrollHeader = document.querySelector(".body-header");
  const scrollCollection = document.querySelector(".expensive-nft");
  const scrollContact = document.querySelector(".address");
  const mainMenu = document.querySelector("#menuCheck");
  const menuToggle = document.querySelector("#menuToggle");
  const menuItems = document.querySelectorAll(".menu-item");

  // CREATE A PASSWORD BASED ACCT
  signUp.addEventListener("click", (e) => {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        set(ref(database, "users/" + user.uid), {
          username: username,
          email: email,
        });

        // alert("user created!");

        // Clear the input fields
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
        // ..
      });
  });

  // TO LOGIN A USER WITH EMAIL & PASSWORD
  signIn.addEventListener("click", (e) => {
    var email = document.getElementById("email2").value;
    var password = document.getElementById("password2").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.assign("dashboard.html");

        const dt = new Date();
        update(ref(database, "users/" + user.uid), {
          last_login: dt,
        });

        // alert("User logged in!");

        // Clear the input fields
        document.getElementById("email2").value = "";
        document.getElementById("password2").value = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
    console.log(email, password);
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
    successful.classList.add("hidden");
    overlay.classList.add("hidden"); // Hide the overlay
  };

  // Function to show the Login Form
  const showLoginForm = function () {
    loginModal.classList.remove("hidden"); //Show the Login form
    modal.classList.add("hidden"); // Hide the sign up form
    successful.classList.add("hidden"); // Hide the success form
  };

  // Function to show the Sign up form
  const showSignUpForm = function () {
    modal.classList.remove("hidden"); // Show the SignUp Form
    loginModal.classList.add("hidden"); // Hide the Login Form
    successful.classList.add("hidden"); // Hide the success form
  };

  // Function to show the Successful
  const success = function () {
    successful.classList.remove("hidden"); // Show the Success Form
    loginModal.classList.add("hidden"); // Hide the Login Form
    modal.classList.add("hidden"); // Hide the sign up form
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
  btnSwitchToLoginAgain.addEventListener("click", showLoginForm); //Switch to login Form
  signUp.addEventListener("click", success); //Switch to Success Form

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

  menuItems.forEach((item) => {
    item.addEventListener("click", exitMenu);
  });
});
