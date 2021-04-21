import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (

        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <CardElement className="form-control" />
                        </div>
                        <button className="btn btn-primary" type="submit" disabled={!stripe}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default CheckoutForm;