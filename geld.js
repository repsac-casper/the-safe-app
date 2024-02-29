const overmaken = document.getElementById('first_content_btn');
share.addEventListener('click',function(event){
  event.preventDefault()
  const bedrag = getElementById('bedrag')
  // This is your test secret API key.
    const stripe = require('stripe')('sk_test_51OohMaHQSNvOpQERrP6aiRgdOiMpEKGMhrM1TOWul5sXqEupoiyVHznyHb856g3upvzyOkf9dObPwI01iDulGcNy00DJNHaxQE');
    const express = require('express');
    const app = express();
    app.use(express.static('public'));

    const YOUR_DOMAIN = 'https://repsac-casper.github.io/the-safe-app';

    app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: bedrag,
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
    });

    app.listen(4242, () => console.log('Running on port 4242'));
});