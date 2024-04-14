window.addEventListener('scroll', function() {
    var cover = document.getElementById('landing');
    var header = document.querySelector('header');
    var scrollPosition = window.scrollY;

    // Calculate the opacity based on the scroll position
    var opacity = 1 - (scrollPosition / cover.clientHeight);

    // Set the opacity of the header
    header.style.opacity = opacity > 0 ? opacity : 0;

    // Check if cover has scrolled out of view
    if (scrollPosition >= cover.clientHeight) {
        // Once the cover section disappears, set the header opacity to 1
        header.style.opacity = 1;

        // Hide or remove the cover section from the DOM
        cover.style.display = 'none';
    }
});

document.getElementById('searchBtn').addEventListener('click', function() {
    var searchContainer = document.getElementById('searchContainer');
    var searchOverlay = document.querySelector('.search-overlay');
    var body = document.body;

    // Toggle the 'active' class to show/hide the search container
    searchContainer.classList.toggle('active');

    // Toggle the 'active' class to show/hide the search overlay
    searchOverlay.classList.toggle('active');

    // Toggle the 'blur' class to blur/unblur the body content
    body.classList.toggle('no-interaction');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    var searchContainer = document.getElementById('searchContainer');
    var searchOverlay = document.querySelector('.search-overlay');
    var body = document.body;

    // Remove the 'active' class to hide the search container
    searchContainer.classList.remove('active');

    // Remove the 'active' class to hide the search overlay
    searchOverlay.classList.remove('active');

    // Remove the 'no-interaction' class to enable interaction with the website
    body.classList.remove('no-interaction');
});

// Add the quantity input functionality
document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.querySelector('.quantity-input input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Add event listener for input change
    quantityInput.addEventListener('input', function() {
        let currentValue = parseInt(quantityInput.value);
        // Check if value is less than 1 or not a number
        if (currentValue < 1 || isNaN(currentValue)) {
            quantityInput.value = 1; // Reset value to 1
        }
    });
});
