import React from 'react';
import './Header.css'
import LogoSvg from "../../assets/LogoSvg";
import BagSvg from "../../assets/BagSvg";
import SearchSvg from "../../assets/SearchSvg";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {productSlice} from "../../redux/store/reducers/ProductSlice";

export const Header = () => {
    const {count} = useAppSelector((state => state.cartReducer))
    const {searchProducts} = useAppSelector((state => state.productReducer))
    const dispatch = useAppDispatch()
    const {searchProduct} = productSlice.actions

    return (
        <div className='container header'>
            <Link to='/snickers'>
                <LogoSvg/>
            </Link>
            <div className='d-flex align-items-center'>
                <form className='d-flex align-items-center position-relative input-form justify-content-center'>
                    <span className="position-absolute">
                        <SearchSvg/>
                    </span>
                    <input
                        className='search'
                        placeholder='Поиск...'
                        type='text'
                        value={searchProducts}
                        onChange={(e) => dispatch(searchProduct(e.target.value))}
                    />
                </form>
                <Link to='/cart' className='position-relative'>
                    <BagSvg/>
                    {count > 0 && (
                        <div className='cart-idx'>{count}</div>
                    )}
                </Link>
            </div>
        </div>
    );
};
