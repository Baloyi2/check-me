// Function to save profile details to localStorage
function saveProfile() {
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Save to localStorage
    localStorage.setItem('password', password);
    localStorage.setItem('email', email);

    // Display profile
    displayProfile();
}

// Function to delete profile details from localStorage
function deleteProfile() {
    localStorage.removeItem('password');
    localStorage.removeItem('email');

    // Clear profile display
    document.getElementById('profileInfo').innerText = 'Profile deleted.';
}

// Function to display profile details
function displayProfile() {
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    if (email) {
        document.getElementById('profileInfo').innerText = `Email: ${email}`;
    } else {
        document.getElementById('profileInfo').innerText = 'No profile found.';
    }
}

// Load profile details on page load
window.onload = displayProfile;
