// Function to update the profile dynamically
function updateProfile(data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('age').textContent = data.age + ' Jahre';
    document.getElementById('height').textContent = data.height + ' cm';
    document.getElementById('location').textContent = data.location;
    document.getElementById('description').textContent = data.description;
    document.getElementById('children-desire').textContent = "Kinderwunsch: " + data.childrenDesire;
    document.getElementById('smoker').textContent = "Raucherin: " + data.smoker;
    document.getElementById('languages').textContent = "Fremdsprachen: " + data.languages;
    document.getElementById('job').textContent = "Beruf: " + data.job;
    document.getElementById('interests').textContent = "Interessen: " + data.interests;
    document.getElementById('searchFor').textContent = "Auf der Suche nach: " + data.searchFor;

}

// Mock function to "improve" the profile
function improveProfile(data) {
    // Modify profile data (mock "improvement")
    let improvedData = { ...data };

    improvedData.smoker = "Ich habe noch nie geraucht.";
    improvedData.description = "Abenteuerlustig, spontan, aber auch gut organisiert.";

    return improvedData;
}

// Form submission handler
document.getElementById('submit-btn').addEventListener('click', function () {
    const profileData = {
        name: document.getElementById('name-input').value,
        age: document.getElementById('age-input').value,
        height: document.getElementById('height-input').value,
        location: document.getElementById('location-input').value,
        description: document.getElementById('description-input').value,
        childrenDesire: document.getElementById('children-desire-input').value,
        smoker: document.getElementById('smoker-input').value,
        languages: document.getElementById('languages-input').value,
        job: document.getElementById('job-input').value,
        interests: document.getElementById('interests-input').value,
        searchFor: document.getElementById('searchFor-input').value
    };

    const imageInput = document.getElementById('profile-image-input');
    if (imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        displayImagePreview(imageFile);  // Display the image without sending it to the backend
    }

    
    console.log(profileData);

    //const improvedProfile = improveProfile(profileData);

    // Update the right side profile with improved data
    sendProfileData(profileData);
});

// Function to display the uploaded image on the right side
function displayImagePreview(imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const profilePicture = document.getElementById('profile-picture');
        profilePicture.src = e.target.result;
        profilePicture.style.display = 'block'; // Show the image
    };
    reader.readAsDataURL(imageFile); // Convert the image to Base64 and show preview
}

async function sendProfileData(profileData) {

    document.getElementById('wait-overlay').style.display = 'flex';

    try {
        const response = await fetch('https://dein-dating-berater-backend.onrender.com:5000/api/improve-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ profileData })  // Send the profile data in the request body
        });


        const result = await response.json();  // Parse the JSON response
        const data = JSON.parse(result.result); // Parse the JSON string in 'result' field

        console.log(data);
        updateProfile(data);
    } catch (error) {
        console.error('Error communicating with the backend:', error);
    } finally {
        document.getElementById('wait-overlay').style.display = 'none';

    }
}

