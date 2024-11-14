document.addEventListener("DOMContentLoaded", function() {
    // JavaScript to change background color
    document.body.style.backgroundColor = "#e0f7fa"; // Light blue background color

    // Functions to add additional information to each blog post
    addKillenFallsInfo();
    addCedarCreekFallsInfo();
    addBuderimFallsInfo();

    // Fetch weather data and display it
    fetchWeatherData();

    // Change header background color
    const header = document.querySelector('header');
    header.style.backgroundColor = "#c7deff";
    console.log("Header background color changed to #c7deff.");

    // Remove bullet points from the list items
    removeBulletPoints();
    styleBlogListItems();

    // Image modal functionality
    const images = document.querySelectorAll('#gallery-preview img');
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close-btn');

    images.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.src;
            modalImg.alt = image.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function addKillenFallsInfo() {
    const info = document.createElement('p');
    info.textContent = "National Park: Killen Falls Nature Reserve | Estimated Water Temperature: 20°C | Trail Distance: 660 meters | Difficulty: Easy";
    info.classList.add('additional-info');
    document.getElementById('killen').querySelector('.content').appendChild(info);
}

function addCedarCreekFallsInfo() {
    const info = document.createElement('p');
    info.textContent = "National Park: Tamborine National Park | Estimated Water Temperature: 18°C | Trail Distance: 1.1 km | Difficulty: Moderate";
    info.classList.add('additional-info');
    document.getElementById('cedarcreek').querySelector('.content').appendChild(info);
}

function addBuderimFallsInfo() {
    const info = document.createElement('p');
    info.textContent = "National Park: Buderim Forest Park | Estimated Water Temperature: 19°C | Trail Distance: 600 meters | Difficulty: Easy";
    info.classList.add('additional-info');
    document.getElementById('buderimfalls').querySelector('.content').appendChild(info);
}

function fetchWeatherData() {
    const apiKey = '4f03f9625b1ea28a2edf05aeb2d19b5d';
    const locations = {
        killen: '2172797', // Byron Bay
        cedarcreek: '2165087', // Gold Coast
        buderimfalls: '2146268' // Sunshine Coast
    };

    Object.keys(locations).forEach(location => {
        const weatherDiv = document.getElementById(`weather-${location}`);
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${locations[location]}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = `
                        <p>Current Weather: ${data.weather[0].description}</p>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                    `;
                weatherDiv.innerHTML = weatherInfo;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDiv.innerHTML = '<p>Unable to fetch weather data at this time.</p>';
            });
    });
}

function removeBulletPoints() {
    // Remove bullet points from the list
    const blogList = document.querySelector('main ul');
    blogList.style.listStyleType = 'none';
    blogList.style.padding = '0';
}

function styleBlogListItems() {
    // Style each blog link item
    const blogLinks = document.querySelectorAll('main ul li a');
    blogLinks.forEach(function(link) {
        // Set styles using JavaScript
        link.style.display = 'inline-block';
        link.style.backgroundColor = '#4CAF50';
        link.style.color = 'white';
        link.style.textDecoration = 'none'; // Remove underline
        link.style.padding = '10px 20px';
        link.style.margin = '5px';
        link.style.borderRadius = '5px';
        link.style.fontWeight = 'bold';
        link.style.boxShadow = '0 4px #999'; // 3D effect shadow
        link.style.transition = 'all 0.2s ease';

        // Add hover effect
        link.addEventListener('mouseover', function() {
            link.style.backgroundColor = '#45a049';
        });

        link.addEventListener('mouseout', function() {
            link.style.backgroundColor = '#4CAF50';
        });

        // Add active effect
        link.addEventListener('mousedown', function() {
            link.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.6)'; // Inner shadow
        });

        link.addEventListener('mouseup', function() {
            link.style.boxShadow = '0 4px #999'; // Reset to original shadow
        });
    });
}