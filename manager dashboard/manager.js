function dashboardshow() {
  document.getElementById("dashboardcontainer").style.display = "block";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
}

function homepage() {
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
}

function reports() {
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "block";


    // Call the function to load the report counts
    loadReportCounts();
}

document.addEventListener("DOMContentLoaded", function () {
  const addDvdForm = document.getElementById("add-Dvd-form");
  const DvdsTableBody = document
    .getElementById("Dvds-table")
    .querySelector("tbody");

  // Hardcoded dvd data
  const initialdvd = [];

  // Function to display Dvds in the table

  document.getElementById("displaydvd").addEventListener("click", displayDvd);
  function displayDvd() {
    document.getElementById("dashboardcontainer").style.display = "none";
    document.getElementById("customerdcontainer").style.display = "none";
    document.getElementById("rentaldcontainer").style.display = "none";
    document.getElementById("overduedcontainer").style.display = "none";
    document.getElementById("returncontainer").style.display = "none";
    document.getElementById("display").style.display = "block";
    document.getElementById("reportcontainer").style.display = "none";

    const Dvd = JSON.parse(localStorage.getItem("Dvds")) || [];
    DvdsTableBody.innerHTML = ""; // Clear existing rows

    Dvd.forEach((Dvd, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${Dvd.image}" alt="Dvd Image" style="width: 100px; height: auto;"></td>
                <td>${Dvd.title}</td>
                <td>${Dvd.Director}</td>
                <td>${Dvd.Date}</td>
                <td>${Dvd.category}</td>
                <td>${Dvd.quantity}</td>
                <td colspan="2"><button class="editBtn" data-index="${index}">Edit </button>
                <button class="delete-button" data-index="${index}">Delete</button></td>
            `;
      DvdsTableBody.appendChild(row);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const Dvd = JSON.parse(localStorage.getItem("Dvds")) || [];
        Dvd.splice(index, 1);
        localStorage.setItem("Dvds", JSON.stringify(Dvd));
        displayDvd();
      });
    });
  }

  // Initialize Dvds in localStorage if empty
  function initializeDvd() {
    const Dvd = JSON.parse(localStorage.getItem("Dvds"));
    if (!Dvd || Dvd.length === 0) {
      localStorage.setItem("Dvds", JSON.stringify(initialdvd));
    }
  }

  addDvdForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("add-Dvd-title").value.trim();
    const Director = document.getElementById("add-Dvd-Director").value.trim();
    const id = Number(Math.floor(Math.random() * 1000));
    console.log(id);
    const category = document.getElementById("add-Dvd-category").value.trim();
    const Date = document.getElementById("add-dvd-date").value.trim();
    const quantity = document.getElementById("add-Dvd-Quantity").value.trim();
    const imageInput = document.getElementById("add-Dvd-image");

    if (!title || !Director || !category || !Date || !quantity || !imageInput) {
      alert("All fields are required.");
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64Image = reader.result;

      // Retrieve existing bikes or initialize an empty array
      const Dvd = JSON.parse(localStorage.getItem("Dvds")) || [];

      // Add new Dvd to the array
      Dvd.push({
        image: base64Image,
        title,
        Director,
        category,
        Date,
        quantity,
        id,
      });

      // Store updated array back in localStorage
      localStorage.setItem("Dvds", JSON.stringify(Dvd)); // set local storage for Dvd

      alert(`Success! New Movie ${title} has been added to your inventory! 🎉`); // show message fir manager when dvd comletely added

      addDvdForm.reset();
      // displayDvd(); // Refresh the table
    };

    if (imageInput.files[0]) {
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      alert("Please choose an image file.");
    }
  });

  // Initialize DVD and display them
  initializeDvd();
});

// customer show

function customershow() {
  document.getElementById("customerdcontainer").style.display = "block";
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
}
function displayCustomers() {
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  const customerTable = document.getElementById("customer-body");
  customerTable.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
         <td>${customer.username}</td>
            <td>${customer.nic}</td>
            <td>${customer.email}</td>        
            <td>${customer.number}</td>
         
        `;
    customerTable.appendChild(row);
  });

  if (customers.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="6">No customers found.</td>';
    customerTable.appendChild(row);
  }
}

displayCustomers();
// Load customers on page load
window.onload = displayCustomers;

// rental show function
function rentalshow() {
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "block";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
}

// function displayrentals() {

//     let rentals = JSON.parse(localStorage.getItem('rentItem')) || [];
//     const rentalTable = document.getElementById('rental-body');
//     rentalTable.innerHTML = '';

//     rentals.forEach(rental => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${rental.nic}</td>
//             <td>${rental.name}</td>
//             <td>${rental.number}</td>
//           <td>${rental.rentDate}</td>
//         `;
//         rentalTable.appendChild(row);
//     });

//     if (rentals.length === 0) {
//         const row = document.createElement('tr');
//         row.innerHTML = '<td colspan="6">No rental found.</td>';
//         rentalTable.appendChild(row);
//     }
// }
// window.onload = displayrentals;

// overdue alert
// function overdueshow() {
//     document.getElementById('dashboardcontainer').style.display = 'none';
//     document.getElementById('customerdcontainer').style.display = 'none';
//     document.getElementById('rentaldcontainer').style.display = 'none';
//     document.getElementById('overduedcontainer').style.display = 'block';
//     document.getElementById('returncontainer').style.display = 'none';

// }

// function checkOverdueRentals() {
// let customers = JSON.parse(localStorage.getItem('customers')) || [];
// console.log(customers)
//     const now = new Date();
//     const overdueList = document.getElementById('overdue-list');
//     overdueList.innerHTML = '';

//     customers.forEach(customer => {
//         customer.rentalHistory.forEach(rental => {
//             const returnDate = new Date(rental.returnDate);
//             if (!rental.returnProcessed && returnDate < now) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${customer.nic}</td>
//                      <td>${customer.username}</td>
//                     <td>${rental.regNumber}</td>
//                     <td>${new Date(rental.rentalDate).toLocaleString()}</td>
//                     <td>${returnDate.toLocaleString()}</p>
//                     <td>${(now - returnDate) / (1000 * 60 * 60)}</td>
//                 `;
//                 overdueList.appendChild(row);
//             }
//         });
//     });

//     if (overduelist.innerHTML === '') {
//         overduelist.innerHTML = 'No overdue rentals found';
//     }
// }
// window.onload = checkOverdueRentals;

function returnshow() {
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "block";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
}

function overdueshow() {
  const rentals = JSON.parse(localStorage.getItem("Rentals")) || [];
  const overdue = JSON.parse(localStorage.getItem("Overdue")) || [];
  const overdueList = document.getElementById("overdue-list");
  overdueList.innerHTML = ""; // Clear existing rows

  rentals.forEach((rental) => {
    const currentDate = new Date();
    const returnDate = new Date(rental.returnDate);

    if (currentDate > returnDate) {
      const daysLate = Math.ceil(
        (currentDate - returnDate) / (1000 * 60 * 60 * 24)
      );
      alert(`You are ${daysLate} days late! Late fees may apply.`);
    }

      // Add to overdue list
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${rental.nic}</td>
                <td>${rental.name}</td>
                <td>${rental.rentDate}</td>
                <td>${rental.returnDate}</td>
                <td>${charge} Rs</td>
            `;
      overdueList.appendChild(row);
    });
      // Show the overdue section and hide other sections
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "none";
  document.getElementById("overduedcontainer").style.display = "block";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
  };




// Function to load pending rental requests from localStorage
function loadPendingRentals() {
  const keys = Object.keys(localStorage);
  const pendingRentals = keys.filter((key) => key.startsWith("rentItem"));
  let foundPendingRental = false;
  pendingRentals.forEach((keys) => {
    const rentalRequest = JSON.parse(localStorage.getItem(keys));
    // console.log(rentalRequest)

    rentalRequest.forEach((e) => {
      if (e.status === "pending") {
        displayRentalRequest(e);
        console.log("Displaying Rental Request:", e);
        foundPendingRental = true;
      }
    }); //in the rental of the all array should assign in the rental request
  });
  // Check if no rental requests were found and display a message
  const rentalBody = document.getElementById("rental-body");
  if (!foundPendingRental) {
    rentalBody.innerHTML =
      '<tr><td colspan="6">No rental requests found.</td></tr>'; // Update table body to show the message
  }
  // Show the rental section and hide other sections
  document.getElementById("dashboardcontainer").style.display = "none";
  document.getElementById("customerdcontainer").style.display = "none";
  document.getElementById("rentaldcontainer").style.display = "block";
  document.getElementById("overduedcontainer").style.display = "none";
  document.getElementById("returncontainer").style.display = "none";
  document.getElementById("reportcontainer").style.display = "none";
  document.getElementById("display").style.display = "none";
}
// Function to display each pending rental request in the manager's dashboard
function displayRentalRequest(rentalRequest) {
  console.log(rentalRequest);

  const rentalBody = document.getElementById("rental-body");

  rentalBody.innerHTML += `<tr>
        <td>${rentalRequest.NIC}</td>
        <td>${rentalRequest.user}</td>
        <td>${rentalRequest.title}</td>
        <td>${rentalRequest.status}</td>
        <td>${rentalRequest.rentdate}</td>
        <td> <button onclick="approveRental('${rentalRequest.dvdid}')">Approve</button>
        <button onclick="declineRental('${rentalRequest.dvdid}')">Decline</button></td>
        </tr>

    `;
}

function approveRental(dvdid) {
  // Retrieve all pending rentals and the customer list from localStorage
  let pendingRentals = JSON.parse(localStorage.getItem("rentItem")) || [];
  let currentUserList = JSON.parse(localStorage.getItem("customers")) || [];

  let movietitle;
  let approvedRental = null;

  // Loop through all rentals and match the dvdid and customer ID
  pendingRentals.forEach((rental) => {
    currentUserList.forEach((user) => {
      // Check if the rental is pending, and the dvdid and customer ID match
      if (
        rental.status === "pending" &&
        rental.dvdid == dvdid &&
        rental.cusid == user.id &&
        rental.NIC === user.nic
      ) {
        rental.status = "Approved";

        // Calculate the return date (7 days from the approval date)
        const currentDate = new Date();
        const returnDate = new Date(currentDate);
        returnDate.setDate(currentDate.getDate() + 7);
        rental.returnDate = returnDate.toISOString(); // Save return date in ISO format

        movietitle = rental.title; // Save the movie title for the alert
        approvedRental = rental; // Save the approved rental for later use

        // Optionally update DVD quantity logic here if needed
        mainquantity(rental.dvdid, 1);
      }
    });
  });

  // If an approved rental was found, save the updated rentals back to local storage
  if (approvedRental) {
    localStorage.setItem("rentItem", JSON.stringify(pendingRentals));
    alert(`Rental for "${movietitle}" has been approved!`);
  } else {
    alert("Rental request not found or already processed.");
  }

  // Optionally reload the page or update the UI accordingly
  location.reload(); // Uncomment this if you want to reload the page
}

function declineRental(dvdid) {
  // Retrieve the current rentals and customer list from localStorage
  let pendingRentals = JSON.parse(localStorage.getItem("rentItem")) || [];
  let currentUserList = JSON.parse(localStorage.getItem("customers")) || [];

  let declinedRental = null;

  // Loop through all rentals and match the dvdid and customer ID
  pendingRentals.forEach((rental) => {
    currentUserList.forEach((user) => {
      // Check if the rental is pending, and the dvdid and customer ID match
      if (
        rental.status === "pending" &&
        rental.dvdid == dvdid &&
        rental.cusid == user.id
      ) {
        rental.status = "Declined";
        declinedRental = rental; // Save the declined rental for later use
      }
    });
  });

  // If a declined rental was found, save the updated rentals back to local storage
  if (declinedRental) {
    localStorage.setItem("rentItem", JSON.stringify(pendingRentals));
    alert("Rental request has been declined.");
  } else {
    alert("Rental request not found or already processed.");
  }

  // Optionally reload the page or update the UI accordingly
  location.reload(); // Uncomment this if you want to reload the page
}

function mainquantity(dvdid, quantity) {
  const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];

  // Find the DVD to update
  const dvdToUpdate = Dvds.find((dvd) => dvd.id === dvdid);

  if (dvdToUpdate) {
    dvdToUpdate.quantity -= quantity;

    // Ensure quantity doesn't go below zero
    if (dvdToUpdate.quantity < 0) {
      alert("Quantity cannot be negative");
      dvdToUpdate.quantity = 0; // Set to zero or handle it as you see fit
    }

    // Save the updated DVD list back to local storage
    localStorage.setItem("Dvds", JSON.stringify(Dvds));

    console.log(`Updated Dvds after renting:`, Dvds);
  } else {
    console.log("Could not find DVD in the list.");
  }
}

function returndvd() {
  // Get form values
  const nic = document.getElementById("return-nic").value;
  const dvdid = document.getElementById("return-title").value;
  console.log(dvdid)

  let rentals = JSON.parse(localStorage.getItem("rentItem")) || [];
  let dvds = JSON.parse(localStorage.getItem("Dvds")) || [];

  let rentalFound = false; // Flag to track if rental was found

  rentals.forEach((rental) => {
    if (
      rental.dvdid == dvdid &&
      rental.NIC == nic &&
      rental.status === "Approved"
    ) {
      rentalFound = true; // Set flag to true since we found a matching rental
      const currentDate = new Date();
      const returnDate = new Date(rental.returnDate);

      if (currentDate > returnDate) {
        const daysLate = Math.ceil(
          (currentDate - returnDate) / (1000 * 60 * 60 * 24)
        );
        alert(`You are ${daysLate} days late! Late fees may apply.`);
      }

      // Update rental status
      rental.status = "Returned";
      rental.actualReturnDate = currentDate.toISOString();
      returnQuantity(rental.dvdid,1)
  
      // Clear the form fields
      document.getElementById("return-nic").value = "";
      document.getElementById("return-title").value = "";

      alert(`DVD "${rental.title}" returned successfully!`);
    }
  });

  if (!rentalFound) {
    alert("Rental request not found or already returned.");
    
      // Clear the form fields
      document.getElementById("return-nic").value = "";
      document.getElementById("return-title").value = "";
  }

  // Save updated data
  localStorage.setItem("rentItem", JSON.stringify(rentals));
  localStorage.setItem("Dvds", JSON.stringify(dvds));
}

function returnQuantity(dvdid, quantity) {
  const Dvds = JSON.parse(localStorage.getItem("Dvds")) || [];
  
  console.log("DVD ID to return:", dvdid);
  console.log("Current DVDs in local storage:", Dvds);

  // Find the DVD to update
  const dvdToUpdate = Dvds.find((dvd) => dvd.id === dvdid);
  console.log("assign dvd:",dvdToUpdate)

  if (dvdToUpdate) {
    dvdToUpdate.quantity += quantity; // Increase quantity for returns

    // Save the updated DVD list back to local storage
    localStorage.setItem("Dvds", JSON.stringify(Dvds));
 
    console.log(`Updated Dvds after returning:`, Dvds);

    // Check if localStorage was updated correctly
    const updatedDvds = JSON.parse(localStorage.getItem("Dvds"));
    console.log("DVDs from localStorage after update:", updatedDvds);
  } else {
    console.log("Could not find DVD in the list.");
  }
}


// Function to generate the rental report
function displayRentalReport() {
  const rentals = JSON.parse(localStorage.getItem("rentItem")) || [];
  const rentalReportBody = document.getElementById("rentalReportBody");
  rentalReportBody.innerHTML = ""; // Clear previous entries

  rentals.forEach((rental) => {
    if (rental.status === "Approved" || rental.status === "pending" || rental.status === "Declined"  ) {
      const rentalDate = new Date(rental.rentdate);

      rentalReportBody.innerHTML += `
        <tr>
          <td>${rental.rentalid}</td>
          <td>${rental.user} (${rental.NIC})</td>
          <td>${rental.title}</td>
          <td>${rentalDate.toLocaleDateString()}</td>
          <td>${rental.status}</td>
        </tr>
      `;
    }
  });

  // Hide return report and show rental report
  document.getElementById("rentalReport").style.display = "block";
  document.getElementById("returnReport").style.display = "none";
}

// Function to generate the return report
function displayReturnReport() {
  const rentals = JSON.parse(localStorage.getItem("rentItem")) || [];
  const returnReportBody = document.getElementById("returnReportBody");
  returnReportBody.innerHTML = ""; // Clear previous entries

  rentals.forEach((rental) => {
    if (rental.status === "Returned") {
      const rentalDate = new Date(rental.rentdate);
      const returnDate = new Date(rental.returnDate);
      const actualReturnDate = new Date(rental.actualReturnDate);

      returnReportBody.innerHTML += `
        <tr>
          <td>${rental.rentalid}</td>
          <td>${rental.user} (${rental.NIC})</td>
          <td>${rental.title}</td>
          <td>${rentalDate.toLocaleDateString()}</td>
          <td>${returnDate.toLocaleDateString()}</td>
          <td>${actualReturnDate.toLocaleDateString()}</td>
          <td>${rental.status}</td>
        </tr>
      `;
    }
  });

  // Hide rental report and show return report
  document.getElementById("returnReport").style.display = "block";
  document.getElementById("rentalReport").style.display = "none";
}

// Event listeners for buttons
document.getElementById("rentalReportBtn").addEventListener("click", displayRentalReport);
document.getElementById("returnReportBtn").addEventListener("click", displayReturnReport);




function loadReportCounts() {
  const rentals = JSON.parse(localStorage.getItem("rentItem")) || [];

  // Initialize counters for different rental statuses
  let totalPending = 0;
  let totalApproved = 0;
  let totalDeclined = 0;
  let totalReturned = 0;
  let totalRentals = rentals.length; // Total rental count

  // Loop through the rental items and count each status
  rentals.forEach(rental => {
      if (rental.status === "Pending") {
          totalPending++;
      } else if (rental.status === "Approved") {
          totalApproved++;
      } else if (rental.status === "Declined") {
          totalDeclined++;
      } else if (rental.status === "Returned") {
          totalReturned++;
      }
  });

  // Display the counts in the respective HTML elements
  document.getElementById("pendingCount").innerHTML = `Total Pending Rentals: ${totalPending}`;
  document.getElementById("approvedCount").innerHTML = `Total Approved Rentals: ${totalApproved}`;
  document.getElementById("declinedCount").innerHTML = `Total Declined Rentals: ${totalDeclined}`;
  document.getElementById("returnCount").innerHTML = `Total Returns: ${totalReturned}`;
  document.getElementById("totalRentalCount").innerHTML = `Total Rentals: ${totalRentals}`; // Display total rental count
}
