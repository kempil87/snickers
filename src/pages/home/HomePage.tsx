import React, {useEffect} from 'react';
import './HomePage.css'
import {ProductCard} from "../../components/cards/ProductCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../redux/store/action/ProductAcrtion";
import {cartSlice} from "../../redux/store/reducers/CartSlice";

const HomePage = () => {
    const dispatch = useAppDispatch()
    const {product} = useAppSelector((state => state.productReducer))
    const { addCartItem } = cartSlice.actions

    const addProduct = (id:string) => {
        const currentProduct = product?.find((i) => i._id === id);
        if(currentProduct){
            dispatch(addCartItem({...currentProduct, countItem: 1}))
        }
    }

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div className='container p-0 pt-2'>
            <h5 className='home-title'>МУЖСКАЯ КОЛЛЕКЦИЯ ОБУВИ</h5>
            <div className='d-flex flex-wrap'>
                {product?.map((i) => (
                    <div key={i._id} className='col12 col-lg-3 d-flex justify-content-center'>
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
        </div>
    );
};

export default HomePage;