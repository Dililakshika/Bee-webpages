const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click",toggleNav);

function toggleNav(){
	navToggler.classList.toggle("active");
	document.querySelector(".nav").classList.toggle("open");
}

document.addEventListener("click",function(e){
	if(e.target.closest(".nav-item")){
		toggleNav();
	}
})



document.addEventListener('DOMContentLoaded', function() {
    const beeTrafficElement = document.getElementById('bee-traffic');
    const honeyLevelElement = document.getElementById('honey-level');

    // Function to simulate fetching data from an API
    function fetchData() {
        return {
            beeTraffic: Math.floor(Math.random() * 1000),
            honeyLevel: (Math.random() * 10).toFixed(2) + ' L'
        };
    }

    function updateDashboard() {
        const data = fetchData();

        beeTrafficElement.textContent = data.beeTraffic;
        honeyLevelElement.textContent = data.honeyLevel;

        updateChart(data.beeTraffic);
    }

    // Initialize Chart.js
    const ctx = document.getElementById('beeTrafficChart').getContext('2d');
    const beeTrafficChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Bee Traffic',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Number of Bees'
                    }
                }
            }
        }
    });

    function updateChart(beeTraffic) {
        const time = new Date().toLocaleTimeString();

        if (beeTrafficChart.data.labels.length > 10) {
            beeTrafficChart.data.labels.shift();
            beeTrafficChart.data.datasets[0].data.shift();
        }

        beeTrafficChart.data.labels.push(time);
        beeTrafficChart.data.datasets[0].data.push(beeTraffic);

        beeTrafficChart.update();
    }

    // Update the dashboard every 5 seconds
    setInterval(updateDashboard, 5000);

    // Initial update
    updateDashboard();
});
document.addEventListener('DOMContentLoaded', function() {
    const hiveIdElement = document.getElementById('hive-id');
    const hiveLocationElement = document.getElementById('hive-location');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');

    // Simulate data for 10 hives
    const hiveData = {
        'Hive-001': { location: 'Field A', temperature: [], humidity: [] },
        'Hive-002': { location: 'Field B', temperature: [], humidity: [] },
        'Hive-003': { location: 'Field C', temperature: [], humidity: [] },
        'Hive-004': { location: 'Field D', temperature: [], humidity: [] },
        'Hive-005': { location: 'Field E', temperature: [], humidity: [] },
        'Hive-006': { location: 'Field F', temperature: [], humidity: [] },
        'Hive-007': { location: 'Field G', temperature: [], humidity: [] },
        'Hive-008': { location: 'Field H', temperature: [], humidity: [] },
        'Hive-009': { location: 'Field I', temperature: [], humidity: [] },
        'Hive-010': { location: 'Field J', temperature: [], humidity: [] }
    };

    let currentHiveId = 'Hive-001';

    // Initialize Chart.js for Temperature
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    const temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });

    // Initialize Chart.js for Humidity
    const humidityCtx = document.getElementById('humidityChart').getContext('2d');
    const humidityChart = new Chart(humidityCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Humidity',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    }
                }
            }
        }
    });

    function fetchHiveData(hiveId) {
        // Simulate fetching data from an API
        const data = hiveData[hiveId];
        return {
            hiveId: hiveId,
            location: data.location,
            temperature: (Math.random() * 10 + 20).toFixed(2),
            humidity: (Math.random() * 20 + 50).toFixed(2)
        };
    }

    function selectHive(hiveId) {
        currentHiveId = hiveId;
        updateHiveDetails();
    }

    function updateHiveDetails() {
        const data = fetchHiveData(currentHiveId);

        hiveIdElement.textContent = data.hiveId;
        hiveLocationElement.textContent = data.location;
        temperatureElement.textContent = data.temperature + ' °C';
        humidityElement.textContent = data.humidity + ' %';

        updateTemperatureChart(data.temperature);
        updateHumidityChart(data.humidity);
    }

    function updateTemperatureChart(temperature) {
        const time = new Date().toLocaleTimeString();

        if (temperatureChart.data.labels.length > 10) {
            temperatureChart.data.labels.shift();
            temperatureChart.data.datasets[0].data.shift();
        }

        temperatureChart.data.labels.push(time);
        temperatureChart.data.datasets[0].data.push(parseFloat(temperature));

        temperatureChart.update();
    }

    function updateHumidityChart(humidity) {
        const time = new Date().toLocaleTimeString();

        if (humidityChart.data.labels.length > 10) {
            humidityChart.data.labels.shift();
            humidityChart.data.datasets[0].data.shift();
        }

        humidityChart.data.labels.push(time);
        humidityChart.data.datasets[0].data.push(parseFloat(humidity));

        humidityChart.update();
    }

    // Update the hive details every 5 seconds
    setInterval(updateHiveDetails, 5000);

    // Initial update
    updateHiveDetails();

    // Attach selectHive function to global scope for button clicks
    window.selectHive = selectHive;
});

let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll('.carousel-images img');
    let dots = document.querySelectorAll('.dot');

    // Hide all images and remove active class from dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove('active');
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 } // Reset to the first slide if at the end

    // Show the current image and highlight the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add('active');

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Initialize the slideshow
document.addEventListener("DOMContentLoaded", function() {
    showSlides();
});



