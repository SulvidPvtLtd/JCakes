// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// Setup type definitions for built-in Supabase Runtime APIs
// We need this function to create a payment intent.
// Import the edge-runtime type declarations for Supabase functions.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Import the Stripe utility module to work with Stripe's API.
import { stripe } from './../_utils/stripe.ts';

// Log a message to the console when the function initializes (useful for debugging).
console.log("Hello from Functions!");

// Start a Deno server that handles incoming requests.
Deno.serve(async (req) => {
  try {
    // Parse the JSON body of the incoming request to extract the 'amount' field.
    const { amount } = await req.json();

    // Create a new PaymentIntent using the Stripe API.
    // A PaymentIntent represents a payment attempt and is used by Stripe to manage payment flows.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Specify the payment amount in the smallest currency unit (e.g., cents for USD).
      currency: 'usd', // Set the currency for the payment (e.g., USD).
      // Uncomment and specify a customer ID if you want to link this payment to a specific customer.
      // customer: customer,
      automatic_payment_methods: {
        enabled: true, // Enable automatic payment methods for the PaymentIntent.
      },
    });

    // Prepare the response object containing essential information for the client.
    const res = {
      paymentIntent: paymentIntent.client_secret, // Provide the client secret of the PaymentIntent.
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'), // Include the publishable API key from environment variables.
      // Uncomment these lines if you need to include ephemeral key or customer details in the response.
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    };

    // Return a successful HTTP response with the response object serialized as JSON.
    return new Response(
      JSON.stringify(res),
      {
        headers: { "Content-Type": "application/json" }, // Set the response's Content-Type header to JSON.
        status: 200, // Indicate that the request was successful.
      }
    );
  } catch (error) {
    // If an error occurs, handle it gracefully and return an error response.

    // Log the error to the console (optional; uncomment if debugging is needed).
    // console.log(error);

    // Return an HTTP error response with the error details serialized as JSON.
    return new Response(
      JSON.stringify(error), // Serialize the error object.
      {
        headers: { 'Content-Type': 'application/json' }, // Set the Content-Type header to JSON.
        status: 400, // Indicate a client or server error.
      }
    );
  }
});


/*
  To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:
*/  

// curl -i --location --request POST 'http://192.168.0.112:54321/functions/v1/payment-sheet' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"David"}'
