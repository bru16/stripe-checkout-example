import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!stripe || !elements) {
            setLoading(false);
            return;
        }
        
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setLoading(false);
            console.log('[error]', error.message);
            toast.error(error.message);
        } else {
            try {
                const { id } = paymentMethod
                axios.post('http://localhost:4000/api/checkout', { id, amount: 49999 })
                    .then(((res) => {
                        const message = res.data.message;
                        (message.includes('Payment done successfully!')) ? toast.success(message) : toast.error(message);   // success payment or error code message.
                        setLoading(false);
                    }))
                    .catch(() => { toast.error('An error has occurred'); setLoading(false) });
            } catch (error) {
                setLoading(false);
                console.log(error);
                toast.error('An error has occurred')
            }
        }
    };
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <img src="https://i1.wp.com/hipertextual.com/wp-content/uploads/2019/09/hipertextual-iphone-11-2019772090.jpeg?fit=1200%2C788&ssl=1" alt="iphone11" />
                        <h3 className="mx-auto">Price: $1099</h3>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group mt-3 mb-3">
                            <CardElement className="form-control" />
                        </div>
                        {loading ? (
                            <button className="btn btn-success" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        ) : <button className="btn btn-success" type="submit" disabled={!stripe} >Make Payment!</button>}
                    </form>
                </div>
            </div>
        </div>

    )
}

export default CheckoutForm;