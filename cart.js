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

