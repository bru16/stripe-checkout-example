import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51IiRhnDGA4SnVsA9ANBvyurDiDhQMZGTQMsLY2lKC3YXVd2jumR2MqXqYGCoGkUfYCJxoMTDqbpTUbarnoxzh65d006LICBugO');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
}

export default App;
