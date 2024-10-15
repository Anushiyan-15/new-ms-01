document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');

    // Load data from localStorage
    let users = JSON.parse(localStorage.getItem('customers')) || [];
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser === 'customer') {
            window.location.href = '../customer-page/customer.html';
        }
    }

    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.username == username && u.password === password);
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'customer-page/customer.html';
            } else {
                alert('Invalid UserName or Password');
            }
        });
    }

    // Register form submission
    // if (registerForm) {
    //     registerForm.addEventListener('submit', function (e) {
    //         e.preventDefault();
    //         const username = document.getElementById('registerUsername').value;
    //         const password = document.getElementById('registerPassword').value;
    //          const id = Number(Math.floor(Math.random() * 1000));

    //         const nic = document.getElementById('registerNIC').value;
    //         const email = document.getElementById('registeremail').value;
    //         const number = document.getElementById('registernumber').value;



    //         if (users.some(u => u.username === username && u.nic === nic && u.password===password)) {
    //             alert('Username or nic already exists');
    //             return;
    //         }


    //         const newUser = { username, password, nic, email, number,id };
    //         users.push(newUser);
    //         localStorage.setItem('customers', JSON.stringify(users));
    //         alert('Registration successful. Please login.');
    //         //registerForm.reset();
    //     });

    //     registerForm.reset();
    // }



    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
    
            const username = document.getElementById('registerUsername').value.trim();
            const password = document.getElementById('registerPassword').value.trim();
            const nic = document.getElementById('registerNIC').value.trim();
            const email = document.getElementById('registeremail').value.trim();
            const number = document.getElementById('registernumber').value.trim();
    
            // Ensure unique ID generation
            const id = Number(Math.floor(Math.random() * 1000));
    
            // Retrieve existing users from localStorage
            const users = JSON.parse(localStorage.getItem('customers')) || [];
    
            // Validate that the username and NIC are unique
            if (users.some(user => user.username === username)) {
                alert('Username already exists. Please choose a different username.');
                return;
            }
            if (users.some(user => user.nic === nic)) {
                alert('NIC already exists. Please use a different NIC.');
                return;
            }
    
            // Add the new user to the array
            const newUser = { username, password, nic, email, number, id };
            users.push(newUser);
    
            // Store updated user list in localStorage
            localStorage.setItem('customers', JSON.stringify(users));
    
            // Show success message and reset the form
            alert('Registration successful. Please login.');
            registerForm.reset(); // Reset the form after successful registration
        });
    }
    

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('currentUser');
            window.location.href = '../landing-page/greetingpage.html';
        });
    }

    // Display user info
    if (userInfo && currentUser) {
        userInfo.textContent = `${currentUser.username}`;
    }


    // Customer functionality
    if (window.location.pathname.includes('../customer-page/customer.html')) {

    }
});


