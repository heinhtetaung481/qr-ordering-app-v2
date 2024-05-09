// create a component to show the selected items in the cart and allow the user to remove items from the cart. selected items will be passed from the AddToCart component as location state and it is item id and quantity
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ViewCart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from './AddToCart';
import axios from 'axios';
import { table } from 'console';

const ViewCart: React.FC = () => {
    const location = useLocation();
    const selectedItems = location.state as { [key: string]: number };
    const [cartItems, setCartItems] = React.useState<{ [key: string]: number }>(selectedItems);
    const [items, setItems] = React.useState<MenuItem[]>([]);

    const fetchMenuItems = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/menus/cart-items`;
        const data = { itemIds: Object.keys(cartItems) };
        const response = await axios.post<MenuItem[]>(apiUrl, data);
        setItems(response.data);
    }

    useEffect(() => {
        fetchMenuItems();
    }
    , []);

    const handleDecrement = (itemId: string) => {
        if (cartItems[itemId] === 1) {
            setCartItems(prevCartItems => {
                const newCartItems = { ...prevCartItems };
                delete newCartItems[itemId];
                return newCartItems;
            });
            // remove the item from the list
            setItems(items.filter(item => item._id !== itemId));
        } else {
            setCartItems(prevCartItems => ({
                ...prevCartItems,
                [itemId]: Math.max((prevCartItems[itemId] || 0) - 1, 0)
            }));
        }
    }

    const handleIncrement = (itemId: string) => {
        setCartItems(prevCartItems => ({
            ...prevCartItems,
            [itemId]: (prevCartItems[itemId] || 0) + 1
        }));
    }

    const checkout = async () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/order/checkout`;
        const data = { items: cartItems, tableNumber: localStorage.getItem('tableNumber')};
        const response = await axios.post(apiUrl, data);
        // store cartItems and orderId in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('orderId', response.data.orderId);
        alert('Order placed successfully')
        // clear the cart
        setCartItems({});
        // clear the items
        setItems([]);
        window.location.href = '/order';
    }

    return (
        <div className={styles["menu-container"]}>
            <h2 className={styles.title}>Cart</h2>
            <div className={styles["cart-icon"]}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className={styles["cart-count"]}>{Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)}</span>
            </div>
            <div className={styles["cart-wrapper"]}>
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                    const item = items.find(item => item._id === itemId);
                    return item ? (
                        <div key={item._id} className={styles["menu-item"]}>
                            <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} alt={item.name} className="menu-image"/>
                            <div className={styles["menu-details"]}>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                            <div className={styles["quantity"]}>
                                <button onClick={() => handleDecrement(item._id)}>-</button>
                                <span>{cartItems[itemId] || 0}</span>
                                <button onClick={() => handleIncrement(item._id)}>+</button>
                            </div>
                        </div> ) : null;
                })}
            </div>
            {/* add subtotal price */}
            <div className={styles["subtotal"]}>
                Subtotal : <span className='subtotal-price'>${items.reduce((acc, item) => acc + (item.price * (cartItems[item._id] || 0)), 0)}</span>
            </div>
            <button onClick={() => checkout()} className={styles["checkout-button"]}>Checkout</button>
        </div>
    )
}

export default ViewCart;