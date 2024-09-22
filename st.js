// Check if users exist in localStorage
function checkAccount() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length > 0) {
        window.location.href = 'profile.html'; // Redirect to sign-in page
    } else {
        alert("No account found. You can create one.");
        goToSignUp(); // Redirect to sign-up page
    }
}

// Redirect to sign-up page
function goToSignUp() {
    window.location.href = 'signup.html'; 
}

// Validate the user's input
function validateInput(name, surname, username, email, password) {
    // Name and surname validation
    const namePattern = /^[A-Z][a-z]*$/;
    if (!namePattern.test(name)) {
        alert("Name must start with an uppercase letter and be followed by lowercase letters.");
        return false;
    }
    
    if (!namePattern.test(surname)) {
        alert("Surname must start with an uppercase letter and be followed by lowercase letters.");
        return false;
    }

    // Username validation: must contain at least one number
    const usernamePattern = /^(?=.*\d)/;
    if (!usernamePattern.test(username)) {
        alert("Username must contain at least one number.");
        return false;
    }

    // Email validation: must be in a valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Password validation: must be 7 to 12 characters long, contain at least one uppercase letter, one number, and one special character
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be between 7 and 12 characters long, contain at least one uppercase letter, one number, and one special character.");
        return false;
    }

    return true;
}

// Create a new account
function createAccount() {
    const name = document.getElementById('newName').value;
    const surname = document.getElementById('newSurname').value;
    const username = document.getElementById('newUsername').value;
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;

    // Validate inputs
    if (!validateInput(name, surname, username, email, password)) {
        return; // Stop execution if validation fails
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the email or username already exists
    const emailExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);
    
    if (emailExists) {
        alert("This email is already registered. Please use a different email.");
        return; 
    }
    
    if (usernameExists) {
        alert("This username is already taken. Please choose a different username.");
        return; 
    }

    // Add the new user to the array and save
    users.push({ name, surname, username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully! Redirecting to the home page...");
    window.location.href = 'st.html'; // Redirect to home page
}

// Confirm sign in and redirect
function confirmSignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUserEmail', JSON.stringify(user.email)); // Store email for later use
        window.location.href = 'user_home.html'; // Redirect to user home page
    } else {
        alert("Invalid username or password.");
    }
}

// View user details on user_details.html
function displayUserDetails() {
    const email = JSON.parse(localStorage.getItem('currentUserEmail'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    const userDetailsDiv = document.getElementById('userDetails');
    if (user) {
        userDetailsDiv.innerText = `Name: ${user.name}, Surname: ${user.surname}, Username: ${user.username}, Email: ${user.email}, Password: ${user.password}`;
    } else {
        userDetailsDiv.innerText = 'No user information found.';
    }
}

// Go to apps page
function goToApps() {
    window.location.href = 'apps.html'; // Redirect to apps page
}

// Logout function
function logout() {
    window.location.href = 'st.html'; // Redirect to home page without removing any data
}

// Display user information on info page
function displayUserInfo() {
    const userInfoDiv = document.getElementById('userInfo');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
        userInfoDiv.innerText = users.map(user => `Email: ${user.email}`).join(', ');
    } else {
        userInfoDiv.innerText = 'No user information found.';
    }
}

// Load user details on page load if applicable (on user_details.html)
if (document.getElementById('userDetails')) {
    window.onload = displayUserDetails;
}
