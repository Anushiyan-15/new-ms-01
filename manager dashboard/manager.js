

function dashboardshow() {
    document.getElementById('dashboardcontainer').style.display = 'block';
    document.getElementById('customerdcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';
  
}

function homepage(){
    
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('customerdcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';
  
}

document.addEventListener('DOMContentLoaded', function () {
    const addDvdForm = document.getElementById('add-Dvd-form');
    const DvdsTableBody = document.getElementById('Dvds-table').querySelector('tbody');

    // Hardcoded dvd data
    const initialdvd = [

    ];

    // Function to display Dvds in the table

    document.getElementById('displaydvd').addEventListener('click',displayDvd);
    function displayDvd() {
        document.getElementById('dashboardcontainer').style.display = 'none';
        document.getElementById('customerdcontainer').style.display = 'none';
        document.getElementById('rentaldcontainer').style.display = 'none';
        document.getElementById('overduedcontainer').style.display = 'none';
        document.getElementById('returncontainer').style.display = 'none';
        document.getElementById('display').style.display='block';


        const Dvd = JSON.parse(localStorage.getItem('Dvds')) || [];
        DvdsTableBody.innerHTML = ''; // Clear existing rows

        Dvd.forEach((Dvd, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${Dvd.image}" alt="Bike Image" style="width: 100px; height: auto;"></td>
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
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const Dvd = JSON.parse(localStorage.getItem('Dvds')) || [];
                Dvd.splice(index, 1);
                localStorage.setItem('Dvds', JSON.stringify(Dvd));
                displayDvd();
                
            });

        });




    }


    // Initialize Dvds in localStorage if empty
    function initializeDvd() {
        const Dvd = JSON.parse(localStorage.getItem('Dvds'));
        if (!Dvd || Dvd.length === 0) {
            localStorage.setItem('Dvds', JSON.stringify(initialdvd));
        }
    }

    addDvdForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('add-Dvd-title').value.trim();
        const Director = document.getElementById('add-Dvd-Director').value.trim();
        const id = Number(Math.floor(Math.random()*1000));
        console.log(id);
        const category = document.getElementById('add-Dvd-category').value.trim();
        const Date = document.getElementById('add-dvd-date').value.trim();
        const quantity = document.getElementById('add-Dvd-Quantity').value.trim();
        const imageInput = document.getElementById('add-Dvd-image');

        if (!title || !Director || !category || !Date || !quantity || !imageInput) {
            alert('All fields are required.');
            return;
        }

        // Convert image to Base64
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64Image = reader.result;

            // Retrieve existing bikes or initialize an empty array
            const Dvd = JSON.parse(localStorage.getItem('Dvds')) || [];

            // Add new Dvd to the array
            Dvd.push({ image: base64Image, title, Director, category, Date, quantity,id});

            // Store updated array back in localStorage
            localStorage.setItem('Dvds', JSON.stringify(Dvd));// set local storage for Dvd

            alert(`Success! New Movie ${title} has been added to your inventory! 🎉`);  // show message fir manager when dvd comletely added

            addDvdForm.reset();
            // displayDvd(); // Refresh the table
        };

        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            alert('Please choose an image file.');
        }
    });

    // Initialize DVD and display them
    initializeDvd();
   
    
});


// customer show

function customershow() {
    document.getElementById('customerdcontainer').style.display = 'block';
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';

}
function displayCustomers() {
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerTable = document.getElementById('customer-body');
    customerTable.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
         <td>${customer.username}</td>
            <td>${customer.nic}</td>
            <td>${customer.email}</td>        
            <td>${customer.number}</td>
         
        `;
        customerTable.appendChild(row);
    });

    if (customers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6">No customers found.</td>';
        customerTable.appendChild(row);
    }
}

displayCustomers();
// Load customers on page load
window.onload = displayCustomers;

function customerupdate(){
    document.getElementById('customerdcontainer').style.display = 'block';
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';
    document.getElementById('updatedcontainer').style.display='block'

}


// rental show function
// function rentalshow() {
//     document.getElementById('dashboardcontainer').style.display = 'none';
//     document.getElementById('customerdcontainer').style.display = 'none';
//     document.getElementById('rentaldcontainer').style.display = 'block';
//     document.getElementById('overduedcontainer').style.display = 'none';
//     document.getElementById('returncontainer').style.display = 'none';
//     
// }

// function displayrentals() {
    
//     let rentals = JSON.parse(localStorage.getItem('rentItem')) || [];
//     const rentalTable = document.getElementById('rental-body');
//     rentalTable.innerHTML = '';

//     rentals.forEach(rental => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${customers.nic}</td>
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



// return function

function returnshow() {
    document.getElementById('customerdcontainer').style.display = 'none';
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'block';
    document.getElementById('display').style.display='none';


    function returnMotorbike() {
        const nic = document.getElementById('return-nic').value;
        const dvdtitle = document.getElementById('return-title').value;
        const customer = customers.find(c => c.nic === nic);
        const DVD = motorbikes.find(m => m.registrationNumber === registrationNumber);

        if (!customer) {
            alert('Customer not found');
            return;
        }

        const rentalIndex = customer.rentalHistory.findIndex(r => r.nic === nic && !r.returnProcessed);
        if (rentalIndex === -1) {
            alert('Rental record not found');
            return;
        }

        customer.rentalHistory[rentalIndex].returnProcessed = true;
        DVD.quantity += 1;
        saveToLocalStorage();

        alert('DVD returned successfully!');
        document.getElementById('return-DVD-form').reset();
    }
}


function rentalshow() {
    const rentals = JSON.parse(localStorage.getItem('rentItem')) || [];
    const rentalBody = document.getElementById('rental-body');
    rentalBody.innerHTML = ''; // Clear existing rows

    rentals.forEach(rental => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rental.nic}</td>
            <td>${rental.name}</td>
            <td>${rental.phone}</td>
            <td>${rental.email}</td>
            <td>${rental.rentDate}</td>
        `;
        rentalBody.appendChild(row);
    });

    // Show the rental section and hide other sections
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('customerdcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'block';
    document.getElementById('overduedcontainer').style.display = 'none';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';
}



function returnDvd() {
    // Get form values
    const nic = document.getElementById('return-nic').value;
    const title = document.getElementById('return-title').value;

    // Retrieve data from local storage
    let rentals = JSON.parse(localStorage.getItem('Rentals')) || [];
    let dvds = JSON.parse(localStorage.getItem('Dvds')) || [];

    // Find rental record for the given NIC and DVD title
    const rentalIndex = rentals.findIndex(rental => rental.nic === nic && rental.title === title);
    if (rentalIndex === -1) {
        alert('No matching rental found for this NIC and DVD title.');
        return;
    }

    // Remove the rental record
    rentals.splice(rentalIndex, 1);
    localStorage.setItem('Rentals', JSON.stringify(rentals));

    // Update DVD inventory (optional: you can add quantity tracking here)
    // Example: Increase DVD stock
    const dvdIndex = dvds.findIndex(dvd => dvd.title === title);
    if (dvdIndex === -1) {
        alert('DVD not found in inventory.');
        return;
    }

    dvds[dvdIndex].quantity = (dvds[dvdIndex].quantity || 0) + 1;
    localStorage.setItem('Dvds', JSON.stringify(dvds));

    // Clear the form fields
    document.getElementById('return-nic').value = '';
    document.getElementById('return-title').value = '';

    alert('DVD returned successfully.');
}


function overdueshow() {
    const rentals = JSON.parse(localStorage.getItem('Rentals')) || [];
    const overdue = JSON.parse(localStorage.getItem('Overdue')) || [];
    const overdueList = document.getElementById('overdue-list');
    overdueList.innerHTML = ''; // Clear existing rows

    const now = new Date();
    const hourlyRate = 60; // Charge per hour

    rentals.forEach(rental => {
        const returnDate = new Date(rental.returnDate);
        if (returnDate < now) {
            const rentalDate = new Date(rental.rentDate);
            const diffTime = Math.max(0, now - returnDate); // Ensure non-negative
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Convert milliseconds to hours
            const charge = diffHours * hourlyRate;

            // Add to overdue list
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rental.nic}</td>
                <td>${rental.name}</td>
                <td>${rental.rentDate}</td>
                <td>${rental.returnDate}</td>
                <td>${charge} Rs</td>
            `;
            overdueList.appendChild(row);
        }
    });

    // Show the overdue section and hide other sections
    document.getElementById('dashboardcontainer').style.display = 'none';
    document.getElementById('customerdcontainer').style.display = 'none';
    document.getElementById('rentaldcontainer').style.display = 'none';
    document.getElementById('overduedcontainer').style.display = 'block';
    document.getElementById('returncontainer').style.display = 'none';
    document.getElementById('display').style.display='none';
}

// Function to load pending rental requests from localStorage
function loadPendingRentals() {
    const keys = Object.keys(localStorage);
    const pendingRentals = keys.filter(key => key.startsWith('rentRequest-'));

    pendingRentals.forEach(key => {
        const rentalRequest = JSON.parse(localStorage.getItem(key));
        if (rentalRequest.status === 'pending') {
            displayRentalRequest(rentalRequest);
        }
    });
}

// Function to display each pending rental request in the manager's dashboard
function displayRentalRequest(rentalRequest) {
    const rentalDiv = document.createElement('div');
    rentalDiv.innerHTML = `
        <p>DVD: ${rentalRequest.dvdTitle}</p>
        <p>Status: ${rentalRequest.status}</p>
        <button onclick="approveRental('${rentalRequest.dvdId}')">Approve</button>
        <button onclick="declineRental('${rentalRequest.dvdId}')">Decline</button>
    `;
    document.body.appendChild(rentalDiv);  // Append to the manager's dashboard UI
}

// Function to approve the rental request
function approveRental(dvdId) {
    const rentalRequest = JSON.parse(localStorage.getItem(`rentRequest-${dvdId}`));
    rentalRequest.status = 'approved';
    localStorage.setItem(`rentRequest-${dvdId}`, JSON.stringify(rentalRequest));
    alert(`Rental for "${rentalRequest.dvdTitle}" has been approved!`);
    // Reload the page or remove the request from the UI
}

// Function to decline the rental request
function declineRental(dvdId) {
    localStorage.removeItem(`rentRequest-${dvdId}`);
    alert('Rental request declined.');
    // Reload the page or remove the request from the UI
}

// Call this function to load pending rentals on page load
window.onload = loadPendingRentals;
