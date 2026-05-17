import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBr6RYAti0I595f6hyaH2CkSek0KOsL5U",
  authDomain: "zyrova-landing-page.firebaseapp.com",
  projectId: "zyrova-landing-page",
  storageBucket: "zyrova-landing-page.appspot.com",
  messagingSenderId: "531381486451",
  appId: "1:531381486451:web:a4f40a9a0923430e71bb06",
  measurementId: "G-3S98H22NM2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore database
const db = getFirestore(app);

let currentRating = 0;

window.addEventListener("DOMContentLoaded", () => {

    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {

        star.addEventListener("click", function () {

            currentRating = index + 1;

            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.classList.add("active");
                } else {
                    s.classList.remove("active");
                }
            });

        });

    });

});

window.submitReview = async function () {

    let comment = document.getElementById("comment").value;

    if (currentRating === 0) {
        alert("Please select a rating first!");
        return;
    }

    await addDoc(collection(db, "reviews"), {

        rating: currentRating,
        comment: comment,
        createdAt: new Date()

    });

    alert("Review Submitted!");

    document.getElementById("comment").value = "";
    currentRating = 0;
};