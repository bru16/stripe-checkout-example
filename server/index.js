const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const { STRIPE_SECRET } = process.env;
const app = express();
const stripe = new Stripe(STRIPE_SECRET);
app.listen(4000, () => console.log('listening on port 4000'));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/checkout', async (req, res) => {
    try {
        const { id, amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            description: "Iphone 11",
            payment_method: id,
            confirm: true
        });
        console.log(paymentIntent);
        res.send({ message: 'Payment done successfully!' });
    } catch (error) {
        res.json({ message: error.raw.message });
    }
})