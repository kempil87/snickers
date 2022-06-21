import {IProduct} from "../../types/IProduct";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ProductState {
    product: IProduct[],
    isLoading: boolean,
    error: string
}

const initialState: ProductState = {
    product: [],
    isLoading: false,
    error: ""
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productFetching(state) {
            state.isLoading = true
        },
        productFetchingSuccess(state,action:PayloadAction<IProduct[]>) {
            state.isLoading = false
            state.error =''
            state.product = action.payload
        },
        productFetchingError(state,action:PayloadAction<string>) {
            state.isLoading = false
            state.error =action.payload
        },
    }
})

export default productSlice.reducer


