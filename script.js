window.addEventListener('scroll', function() {
    var cover = document.getElementById('landing');

    // Calculate the scroll position
    var scrollPosition = window.scrollY;

    // Check if the scroll position is greater than the cover height
    if (scrollPosition > cover.clientHeight) {
        // Hide the cover section permanently
        cover.style.display = 'none';

        // Remove the scroll event listener to prevent further checks
        window.removeEventListener('scroll');
    }
});
