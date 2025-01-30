import stripe from "stripe";
import "dotenv/config";
const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

export default Stripe;
