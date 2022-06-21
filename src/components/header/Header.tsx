import React from 'react';
import './Header.css'
import LogoSvg from "../../assets/LogoSvg";
import BagSvg from "../../assets/BagSvg";
import SearchSvg from "../../assets/SearchSvg";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

export const Header = () => {


    const {count} = useAppSelector((state => state.cartReducer))

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
                        // value={searchProduct}
                        // onChange={(e) =>setSearchProduct(e.target.value)}
                    />
                    {/*{searchProduct &&(*/}
                    {/*    <span onClick={() =>setSearchProduct('')}*/}
                    {/*          style={{fontWeight:200,right:0,cursor:"pointer",zIndex:605}}*/}
                    {/*          className=" position-absolute clear-input">X</span>*/}
                    {/*)}*/}
                </form>
                <Link to='/cart' className='position-relative'>
                    <BagSvg/>
                    {count > 0 &&(
                        <div className='cart-idx'>{count}</div>
                    )}
                </Link>
            </div>
        </div>
    );
};
