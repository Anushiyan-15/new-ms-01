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

    Dvdcard.innerHTML = `      <div class="card">
            <img src="${Dvd.image}" alt="${Dvd.title}" class="item-image">
            <div class="card-content">
                <h2 class="item-title">Movie Name: ${Dvd.title}</h2>
                <p class="item-description">Genre: ${Dvd.category} <br> Release date: ${Dvd.Date} <br> Director: ${Dvd.Director}</p>
                <label>Quantity:</label><br>
                <input type="number" class="item-quantity" value="${Dvd.quantity}" min="1" readonly>
                <button class="rent-button" onclick="storeItemDetails(this)">Rent</button>
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

window.onload = showdvd();

// Example array of DVDs (can come from a server or database)
// const dvds = [
//     { id: '101', title: 'Movie A', description: 'A thrilling action movie.' },
//     { id: '102', title: 'Movie B', description: 'A heartwarming romantic movie.' },
//     { id: '103', title: 'Movie C', description: 'A mind-bending sci-fi movie.' }
// ];

// // Function to dynamically load DVDs
// function loadDVDs() {
//     const dvdListDiv = document.getElementById('dvd-list');
//     dvdListDiv.innerHTML = '';  // Clear any existing content

//     dvds.forEach(dvd => {
//         const dvdDiv = document.createElement('div');
//         dvdDiv.classList.add('dvd-item');
//         dvdDiv.innerHTML = `
//             <p><strong>${dvd.title}</strong></p>
//             <button onclick="showDVDDetails('${dvd.id}')">Rent</button>
//         `;
//         dvdListDiv.appendChild(dvdDiv);
//     });
// }

// Function to show DVD details and allow customer to rent
function showDVDDetails(dvdId) {
  const selectedDVD = dvds.find((dvd) => dvd.id === dvdId);
  const dvdDetailsDiv = document.getElementById("dvd-details");

  if (selectedDVD) {
    dvdDetailsDiv.innerHTML = `
            <h2>DVD Details</h2>
            <p>Title: ${selectedDVD.title}</p>
            <p>Description: ${selectedDVD.description}</p>
            <button onclick="rentDVD('${selectedDVD.id}', '${selectedDVD.title}')">Confirm Rent</button>
        `;
  } else {
    dvdDetailsDiv.innerHTML = "<p>DVD not found.</p>";
  }
}

// Function to handle rent button click and send rental request
function rentDVD(dvdId, dvdTitle) {
  const rentRequest = {
    dvdId: dvdId,
    dvdTitle: dvdTitle,
    status: "pending",
    customerId: "12345", // Replace with actual customer ID or fetch dynamically
  };

  // Store the rent request in localStorage for simplicity (or send to server)
  localStorage.setItem(`rentRequest-${dvdId}`, JSON.stringify(rentRequest));

  alert(`Rental request for "${dvdTitle}" sent to manager for approval!`);
}

// Call loadDVDs() on page load to display the list of DVDs
// window.onload = loadDVDs;

// Function to dynamically store item details (including quantity) when 'Rent' button is clicked
function storeItemDetails(buttonElement) {
  // Find the closest card to the button that was clicked
  var card = buttonElement.closest(".card");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];

  // Extract dynamic details from the card
  if (card) {
      var itemTitle = card.querySelector(".item-title").innerText;
      var itemImage = card.querySelector(".item-image")
      ? card.querySelector(".item-image").src
      : null;
      var itemDescription = card.querySelector(".item-description").innerText;
      var itemQuantity = card.querySelector(".item-quantity").value; // Get the quantity input v
      
      // Store details in localStorage
      const itemDetails = {
          dvdid:Dvds.id,
          title: itemTitle,
          image: itemImage,
          user: currentUser.username,
          NIC: currentUser.nic,
          description: itemDescription,
          status: "pending",
          quantity: parseInt(itemQuantity) // Store quantity as an integer
        };
    const customerRental = JSON.parse(localStorage.getItem('rentItem')) || []
    customerRental.push(itemDetails)
    localStorage.setItem("rentItem", JSON.stringify(customerRental));

    // Now show the popup with the stored details
    showRentPopup();
  }

  function mainquantity(itemQuantity) {
    const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];
    const rentItem = JSON.parse(localStorage.getItem("rentItem")) || [];

    const dvdToUpdate = Dvds.find((dvd) => dvd.title === rentItem.title);
    dvdToUpdate.quantity -= itemQuantity;
    localStorage.setItem("Dvds", JSON.stringify(dvdToUpdate));

    // if (dvdToUpdate) {

    //     console.log(`Updated Dvds after renting:`, Dvds);
    // } else {
    //     console.log('Could not find DVD in the list.');
    // }
  }

  // Function to show the modal and populate the content from localStorage
  function showRentPopup() {
    // Retrieve the item details from localStorage
    let rentItem = JSON.parse(localStorage.getItem("rentItem"));

    if (rentItem) {
      // Populate the modal with the retrieved data
      document.getElementById("popup-title").innerText = rentItem.title;
      document.getElementById("popup-image").src = rentItem.image;
      document.getElementById("popup-description").innerText =
        rentItem.description;
      // document.getElementById('quantity').value = rentItem.quantity;

      // Display the modal
      document.getElementById("rentpopup").style.display = "block";
    } else {
      alert("No item found in localStorage");
    }
  }

  // Function to close the modal
  // document.getElementById('closebutton').onclick = function() {
  //     document.getElementById('rentpopup').style.display = 'none';
  // }

  document
    .getElementById("closebutton")
    .addEventListener("click", cloasepopuprent);

  function cloasepopuprent() {
    document.getElementById("rentpopup").style.display = "none";
  }

  // Function to save the final details (e.g., when the user confirms rent)
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

  // function filterVideos() {
  //     const searchInput = document.getElementById('searchInput').value.toLowerCase();
  //     const genreFilter = document.getElementById('genreFilter').value;

  //     const filteredVideos = Dvd.filter(video => {
  //         const matchesSearch = video.title.toLowerCase().includes(searchInput);
  //         const matchesGenre = genreFilter === '' || video.genre === genreFilter;
  //         return matchesSearch && matchesGenre;
  //     });

  //     displayVideos(filteredVideos);
  // }

  // document.getElementById('searchInput').addEventListener('input', filterVideos);
  // document.getElementById('genreFilter').addEventListener('change', filterVideos);

  // // Initial display
  // displayVideos(Dvd);

  // const modal = document.getElementById('videoModal');
  // const modalTitle = document.getElementById('modalTitle');
  // const modalImage = document.getElementById('modalImage');
  // const modalDescription = document.getElementById('modalDescription');
  // const closeModal = document.querySelector('.close');

  // document.getElementById('videoList').addEventListener('click', event => {
  //     if (event.target.closest('.video-item')) {
  //         const videoTitle = event.target.closest('.video-item').querySelector('h3').textContent;
  //         const video = Dvd.find(v => v.title === videoTitle);

  //         if (video) {
  //             modalTitle.textContent = video.title;
  //             modalImage.src = video.image;
  //             modalDescription.textContent = 'Description for ' + video.title; // Replace with actual description if available
  //             modal.style.display = 'block';
  //         }
  //     }
  // });

  // closeModal.onclick = function () {
  //     modal.style.display = 'none';
  // }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
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
