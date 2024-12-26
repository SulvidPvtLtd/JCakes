import { Alert } from 'react-native';
import { supabase } from '@/src/lib/supabase';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
// This file will help manage stripe interactions
// call the server function to create a paymentintent.

const fetchPaymentSheetParams = async(amount: number) => {
    //supabase/functions/payment-sheet
   const { data, error } = await supabase.functions.invoke('payment-sheet', {
        body: { amount },
    });

    if(data) return data;
    Alert.alert('Error fetching paymentSheet params');
    return {};
};

export const initialisePaymentSheet = async (amount: number) => {
    
   console.log('Initialising payment sheet, for:', amount)

   // const data = await fetchSheetParams(amount); we can destructure the payment intent like below.
   const {paymentIntent, publishableKey} = await fetchPaymentSheetParams(amount);
   // console.log('Payment intent data:', data);

   if(!paymentIntent || !publishableKey) {
     return;
    }

   // otherwise initialise locally the payment sheet.
    await initPaymentSheet({ 
        merchantDisplayName: 'Sulvid (Pvt) Ltd.',
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: 'Jane Doe.',
            // email: 'XXXXXXXXXXXXXXXX',
        }
    });
};

    // Display the initialised payment sheet to the user.
    // This will be called from the CartProvide after we initialised the payment sheet.
    export const openPaymentSheet = async (params:type) => {
        const {error} = await presentPaymentSheet(); // it displays the previously `initialisePaymentSheet`.

        if(error){
            Alert.alert( error.message );
            return false;
        }
        return true;
    }