import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

import axios from 'axios';

export const addToCart = (id, qty) => {
    return async (disptach, getState) => {

        try {
            
            const { data } = await axios.get(`/api/products/${id}`);
            disptach({
                type: CART_ADD_ITEM,
                payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty
                }
            });

            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

        } catch (error) {
            console.log(error.message);
        }
    }
}

export const removeFromCart = (id) => {
    return (disptach, getState) => {

        disptach({ type: CART_REMOVE_ITEM, payload: id });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}


export const saveShippingAddress = (data) => {
    return (disptach) => {

        disptach({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

        localStorage.setItem('shippingAddress', JSON.stringify(data));
    }
}

export const savePaymentMethod = (data) => {
    return (disptach) => {

        disptach({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

        localStorage.setItem('paymentMethod', JSON.stringify(data));
    }
}