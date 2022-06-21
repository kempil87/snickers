import {AppDispatch} from "../store";
import {productSlice} from "../reducers/ProductSlice";
import {api} from "../../../base/axios";
import {IProduct} from "../../types/IProduct";


export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productFetching())
        const res = await api.get<IProduct[]>('/products')
        dispatch(productSlice.actions.productFetchingSuccess(res.data))
    } catch (e) {
        dispatch(productSlice.actions.productFetchingError("Ошибка запроса"))
    }
}
