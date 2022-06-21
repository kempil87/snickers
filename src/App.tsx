import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import {Route, Routes} from "react-router-dom";
import CartPage from "./pages/cart/CartPage";
import {useAppDispatch} from "./hooks/redux";
import {cartSlice} from "./redux/store/reducers/CartSlice";


function App() {
    const dispatch = useAppDispatch()
    const {addLocalStorage} = cartSlice.actions

    useEffect(() => {
        const storageData = localStorage.getItem("cart")
        if (storageData){
            dispatch(addLocalStorage(JSON.parse(storageData)))
        }
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
