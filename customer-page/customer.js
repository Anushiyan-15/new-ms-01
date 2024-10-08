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
  // location.reload();
}

window.location.onload = showdvd();



// function storeItemDetails(buttonElement) {
//   try {
//     // Find the closest card to the button that was clicked
//     var card = buttonElement.closest(".card");
    
//     if (!card) {
//       console.error("Card not found!");
//       return;
//     }

//     const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
//     if (!currentUser) {
//       // console.error("No current user found in session storage!");
//       return;
//     }

//     // const cus = JSON.parse(localStorage.getItem('customers')) || [];

//     const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];
//     // console.log("Available DVDs:", Dvds); // Log the available DVDs for debugging
//     var dvdId = card.id; // Assuming the card's id is the DVD id
//     var dvd = Dvds.find(dvd => dvd.id == dvdId);

//     if (!dvd) {
//       console.error("DVD not found for the given card ID:", dvd);
//       return;
//     }

//     var itemTitle = card.querySelector(".item-title") ? card.querySelector(".item-title").innerText : null;
//     // var itemImage = card.querySelector(".item-image") ? card.querySelector(".item-image").src : null;
//     // var itemDescription = card.querySelector(".item-description") ? card.querySelector(".item-description").innerText : null;

//     // Store details in localStorage
//     const itemDetails = {
//       rentalid:Number(Math.floor(Math.random() * 1000)),
//       dvdid: dvd.id, // Use the found DVD's ID
//       title: itemTitle,
//       user: currentUser.username,
//       NIC: currentUser.nic,
//       rentdate:new Date(),
//       status: "pending",
//       quantity: 1 ,
//       cusid:currentUser.id
//     };

//     if(quantity!<0){

//     }

//     // Retrieve existing rental items or initialize an empty array
//     const customerRental = JSON.parse(localStorage.getItem('rentItem')) || [];
//     customerRental.push(itemDetails);
    
//     // Store updated rental items back to localStorage
//     localStorage.setItem("rentItem", JSON.stringify(customerRental));

//     // Now show the popup with the stored details
//     showRentPopup();
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

function storeItemDetails(buttonElement) {
  try {
    // Find the closest card to the button that was clicked
    var card = buttonElement.closest(".card");
    
    if (!card) {
      console.error("Card not found!");
      return;
    }

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      // console.error("No current user found in session storage!");
      return;
    }

    const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];
    var dvdId = card.id; // Assuming the card's id is the DVD id
    var dvd = Dvds.find(dvd => dvd.id == dvdId);

    if (!dvd) {
      console.error("DVD not found for the given card ID:", dvd);
      return;
    }

    var itemTitle = card.querySelector(".item-title") ? card.querySelector(".item-title").innerText : null;
    
    // Assuming dvd.quantity holds the available quantity
    var quantity = dvd.quantity; // Adjust this based on your DVD object structure

    // Check if quantity is 0
    if (quantity === 0) {
      alert("Customer, DVD quantity is out of stock!");
      return; // Exit the function if out of stock
    }

    // Store details in localStorage
    const itemDetails = {
      rentalid: Number(Math.floor(Math.random() * 1000)),
      dvdid: dvd.id, // Use the found DVD's ID
      title: itemTitle,
      user: currentUser.username,
      NIC: currentUser.nic,
      rentdate: new Date(),
      status: "pending",
      quantity: 1,
      cusid: currentUser.id
    };

    // Retrieve existing rental items or initialize an empty array
    const customerRental = JSON.parse(localStorage.getItem('rentItem')) || [];
    customerRental.push(itemDetails);
    
    // Store updated rental items back to localStorage
    localStorage.setItem("rentItem", JSON.stringify(customerRental));

    // Now show the popup with the stored details
    showRentPopup(itemDetails);
  } catch (err) {
    console.error("An error occurred: " + err);
  }
}





// Function to show the modal and populate the content from localStorage
// function showRentPopup() {
//   // Retrieve the item details from localStorage
//   let rentItem = JSON.parse(localStorage.getItem("rentItem"));

//   if (rentItem) {
//     // Populate the modal with the retrieved data
//     document.getElementById("popup-title").innerText = rentItem.title;
//     document.getElementById("popup-image").src = rentItem.image;
//     document.getElementById("popup-description").innerText =
//       rentItem.description;
//     // document.getElementById('quantity').value = rentItem.quantity;

//     // Display the modal
//     document.getElementById("rentpopup").style.display = "block";
//   } else {
//     alert("No item found in localStorage");
//   }
// }

function showRentPopup(itemDetails) {

   let rentItem = JSON.parse(localStorage.getItem("rentItem")) || [];
   let dvds=JSON.parse(localStorage.getItem('Dvds')) || []

   rentItem.forEach(e => {
    console.log(itemDetails.rentalid)
    console.log( e.rentalid)
    console.log(itemDetails.rentalid == e.rentalid)
    // dvds.forEach(element => {
      
    // });
    if (itemDetails.rentalid == e.rentalid) {
      // Populate the modal with the retrieved data
      document.getElementById("popup-title").innerText = e.title;
      // You might want to ensure the image property exists in your itemDetails
      document.getElementById("popup-image").src = e.image || ''; 
      document.getElementById("popup-description").innerText = e.image || 'No description available';
      // document.getElementById('quantity').value = e.quantity;
  
      // Display the modal
      document.getElementById("rentpopup").style.display = "block";
    } else {
      alert("No item details provided for the popup");
    }

   });
  


}


// Function to close the modal
document.getElementById('closebutton').onclick = function() {
    document.getElementById('rentpopup').style.display = 'none';
}

document.getElementById("closebutton").addEventListener("click", cloasepopuprent);

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
                ${"&#9733;".repeat(review.rating)} ${review.rating < 5 ? "&#9734;".repeat(5 - review.rating) : ""
      }
            </div>
            <p>${review.review}</p>
        `;
    reviewsContainer.appendChild(newReview);
  });
}

// Load reviews when page is loaded
loadReviewsFromLocalStorage();
