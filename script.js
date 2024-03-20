window.addEventListener('scroll', function() {
    var cover = document.getElementById('cover');
    var header = document.getElementById('header');

    // Calculate the scroll position
    var scrollPosition = window.scrollY;

    // Check if the scroll position is greater than the cover height
    if (scrollPosition > cover.clientHeight) {
        // Remove the cover from the DOM
        cover.parentNode.removeChild(cover);

        // Remove the "hidden" class from the header to make it visible
        header.classList.remove('hidden');

        // Remove the scroll event listener to prevent further checks
        window.removeEventListener('scroll');
    }
});
