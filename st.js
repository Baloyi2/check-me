function checkAccount() {
    const storedEmail = localStorage.getItem('email');
    
    if (storedEmail) {
        // If there is an email stored, redirect to sign-in page
        window.location.href = 'profile.html';
    } else {
        // No account found, proceed to sign up
        alert("No account found. You can create one.");
        goToSignUp();
    }
}

function goToSignUp() {
    window.location.href = 'signup.html'; // Redirect to sign-up page
}

function createAccount() {
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;

    // Save to localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert("Account created successfully! Redirecting to the home page...");
    window.location.href = 'index.html'; // Redirect to home page
}

function saveAndRedirect() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Save to localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert("Details saved successfully! Redirecting to the home page...");
    window.location.href = 'st.html'; // Redirect to home page
}

function confirmSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        // Redirect to info page
        window.location.href = 'info.html';
    } else {
        alert("Invalid email or password.");
    }
}

function displayProfile() {
    const email = localStorage.getItem('email');
    if (email) {
        document.getElementById('profileInfo').innerText = `Email: ${email}`;
    } else {
        document.getElementById('profileInfo').innerText = 'No profile found.';
    }
}

// Load profile details on page load
if (document.getElementById('profileInfo')) {
    window.onload = displayProfile;
}

// Logout function
function logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = 'st.html'; // Redirect to home page
}

// Display user information on info page
const userInfoDiv = document.getElementById('userInfo');
if (userInfoDiv) {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
        userInfoDiv.innerText = `Email: ${email}, Password: ${password}`;
    } else {
        userInfoDiv.innerText = 'No user information found.';
    }
}
