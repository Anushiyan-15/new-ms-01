document.addEventListener('DOMContentLoaded', function () {
    const rentContainer = document.getElementById('rent-container');


    const Dvds = JSON.parse(localStorage.getItem('Dvds')) || [];

    function createDvdCard(Dvd) {
        const Dvdcard = document.createElement('div');
        Dvdcard.classList.add('rent-box');

        Dvdcard.innerHTML = `
        <div class="card">
            <img src="${Dvd.image}" alt="${Dvd.title}">
            <div class="card-content">
                <h2>Name: ${Dvd.title}</h2>
                <p>Genre: ${Dvd.category} <br> Release date:${Dvd.Date} <br> Director:${Dvd.Director}<br> Quantity:${Dvd.quantity}</p>                  
                <a href="../login.html"><button class="request-btn">Request</button> </a>
            </div>
        </div>
        `;

        return Dvdcard;
    }

    function displayDvd() {
        Dvds.forEach(Dvd => {
            const dvdCard = createDvdCard(Dvd);
            rentContainer.appendChild(dvdCard);
        });
    }

    displayDvd();
});

document.getElementById('reviews').addEventListener('click', loadReviewsFromLocalStorage);
var reviewsContainer = document.querySelector(".reviews-container");

function loadReviewsFromLocalStorage() {
    // Retrieve reviews from local storage
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Render each review
    reviews.forEach(review => {
        const newReview = document.createElement('div');
        newReview.className = 'box';
        newReview.innerHTML = `
            <div class="rev-img">
                <img src="../img/avatar.png" alt="User Avatar">
            </div>
            <h1>${review.name}</h1>
            <div class="stars">
                ${'&#9733;'.repeat(review.rating)} ${review.rating < 5 ? '&#9734;'.repeat(5 - review.rating) : ''}
            </div>
            <p>${review.review}</p>
        `;
        reviewsContainer.appendChild(newReview);
    });
}

// Load reviews when page is loaded
loadReviewsFromLocalStorage();



// const review = document.getElementById('reviews');
// const viewdvd = document.getElementById('viewdvd');
// const service =  document.getElementById('service');
// const home = document.getElementById('home');




// function viewabout(){
//     document.getElementById('About').style.display='block';
//     document.getElementById('reviews').style.display='none';
//     document.getElementById('viewdvd').style.display='none';
//     document.getElementById('Home').style.display='none';
//     document.getElementById('service').style.display='none';
// }





let currentIndex = localStorage.getItem('currentIndex') ? parseInt(localStorage.getItem('currentIndex')) : 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    localStorage.setItem('currentIndex', index);
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Initialize the slider
showSlide(currentIndex);

// Automatic slide transition every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);
