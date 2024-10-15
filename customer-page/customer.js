function showdvd() {
  const rentContainer = document.getElementById("rent-container");

  const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];

  function createDvdCard(Dvd) {
    const Dvdcard = document.createElement("div");
    Dvdcard.classList.add("rent-box");

    // Dvdcard.innerHTML =
    //  `
    // // <div class="card">
    // //     <img src="${Dvd.image}" alt="${Dvd.title}">
    // //     <div class="card-content">
    // //         <h2>Movie Name: ${Dvd.title}</h2>
    // //         <p>Genre: ${Dvd.category} <br> Release date:${Dvd.Date} <br> Director:${Dvd.Director}<br> Quantity:${Dvd.quantity}</p>
    // //         <button class="rent-button" onclick="storeItemDetails(this)">Rent<button>
    // //     </div>
    // // </div>
    // // `;

    Dvdcard.innerHTML = `      <div class="card" id=${Dvd.id}>
            <img src="${Dvd.image}" alt="${Dvd.title}" class="item-image">
            <div class="card-content">
                <h2 class="item-title">Movie Name: ${Dvd.title}</h2>
                <p class="item-description">Genre: ${Dvd.category} <br> Release date: ${Dvd.Date} <br> Director: ${Dvd.Director}</p>
                <label>Quantity:</label><br>
                <input type="number" class="item-quantity" value="${Dvd.quantity}" min="1" readonly>
                <button class="rent-button" onclick="toggleRentButton(this)">Rent</button>
            
            </div>
        </div>
    `;

    return Dvdcard;
  }

  function displayDvd() {
    Dvds.forEach((Dvd) => {
      const dvdCard = createDvdCard(Dvd);
      rentContainer.appendChild(dvdCard);
    });
  }

  displayDvd();
}

window.location.onload = showdvd();

// Function to toggle between "Rent" and "Confirm Rent"
function toggleRentButton(buttonElement) {
  // Check if the button is in "Rent" or "Confirm Rent" state
  if (buttonElement.innerText === "Rent") {
    buttonElement.innerText = "Confirm Rent"; // Change to "Confirm Rent"
  } else if (buttonElement.innerText === "Confirm Rent") {
    storeItemDetails(buttonElement); // Store item details in localStorage
    buttonElement.innerText = "Rent"; // Revert back to "Rent"
  }
}

function storeItemDetails(buttonElement) {
  try {
    // Find the closest card to the button that was clicked
    var card = buttonElement.closest(".card");

    if (!card) {
      console.error("Card not found!");
      return;
    }

    // Retrieve the current user from sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please log in to rent a DVD.");
      return;
    }

    // Retrieve available DVDs from localStorage
    const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];
    var dvdId = card.id; // Assuming the card's id is the DVD id
    var dvd = Dvds.find((dvd) => dvd.id == dvdId);

    if (!dvd) {
      console.error("DVD not found for the given card ID:", dvd);
      return;
    }

    var itemTitle = card.querySelector(".item-title")
      ? card.querySelector(".item-title").innerText
      : null;

    // Check DVD availability (assuming `dvd.quantity` holds the stock quantity)
    var quantity = dvd.quantity;

    // If the DVD is out of stock
    if (quantity === 0) {
      alert("Sorry, this DVD is out of stock.");
      return; // Exit the function if out of stock
    }

    // Toggle between "Rent" and "Confirm Rent"
    if (buttonElement.textContent === "Rent") {
      buttonElement.textContent = "Confirm Rent"; // Change button text to "Confirm Rent"
      
    } else if (buttonElement.textContent === "Confirm Rent") {
      // Proceed with the rental process if the button is in "Confirm Rent" state
      const itemDetails = {
        rentalid: Number(Math.floor(Math.random() * 1000)),
        dvdid: dvd.id, // Use the found DVD's ID
        title: itemTitle,
        user: currentUser.username,
        NIC: currentUser.nic,
        rentdate: new Date(),
        status: "pending",
        quantity: 1, // Assuming each rental is for 1 DVD
        cusid: currentUser.id,
      };

      // Retrieve existing rental items or initialize an empty array
      const customerRental = JSON.parse(localStorage.getItem("rentItem")) || [];
      customerRental.push(itemDetails);

      // Store updated rental items back to localStorage
      localStorage.setItem("rentItem", JSON.stringify(customerRental));

      // Alert the customer that the rental is confirmed
      alert(`Rental for "${itemTitle}" has been confirmed!`);

      // Reset the button back to "Rent"
      buttonElement.textContent = "Rent";

      // If there's a cancel button, remove it after confirmation
      const cancelButton = buttonElement.parentElement.querySelector(".cancel-rent-btn");
      if (cancelButton) cancelButton.remove();
    }

  } catch (err) {
    console.error("An error occurred: " + err);
  }
}


document.getElementById("saveDetails").addEventListener("click", saveDetails);
function saveDetails() {
  let rentItem = JSON.parse(localStorage.getItem("rentItem"));

  alert(
    `You have rented ${rentItem.title} with quantity ${rentItem.quantity} you get the Dvd before 24 hours afater the hour your rent will be cancel `
  );

  // Close the modal after saving
  document.getElementById("rentpopup").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  var modal = document.getElementById("rentpopup");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Optionally load saved data from localStorage (if needed)
window.onload = function () {
  let rentItem = JSON.parse(localStorage.getItem("rentItem"));
  if (rentItem) {
    console.log("Previously rented item details:", rentItem);
    // Optionally, populate the modal with previously saved data when page loads
  }
};

function filterVideos() {
  // Retrieve the stored DVDs from localStorage
  const Dvd = JSON.parse(localStorage.getItem("Dvds")) || [];

  // Get the user input for search and genre
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const genreFilter = document.getElementById("genreFilter").value;

  // Filter the DVDs based on the input and selected genre
  const filteredVideos = Dvd.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchInput);
    const matchesGenre = genreFilter === "" || video.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  // Display the filtered videos
  displayVideos(filteredVideos);
}

// Event listeners for input changes
document.getElementById("searchInput").addEventListener("input", filterVideos);
document.getElementById("genreFilter").addEventListener("change", filterVideos);

// Initial display of all videos
const Dvd = JSON.parse(localStorage.getItem("Dvds")) || [];

// Modal setup
const modals = document.getElementById("videoModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeModals = document.querySelector(".close");

// Event listener for video item clicks
document.getElementById("videoList").addEventListener("click", (event) => {
  if (event.target.closest(".video-item")) {
    const videoTitle = event.target
      .closest(".video-item")
      .querySelector("h3").textContent;
    const video = Dvd.find((v) => v.title === videoTitle);

    if (video) {
      modalTitle.textContent = video.title;
      modalImage.src = video.image;
      modalDescription.textContent =
        video.description || "Description not available"; // Display actual description
      modals.style.display = "block";
    }
  }
});

// Close modal functionality
closeModals.onclick = function () {
  modals.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modals) {
    modals.style.display = "none";
  }
};

// Function to display videos in the DOM
function displayVideos(videos) {
  const videoList = document.getElementById("videoList");
  videoList.innerHTML = ""; // Clear existing videos

  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");
    videoItem.innerHTML = `
          <h3>Movie Name: ${video.title}</h3>
          <img src="${video.image}" alt="${video.title}">
          <p>Category: ${video.category || "No description available"}</p>
      `;
    videoList.appendChild(videoItem);
  });
}

// Function to close the modal
document.getElementById("closebutton").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("Profile").style.display = "none";
}

document.getElementById("userInfo").addEventListener("click", showProfile);

const currentuser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentuser) {
  document.getElementById("name").value = currentuser.username;
  document.getElementById("email").value = currentuser.email;
  document.getElementById("phone").value = currentuser.number;
  document.getElementById("nic").value = currentuser.nic;
}

//   // Function to show profile and populate data from localStorage
function showProfile() {
  const profileSection = document.getElementById("Profile");
  profileSection.style.display = "block";
  // document.getElementById('Contact').style.display='none';

  // Function to enable editing (except for NIC)

  document.getElementById("updateButton").addEventListener("click", enableEdit);
  function enableEdit() {
    const form = document.getElementById("customerForm");
    const inputs = form.querySelectorAll("input");

    // Enable all input fields except NIC
    inputs.forEach((input) => {
      if (input.id !== "nic") {
        input.removeAttribute("readonly");
        input.style.backgroundColor = "#fff";
      }
    });

    // Change button text after enabling edit
    document.getElementById("updateButton").innerText = "save details";
    document.getElementById("updateButton").onclick = saveDetails;
  }

  // Function to save updated details back to localStorage
  function saveDetails() {
    // Retrieve customer details from localStorage
    const customer = JSON.parse(localStorage.getItem("customers")) || [];

    const cus = customer.find(
      (c) => c.username == document.getElementById("name").value
    );

    (cus.username = document.getElementById("name").value),
      (cus.email = document.getElementById("email").value),
      (cus.number = document.getElementById("phone").value),
      // Save updated customer details to localStorage
      localStorage.setItem("customers", JSON.stringify(customer));

    // Set all inputs back to read-only after saving
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("readonly", "readonly");
      input.style.backgroundColor = "#e9ecef";
    });

    // Change button text back to "Update Details"
    document.getElementById("updateButton").innerText = "Update Details";
    document.getElementById("updateButton").onclick = enableEdit;

    // alert('Details Updated Successfully!');
    document.getElementById("msg").textContent =
      "Your profile Updated Success Fully. !";
  }

  // Populate form fields with the retrieved data
}

// Get modal elements
var modal = document.getElementById("reviewModal");
var btn = document.getElementById("addReviewLink");
var span = document.getElementById("closeModal");
var form = document.getElementById("reviewForm");
var messageDiv = document.getElementById("message");
var reviewsContainer = document.querySelector(".reviews-container");

// Show the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// Handle form submission

form.addEventListener("submit", addreview);

function addreview(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("reviewname").value;
  const email = document.getElementById("reviewemail").value;
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value;

  // Validate data (basic example)
  if (!name || !email || !rating || !review) {
    alert("Please fill out all fields.");
    return;
  }
  //     // Create new review element
  //     var newReview = document.createElement('div');
  //     newReview.className = 'box';
  //     newReview.innerHTML = `
  //       <div class="rev-img">
  //           <img src="../img/avatar.png" alt="">
  //       </div>
  //         <h1>${name}</h1>
  //       <div class="stars">
  //           ${'&#9733;'.repeat(rating)} ${rating < 5 ? '&#9734;'.repeat(5 - rating) : ''}
  //       </div>

  //       <p>${review}</p>
  //   `;

  //     // Append the new review to the reviews container
  //     reviewsContainer.appendChild(newReview);

  // Save the review to local storage
  const newReviewObj = { name, email, rating, review };
  saveReviewToLocalStorage(newReviewObj);

  // Optionally, you could also clear the form
  alert("Thank you for your review!");
  form.reset();
}

function saveReviewToLocalStorage(review) {
  // Retrieve existing reviews from local storage or initialize as empty array
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Add new review to the array
  reviews.push(review);

  // Save updated reviews array to local storage
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

document
  .getElementById("reviews")
  .addEventListener("click", loadReviewsFromLocalStorage);

function loadReviewsFromLocalStorage() {
  // Retrieve reviews from local storage
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Render each review
  reviews.forEach((review) => {
    const newReview = document.createElement("div");
    newReview.className = "box";
    newReview.innerHTML = `
            <div class="rev-img">
                <img src="../img/avatar.png" alt="User Avatar">
            </div>
            <h1>${review.name}</h1>
            <div class="stars">
                ${"&#9733;".repeat(review.rating)} ${
      review.rating < 5 ? "&#9734;".repeat(5 - review.rating) : ""
    }
            </div>
            <p>${review.review}</p>
        `;
    reviewsContainer.appendChild(newReview);
  });
}

// Load reviews when page is loaded
loadReviewsFromLocalStorage();
