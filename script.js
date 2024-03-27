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
    var body = document.body;

    // Toggle the 'active' class to show/hide the search container
    searchContainer.classList.toggle('active');

    // Toggle the 'blur' class to blur/unblur the body content
    body.classList.toggle('blur');
});
