import React from 'react';
import './CartPage.css'
import {Link} from "react-router-dom";
import BasketSvg from "../../assets/BasketSvg";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {cartSlice} from "../../redux/store/reducers/CartSlice";

const CartPage = () => {
    const {cart, count,totalPrice} = useAppSelector((state => state.cartReducer))
    const dispatch = useAppDispatch()
    const {clearCart, addCartItem, removeCartItem, removeItemPosition} = cartSlice.actions


    const onClickPlus = (id: string) => {
        const currentProduct = cart?.find((i) => i._id === id);
        dispatch(addCartItem(currentProduct!))
    }

    const onClickMinus = (id: string) => {
        const currentProduct = cart?.find((i) => i._id === id);
        dispatch(removeCartItem(currentProduct!))
    }

    const removeItem = (id: string) => {
        const currentProduct = cart?.find((i) => i._id === id);
        dispatch(removeItemPosition(currentProduct!))
    }
    const clickClearCart = () => {
        dispatch(clearCart())
    }


    return (
        <div className='container'>
            {cart.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center flex-column empty-cart'>
                    <h3>
                        Корзина пуста
                    </h3>
                    <span>Начните с главной страницы или воспользуйтесь поиском, чтобы найти что-то конкретное</span>
                    <Link to='/snickers'>В каталог</Link>
                </div>

            ) : (
                <>
                    <div style={{borderBottomStyle: "solid", borderBottomWidth: 2, borderBottomColor: "black"}}
                         className='d-flex justify-content-between align-items-center'>
                        <h5>КОРЗИНА</h5>
                        <div className='d-flex align-items-center'>
                            <h5 className='px-5'>
                                Итого: товаров {count} на сумму {totalPrice} ₽
                            </h5>
                            <h6 onClick={clickClearCart} className='clear-cart'>Очистить корзину
                                <BasketSvg/>
                            </h6>
                        </div>
                    </div>

                    <div>
                        {cart.map((i) => (
                            <div key={i._id} className='d-flex align-items-center justify-content-between'>

                                <div className='m-2 d-flex justify-content-between align-items-center'>
                                    <img className='m-2' width='120' height='120' src={i.image} alt='*'/>
                                    <div>
                                        <h6 className='name'>{i.name}</h6>
                                        <h6 className='badge-cart'>{i.badge}</h6>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center item-product'>
                                    <h6 onClick={() => onClickPlus(i._id)} className='circle-inc'>+</h6>
                                    <h5 className='m-0'>{i.countItem}</h5>
                                    <h6 onClick={() => onClickMinus(i._id)}
                                        className={i.countItem === 1 ? ('circle-dec-disable') : ('circle-dec')}>-</h6>
                                    <h6 onClick={() => removeItem(i._id)} className='circle-delete'>x</h6>
                                </div>
                                <div>
                                    {i.salePrice ? (
                                        <>
                                            <h6 className='price-cart'>{i.price} ₽</h6>
                                            <h6 className='sale-price-cart'>{i.salePrice} ₽</h6>
                                        </>
                                    ) : (
                                        <h6 className='price-cart'>{i.price} ₽</h6>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;