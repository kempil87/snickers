import React from 'react';
import './ProductCard.css'
import PlusSvg from "../../assets/PlusSvg";
import {IProduct} from "../../redux/types/IProduct";

interface ICard extends IProduct{
    addToCart: (id: string) => void
}

export const ProductCard = ({badge, image, name, price, _id, salePrice, addToCart}: ICard) => {

    const onClickAdd = () => {
        addToCart(_id)
    }


    return (
        <div className='m-2 card-wrap d-flex flex-column justify-content-between'>
            <div className="img-block mb-3">
                <div className="img-wrap d-flex justify-content-center">
                    <img className="product-image" src={image} alt='product-image'/>
                </div>
            </div>
            <h6 className='name'>{name}</h6>
            {salePrice ? (
                <div className='d-flex align-items-center mt-2 justify-content-between'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6 className='price'>{price} ₽</h6>
                        <h6 className='sale-price'>{salePrice} ₽</h6>
                        <h6 className='badge'>{badge}</h6>
                    </div>
                    <div onClick={onClickAdd} style={{marginRight: 8}}>
                        <PlusSvg/>
                    </div>
                </div>
            ) : (
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <h6 className='badge'>{badge}</h6>
                    <h6 className='price'>{price} ₽</h6>
                    <div onClick={onClickAdd} style={{marginRight: 8}}>
                        <PlusSvg/>
                    </div>
                </div>
            )}
        </div>
    );
};
