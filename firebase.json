import { db, doc, setDoc } from './firebase.js';

// DOM Elements
const editUsername = document.getElementById('edit-username');
const editBio = document.getElementById('edit-bio');
const editPfp = document.getElementById('edit-pfp');
const editBgColor = document.getElementById('edit-bg-color');
const editTextColor = document.getElementById('edit-text-color');
const editAccent1 = document.getElementById('edit-accent-1');
const editAccent2 = document.getElementById('edit-accent-2');
const linkFields = document.getElementById('link-fields');
const addLinkButton = document.getElementById('add-link');
const saveChangesButton = document.getElementById('save-changes');

let currentData = {};

export const initEditModal = async () => {
    // Load current data into form
    const docRef = doc(db, "profiles", "myProfile");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        currentData = docSnap.data();
    } else {
        currentData = {
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
    }
    
    // Populate form fields
    editUsername.value = currentData.username;
    editBio.value = currentData.bio;
    editPfp.value = currentData.pfp;
    editBgColor.value = currentData.bgColor;
    editTextColor.value = currentData.textColor;
    editAccent1.value = currentData.accent1;
    editAccent2.value = currentData.accent2;
    
    // Populate links
    linkFields.innerHTML = '';
    if (currentData.links && currentData.links.length > 0) {
        currentData.links.forEach((link, index) => {
            addLinkField(link.text, link.url, index);
        });
    }
};

const addLinkField = (text = '', url = '', index = null) => {
    const linkId = index !== null ? index : Date.now();
    const linkDiv = document.createElement('div');
    linkDiv.className = 'link-item';
    linkDiv.innerHTML = `
        <input type="text" placeholder="Link text" class="link-text" value="${text}" data-id="${linkId}">
        <input type="url" placeholder="URL" class="link-url" value="${url}" data-id="${linkId}">
        <button class="small-button remove-link" data-id="${linkId}">×</button>
    `;
    linkFields.appendChild(linkDiv);
    
    // Add event listener to remove button
    const removeButton = linkDiv.querySelector('.remove-link');
    removeButton.addEventListener('click', () => {
        linkDiv.remove();
    });
};

addLinkButton.addEventListener('click', () => {
    addLinkField();
});

saveChangesButton.addEventListener('click', async () => {
    // Gather all data from form
    const updatedData = {
        username: editUsername.value,
        bio: editBio.value,
        pfp: editPfp.value,
        bgColor: editBgColor.value,
        textColor: editTextColor.value,
        accent1: editAccent1.value,
        accent2: editAccent2.value,
        links: []
    };
    
    // Gather links
    const linkTexts = document.querySelectorAll('.link-text');
    const linkUrls = document.querySelectorAll('.link-url');
    
    linkTexts.forEach((textInput, index) => {
        const urlInput = linkUrls[index];
        if (textInput.value.trim() && urlInput.value.trim()) {
            updatedData.links.push({
                text: textInput.value.trim(),
                url: urlInput.value.trim()
            });
        }
    });
    
    // Save to Firestore
    try {
        await setDoc(doc(db, "profiles", "myProfile"), updatedData);
        alert('Profile updated successfully!');
        window.location.reload(); // Refresh to show changes
    } catch (error) {
        console.error("Error saving profile: ", error);
        alert('Error saving profile. Please try again.');
    }
});
