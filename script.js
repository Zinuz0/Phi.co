window.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var isProductDetailsPage = window.location.pathname.includes('product-details.html');

    if (isProductDetailsPage) {
        // Make the header opaque and interactive from the beginning for product-details.html
        header.style.opacity = 1;
        header.style.pointerEvents = 'auto';
        header.style.top = '0';
    } else {
        // Ensure header is hidden and non-interactive initially
        header.style.top = '-100px';
        header.style.pointerEvents = 'none';

        // Apply the scroll behavior for the home page
        window.addEventListener('scroll', function() {
            var cover = document.getElementById('landing');
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

                // Set the header position to 0 and enable pointer events
                header.style.top = '0';
                header.style.pointerEvents = 'auto';
            } else {
                // Set the header position to -100px and disable pointer events
                header.style.top = '-100px';
                header.style.pointerEvents = 'none';
            }
        });
    }
});

let lastScrollTop = 0;
const header = document.querySelector('header');
const subCategories = document.querySelectorAll('.sub-categories');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.style.top = '-100px'; // Hide the header
        header.style.opacity = '0'; // Fade out the header
        subCategories.forEach(menu => {
            menu.classList.remove('show'); // Hide subcategory menus
        });
    } else {
        // Scrolling up
        header.style.top = '0'; // Show the header
        header.style.opacity = '1'; // Fade in the header
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
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
        // Check if value is less than 1 or not a numbers
        if (currentValue < 1 || isNaN(currentValue)) {
            quantityInput.value = 1; // Reset value to 1
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const subCategories = document.querySelectorAll('.sub-categories');

    let hideTimeout;

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
            const category = item.getAttribute('data-category');
            const subCategoryElement = document.getElementById(`${category}-subcategories`);
            if (subCategoryElement) {
                subCategories.forEach(sub => sub.classList.remove('show'));
                subCategoryElement.classList.add('show');
            }
        });

        item.addEventListener('mouseout', () => {
            hideSubCategories();
        });
    });

    subCategories.forEach(subCategory => {
        subCategory.addEventListener('mouseover', () => {
            clearTimeout(hideTimeout);
            subCategory.classList.add('show');
        });

        subCategory.addEventListener('mouseout', () => {
            hideSubCategories();
        });
    });

    function hideSubCategories() {
        hideTimeout = setTimeout(() => {
            subCategories.forEach(sub => {
                sub.classList.remove('show');
                sub.style.opacity = '0';
                sub.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    sub.style.display = 'none';
                }, 500); // Match the transition duration
            });
        }, 500); // Delay to keep the menu visible longer
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    const removeBtns = document.querySelectorAll('.remove-item');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping');

    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateTotal(this.closest('.cart-item'));
            }
        });
    });

    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            updateTotal(this.closest('.cart-item'));
        });
    });

    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            item.remove();
            updateGrandTotal();
        });
    });

    checkoutBtn.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });

    continueShoppingBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'index.html';
    });

    function updateTotal(cartItem) {
        const price = parseFloat(cartItem.querySelector('.product-info p:nth-child(2)').textContent.replace('Rs. ', ''));
        const quantity = parseInt(cartItem.querySelector('.quantity input').value);
        const total = price * quantity;
        cartItem.querySelector('.total span').textContent = `Rs. ${total.toFixed(2)}`;
        updateGrandTotal();
    }

    function updateGrandTotal() {
        let grandTotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const total = parseFloat(item.querySelector('.total span').textContent.replace('Rs. ', ''));
            grandTotal += total;
        });
        document.querySelector('.cart-summary p span').textContent = `Rs. ${grandTotal.toFixed(2)}`;
    }
});
