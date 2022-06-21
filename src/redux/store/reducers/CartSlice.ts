import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICart} from "../../types/ICart";

interface CartState {
    cart: ICart[],
    count: number,
    totalPrice: number
}

const initialState: CartState = {
    cart: [],
    count: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action: PayloadAction<ICart>) {

            const findItem = state.cart.find(obj => obj._id === action.payload._id)
            if (findItem) {
                findItem.countItem++
            } else {
                state.cart = [...state.cart, {...action.payload, countItem: 1}]
            }
            state.count++
            state.totalPrice = state.totalPrice + Number(action.payload.price)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeCartItem(state, action: PayloadAction<ICart>) {
            const findItem = state.cart.find(obj => obj._id === action.payload._id)
            if (findItem) {
                findItem.countItem--
            } else {
                state.cart = state.cart.filter((item) => item._id !== action.payload._id)
            }
            state.totalPrice = state.totalPrice - Number(action.payload.price)
            state.count--
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeItemPosition(state, action: PayloadAction<ICart>) {
            const incCount = state.cart.find((i) => i._id === action.payload._id)!.countItem || 0
            state.cart = state.cart.filter((item) => item._id !== action.payload._id)
            state.count = state.count - incCount
            state.totalPrice = state.totalPrice - incCount * Number(action.payload.price)
            localStorage.setItem('cart', JSON.stringify(state))
        },

        clearCart(state) {
            state.cart = []
            state.count = 0
            state.totalPrice = 0
            localStorage.setItem('cart', JSON.stringify(state))
        },

        addLocalStorage(state, action: PayloadAction<CartState>) {
            state.cart = action.payload.cart
            state.count = action.payload.count
            state.totalPrice = action.payload.totalPrice
        }
    }
})

export default cartSlice.reducer


