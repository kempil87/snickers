import React, {useEffect} from 'react';
import './HomePage.css'
import {ProductCard} from "../../components/cards/ProductCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../redux/store/action/ProductAcrtion";
import {cartSlice} from "../../redux/store/reducers/CartSlice";
import {Spinner} from "react-bootstrap";
import Notification from "../../components/notification/Notification";

const HomePage = () => {
    const dispatch = useAppDispatch()
    const {product, isLoading,searchProducts} = useAppSelector((state => state.productReducer))
    const {notification} = useAppSelector((state => state.cartReducer))
    const {addCartItem, showNotification, hideNotification} = cartSlice.actions

    const addProduct = (id: string) => {
        const currentProduct = product?.find((i) => i._id === id);
        if (currentProduct) {
            dispatch(addCartItem({...currentProduct, countItem: 1}))
            dispatch(showNotification())
            setTimeout(() => {
                dispatch(hideNotification())
            }, 2000)
        }
    }

    const filterSnickers = product.filter(prod =>{
        return prod.name.toLowerCase().includes(searchProducts.toLowerCase())
    })

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    if (isLoading) {
        return (
            <div style={{height: '80vh'}} className='d-flex justify-content-center align-items-center'>
                <Spinner animation="border" role="status" variant='dark'/>
            </div>
        )
    }

    return (
        <div className='container p-0 pt-2 pb-4'>
            <h5 className='home-title'>МУЖСКАЯ КОЛЛЕКЦИЯ ОБУВИ</h5>
            <div className='d-flex flex-wrap card-content'>
                {filterSnickers?.map((i) => (
                    <div key={i._id} className=' col-lg-3 d-flex justify-content-center'>
                        <ProductCard
                            _id={i._id}
                            badge={i.badge}
                            image={i.image}
                            name={i.name}
                            price={i.price}
                            salePrice={i.salePrice}
                            addToCart={(id) => addProduct(id)}
                        />
                    </div>
                ))}
            </div>
            {notification && (
                <Notification/>
            )}
        </div>
    );
};

export default HomePage;