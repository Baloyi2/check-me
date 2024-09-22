// Function to go to the login page
function goToLoginPage() {
    window.location.href = 'login.html'; // Redirect to login page
}

// Event listener for "View Login" button
document.getElementById('loginButton').addEventListener('click', goToLoginPage);

// Existing code remains unchanged...

let loginAttempts = 0; // Initialize login attempts
let lockoutTime = 0; // Time until user can attempt to log in again

// Check if users exist in localStorage
function checkAccount() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length > 0) {
        window.location.href = 'login.html'; // Redirect to sign-in page
    } else {
        alert("No account found. You can create one.");
        goToSignUp(); // Redirect to sign-up page
    }
}

// Redirect to sign-up page
function goToSignUp() {
    window.location.href = 'signup.html'; 
}

// Create a new account with validation
function createAccount() {
    const name = document.getElementById('newName').value;
    const surname = document.getElementById('newSurname').value;
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;

    // Validation
    if (!validateInput(name, surname, username, email, password)) {
        return; // Stop execution if validation fails
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        alert("This username or email is already registered. Please use a different one.");
        return; 
    }

    // Add the new user to the array and save
    users.push({ name, surname, username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully! Redirecting to the home page...");
    window.location.href = 'st.html'; // Redirect to home page
}

// Validate user input
function validateInput(name, surname, username, email, password) {
    // Name and surname validation
    const namePattern = /^[A-Z][a-z]+$/;
    if (!namePattern.test(name) || !namePattern.test(surname)) {
        alert("Name and surname must start with an uppercase letter followed by lowercase letters.");
        return false;
    }

    // Username validation (must contain at least one number)
    if (!/\d/.test(username)) {
        alert("Username must contain at least one number.");
        return false;
    }

    // Email validation (basic check for @ and .)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password validation (between 7 and 12 characters, with specific requirements)
    const passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{7,12}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be between 7 and 12 characters long, contain at least one uppercase letter, one number, and one special character.");
        return false;
    }

    return true;
}

// Confirm sign in and redirect to user home
function confirmSignIn() {
    // Check if the user is currently locked out
    if (lockoutTime > 0) {
        alert(`You are locked out. Please wait ${lockoutTime} seconds before trying again.`);
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Reset attempts on successful login
        loginAttempts = 0;
        localStorage.setItem('currentUsername', JSON.stringify(user.username)); 
        window.location.href = 'user_home.html'; // Redirect to user home page
    } else {
        loginAttempts++;
        alert("Invalid username or password.");

        // Lock the user out after 2 failed attempts
        if (loginAttempts >= 2) {
            lockoutTime = 10; // Lock for 10 seconds
            alert("Too many failed login attempts. Please wait 10 seconds before trying again.");
            setTimeout(() => {
                lockoutTime = 0; // Reset lockout time after 10 seconds
                loginAttempts = 0; // Reset login attempts
            }, 10000); // 10000 milliseconds = 10 seconds
        }
    }
}

// Go to user details page
function goToUserDetails() {
    window.location.href = 'user_details.html'; // Redirect to user details page
}

// View all user details on user_details.html
function displayUserDetails() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userDetailsDiv = document.getElementById('userDetails');

    if (users.length > 0) {
        userDetailsDiv.innerHTML = ''; // Clear existing content

        users.forEach(user => {
            userDetailsDiv.innerHTML += `
                <div class="user-details">
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Surname:</strong> ${user.surname}</p>
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Password:</strong> ${user.password}</p>
                    <hr />
                </div>
            `;
        });
    } else {
        userDetailsDiv.innerText = 'No user information found.';
    }
}

// Go to user home page
function goToUserHome() {
    window.location.href = 'user_home.html'; // Redirect to user home page
}
function checkAccount() {
    window.location.href = 'profile.html'; // Redirect to apps page
}
function confirmSignIn() {
    window.location.href = 'user_home.html'; // Redirect to apps page
}
// Go to home page
function goToHomePage() {
    window.location.href = 'st.html'; // Redirect to home page
}

// Go to apps page
function goToApps() {
    window.location.href = 'apps.html'; // Redirect to apps page
}

// Logout function
function logout() {
    localStorage.removeItem('currentUsername'); // Clear current username
    window.location.href = 'st.html'; // Redirect to home page
}

// Event listener for "Back to Home" button
document.getElementById('goToHomePage').addEventListener('click', function() {
    window.location.href = 'st.html'; // Redirect to home page
});

// Load user details on page load if applicable (on user_details.html)
if (document.getElementById('userDetails')) {
    window.onload = displayUserDetails;
}
