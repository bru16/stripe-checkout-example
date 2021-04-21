import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckoutForm'
import { ToastContainer } from 'react-toastify';

const stripePromise = loadStripe('pk_test_51IiRhnDGA4SnVsA9ANBvyurDiDhQMZGTQMsLY2lKC3YXVd2jumR2MqXqYGCoGkUfYCJxoMTDqbpTUbarnoxzh65d006LICBugO');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <ToastContainer />
      <CheckOutForm />
    </Elements>
  );
}

export default App;
