import { createContext , PropsWithChildren, useContext, useState} from "react";

// Import and declare data custom types
import {CartItem, Tables} from '@/src/types';
// A library that can help with key values.
import {randomUUID} from 'expo-crypto';
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
import { initialisePaymentSheet, openPaymentSheet } from '@/src/lib/stripe';

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[];
    // Declare a function that will receive a new item of type CartItem, 
    // it will do something and give us nothing.
    // addItem: (item: CartItem) => void; 

    addItem: (product: Product, size: CartItem['size']) => void
    updateQuantity:(itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void;
} 

const CartContext = createContext<CartType>({
    items:[],
    addItem: () => {},
    updateQuantity: () =>{},
    total: 0,
    checkout: () => {}
});

//Provide values: such that all the children of the CartProvider will have access to CartContext.Provider.
//This will be used to wrapp around the screens that needs the CartProvider.
// This means all the screens in our application
// `items` represent data from `o

const CartProvider = ({ children }: PropsWithChildren)=>{

    const [items, setItems] = useState<CartItem[]>([]);
    const { mutate: insertOrderItems } = useInsertOrderItems();
    const { mutate: insertOrder} = useInsertOrder();
    const router = useRouter()

    const addItem = (product: Product, size: CartItem['size'])  => {

        // if already in cart, increament quantity.
        const existingItem = items.find(item => item.product === product && item.size === size);

        if(existingItem){
            updateQuantity(existingItem.id, 1);
            return; //stop execution here.
        };

        //console.log(product)
        const newCartItem : CartItem = {
            id: randomUUID(), // ID should be generated.
            product_id: product.id,
            product,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items])

    }

    // upDateQunatity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        // console.log( itemId, amount );
        const updatedItems = items.map( (item) => item.id !== itemId ? item: {...item, quantity: item.quantity + amount }).filter((item) => item.quantity > 0);
        setItems(updatedItems);
    };
    //console.log(items);
    // the formula `reduce()` with two properties, collects all the items into one single value.
    // where sum of all the items, is the acculated value from every iteration.
    // Item, is the value of the item we are looping through.
    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0 );

    const clearCart = () => {
        setItems([]);
    }

    const checkout = async () => {

        await initialisePaymentSheet(Math.floor(total*100)); //this total from the variable above, is what we are displaying on the screen in dollars but shld be read in the background as cents.
        const paid = await openPaymentSheet();
        if(!paid) {
            return
        };
        //console.warn('Checkout');
        
        insertOrder(
            { total} , 
            { onSuccess:saveOrderItems }
        );
    }

    const saveOrderItems = (order: Tables<'orders'>) => {

        const orderItems = items.map((cartItem) => ({
          order_id: order.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          size: cartItem.size,
        }));
    
        insertOrderItems(
            orderItems, 
            { onSuccess()
                 {
                    //console.log(order);
                    clearCart();
                    router.push(`/(user)/orders/${order.id}`);
                },
            }
        );
        //console.log(orderItems);
      };
      
    return(
        <CartContext.Provider value={{items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartProvider;

export const useCart = () => useContext(CartContext);


