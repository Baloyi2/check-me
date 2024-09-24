// Define routes for easier management
const routes = {
    profile: 'profile.html',
    signUp: 'signup.html',
    home: 'st.html',
    userHome: 'user_home.html',
    apps: 'apps.html',
    userDetails: 'user_details.html'
};

// Check if users exist in localStorage
function checkAccount() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
        window.location.href = routes.profile; // Redirect to sign-in page
    } else {
        alert("No account found. You can create one.");
        goToSignUp(); // Redirect to sign-up page
    }
}

// Redirect functions
function goToSignUp() {
    window.location.href = routes.signUp; 
}

function goToUserHome() {
    window.location.href = routes.userHome; 
}

function goToUserDetails() {
    window.location.href = routes.userDetails; // Redirect to user details page
}

function goToApps() {
    window.location.href = routes.apps; // Redirect to apps page
}

function goToHome() {
    window.location.href = routes.home; // Redirect to home page
}

function logout() {
    window.location.href = routes.home; // Redirect to home page
}

// Remove account function
function removeAccount() {
    const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
        const username = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        users = users.filter(user => user.username !== username); // Remove user
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage

        alert("Account details deleted.");
        localStorage.removeItem('currentUser'); // Clear current user
        goToHome(); // Redirect to home page
    } else {
        alert("Account deletion canceled."); // Optional feedback
    }
}

// Validate the user's input
function validateInput(name, surname, username, email, password) {
    const namePattern = /^[A-Z][a-z]*$/;
    if (!namePattern.test(name)) {
        alert("Name must start with an uppercase letter and be followed by lowercase letters.");
        return false;
    }
    
    if (!namePattern.test(surname)) {
        alert("Surname must start with an uppercase letter and be followed by lowercase letters.");
        return false;
    }

    const usernamePattern = /^(?=.*\d)/;
    if (!usernamePattern.test(username)) {
        alert("Username must contain at least one number.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be between 7 and 12 characters long, contain at least one uppercase letter, one number, and one special character.");
        return false;
    }

    return true;
}

// Create a new account
function createAccount() {
    const name = document.getElementById('newName').value.trim();
    const surname = document.getElementById('newSurname').value.trim();
    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    if (!validateInput(name, surname, username, email, password)) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email || user.username === username)) {
        alert("This email or username is already taken. Please use a different one.");
        return;
    }

    users.push({ name, surname, username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully! Redirecting to the home page...");
    window.location.href = routes.home;
}

// Confirm sign in and redirect
function confirmSignIn() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user.username)); // Store username for session
        localStorage.setItem('currentUserEmail', JSON.stringify(user.email));
        window.location.href = routes.userHome; // Redirect to user home page
    } else {
        alert("Invalid username or password.");
    }
}

// Display user details on user_details.html
function displayUserDetails() {
    const username = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);

    const userDetailsDiv = document.getElementById('userDetails');
    
    if (user) {
        userDetailsDiv.innerHTML = `
            <p>Name: ${user.name}</p>
            <p>Surname: ${user.surname}</p>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
        `;
        userDetailsDiv.style.display = 'block'; // Show user details

        const uploadButton = document.getElementById('uploadButton');
        if (user.profileImage) {
            uploadButton.style.backgroundImage = `url(${user.profileImage})`;
            uploadButton.style.backgroundSize = 'cover';
            uploadButton.style.backgroundPosition = 'center';
            uploadButton.style.color = 'transparent'; // Hide text to show the image only
        }
    } else {
        userDetailsDiv.innerText = 'No user information found.';
    }
}

// Profile picture upload functionality
function loadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        
        const uploadButton = document.getElementById('uploadButton');
        uploadButton.style.backgroundImage = `url(${imageUrl})`;
        uploadButton.style.backgroundSize = 'cover';
        uploadButton.style.backgroundPosition = 'center';
        uploadButton.style.color = 'transparent'; // Hide text to show the image only

        // Save the image URL to the user's data in localStorage
        const username = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.username === username);
        
        if (userIndex !== -1) {
            users[userIndex].profileImage = imageUrl;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// Load user details on page load if applicable
if (document.getElementById('userDetails')) {
    window.onload = displayUserDetails;
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('newPassword');
    passwordInput.type = this.checked ? 'text' : 'password';
});
