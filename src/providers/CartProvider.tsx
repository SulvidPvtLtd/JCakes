import { createContext , PropsWithChildren, useContext, useState} from "react";

// Import and declare data custom types
import {CartItem, Product} from '@/src/types';
// A library that can help with key values.
import {randomUUID} from 'expo-crypto';

type CartType = {
    items: CartItem[],
    // Declare a function that will receive a new item of type CartItem, 
    // it will do something and give us nothing.
    // addItem: (item: CartItem) => void; 

    addItem: (product: Product, size: CartItem['size']) => void
    updateQuantity:(itemId: string, amount: -1 | 1) => void;
    total: number;
} 

const CartContext = createContext<CartType>({
    items:[],
    addItem: () => {},
    updateQuantity: () =>{},
    total: 0,
});

//Provide values: such that all the children of the CartProvider will have access to CartContext.Provider.
//This will be used to wrapp around the screens that needs the CartProvider.
// This means all the screens in our application

const CartProvider = ({ children }: PropsWithChildren)=>{

    const [items, setItems] = useState<CartItem[]>([]);

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

    return(
        <CartContext.Provider value={{items, addItem, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartProvider;

export const useCart = () => useContext(CartContext);


