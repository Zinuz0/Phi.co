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
    var content = document.getElementById('content');

    searchContainer.classList.toggle('active');
    searchOverlay.classList.toggle('active');
    content.classList.toggle('hide');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    var searchContainer = document.getElementById('searchContainer');
    var searchOverlay = document.querySelector('.search-overlay');
    var content = document.getElementById('content');

    searchContainer.classList.remove('active');
    searchOverlay.classList.remove('active');
    content.classList.remove('hide');
});
