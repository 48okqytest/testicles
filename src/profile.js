import { db, doc, getDoc } from './firebase.js';
import { checkPassword } from './auth.js';

// DOM Elements
const profileContainer = document.getElementById('profile-container');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('user-bio');
const pfpElement = document.getElementById('profile-picture');
const linksContainer = document.getElementById('profile-links');
const editButton = document.getElementById('edit-button');
const passwordModal = document.getElementById('password-modal');
const editModal = document.getElementById('edit-modal');
const passwordInput = document.getElementById('password-input');
const submitPassword = document.getElementById('submit-password');
const passwordError = document.getElementById('password-error');
const closeButtons = document.querySelectorAll('.close');

// Load profile data
const loadProfile = async () => {
    const docRef = doc(db, "profiles", "myProfile");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        applyProfileData(data);
    } else {
        // Initialize with default data if no profile exists
        const defaultData = {
            username: "My Profile",
            bio: "This is my custom profile. Edit to change.",
            pfp: "https://via.placeholder.com/150",
            bgColor: "#ffffff",
            textColor: "#000000",
            accent1: "#ff0000",
            accent2: "#00ff00",
            links: [
                { text: "Twitter", url: "https://twitter.com" },
                { text: "GitHub", url: "https://github.com" }
            ]
        };
        applyProfileData(defaultData);
    }
};

// Apply profile data to the UI
const applyProfileData = (data) => {
    usernameElement.textContent = data.username;
    bioElement.textContent = data.bio;
    pfpElement.src = data.pfp;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-color', data.bgColor);
    document.documentElement.style.setProperty('--text-color', data.textColor);
    document.documentElement.style.setProperty('--accent-1', data.accent1);
    document.documentElement.style.setProperty('--accent-2', data.accent2);
    
    // Update links
    linksContainer.innerHTML = '';
    if (data.links && data.links.length > 0) {
        data.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.text;
            linkElement.className = 'profile-link';
            linkElement.target = '_blank';
            linksContainer.appendChild(linkElement);
        });
    }
};

// Modal controls
editButton.addEventListener('click', () => {
    passwordModal.style.display = 'flex';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        passwordModal.style.display = 'none';
        editModal.style.display = 'none';
    });
});

// Password check
submitPassword.addEventListener('click', () => {
    if (checkPassword(passwordInput.value)) {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        passwordError.textContent = '';
        import('./edit.js').then(module => {
            module.initEditModal();
            editModal.style.display = 'flex';
        });
    } else {
        passwordError.textContent = 'Incorrect password';
    }
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
});

// Initialize the profile
loadProfile();
