// create a component to show the selected items in the cart and allow the user to remove items from the cart. selected items will be passed from the AddToCart component as location state and it is item id and quantity
import React, { useEffect } from 'react';
import styles from './Order.module.css';
import { MenuItem } from '../cart/AddToCart';
import axios from 'axios';

const ViewCart: React.FC = () => {
    // get card items from local storage
    const selectedItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    const [cartItems, setCartItems] = React.useState<{ [key: string]: number }>(selectedItems);
    const [items, setItems] = React.useState<MenuItem[]>([]);

    const fetchMenuItems = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/menus/cart-items`;
        const data = { itemIds: Object.keys(cartItems) };
        const response = await axios.post<MenuItem[]>(apiUrl, data);
        console.log(response.data);
        setItems(response.data);
    }

    useEffect(() => {
        fetchMenuItems();
    }
    , []);

    return (
        <div className={styles["menu-container"]}>
            <h2 className={styles.title}>Order</h2>
            <div className={styles["cart-wrapper"]}>
                {Object.entries(cartItems).map(([itemId, quantity]) => {
                    const item = items.find(item => item._id === itemId);
                    console.log(item);
                    console.log(itemId);
                    return item ? (
                        <div key={item._id} className={styles["menu-item"]}>
                            <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} alt={item.name} className="menu-image"/>
                            <div className={styles["menu-details"]}>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                            <div className={styles["quantity"]}>
                                x {quantity}
                            </div>
                        </div> ) : null;
                })}
            </div>
            <hr/>
            {/* add subtotal price */}
            <div className={styles["subtotal"]}>
                Subtotal : <span className='subtotal-price'>${items.reduce((acc, item) => acc + (item.price * (cartItems[item._id] || 0)), 0)}</span>
            </div>
        </div>
    )
}

export default ViewCart;