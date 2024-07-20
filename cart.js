window.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var isCartPage = window.location.pathname.includes('cart.html');

    if (isCartPage) {
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

