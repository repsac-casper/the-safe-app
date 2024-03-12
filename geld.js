(function() {
  var stripe = Stripe('pk_live_51OohMaHQSNvOpQERT5xJ1p5YOIuDSf4c6xiRglH8lGgEIGzC1chWV9QEuKX9S2V6bKhn63mfeAaYZebaONOuUgTs00X4NLNNKH');

  var checkoutButton = document.getElementById('submit');
  checkoutButton.addEventListener('click', function () {
    /*
     * When the customer clicks on the button, redirect
     * them to Checkout.
     */
    stripe.redirectToCheckout({
      lineItems: [{price: 'price_1Ot7VmHQSNvOpQERifodpXXv', quantity: 1}],
      mode: 'payment',
      payment_method_types: ['card', 'ideal'],
      successUrl: 'https://repsac-casper.github.io/the-safe-app/geld.html',
      cancelUrl: 'https://repsac-casper.github.io/the-safe-app/geld.html',
    })
    .then(function (result) {
      if (result.error) {
        /*
         * If `redirectToCheckout` fails due to a browser or network
         * error, display the localized error message to your customer.
         */
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();
