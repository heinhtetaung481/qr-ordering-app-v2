import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styles from './AddToCart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

const fetchMenuItems = async (): Promise<MenuItem[]> => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/menus`;
    const response = await axios.get<MenuItem[]>(apiUrl);
    return response.data;
}

const AddToCart: React.FC = () => {
    // get table number from query params
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tableNumber = queryParams.get('table');
    localStorage.setItem('tableNumber', tableNumber || '');

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() =>{
        fetchMenuItems().then((data) => {
            setMenuItems(data);
        });
    }, []);

    const handleDecrement = (itemId: string) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0)
        }));
    };

    const handleIncrement = (itemId: string) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 0) + 1
        }));
    };

    const getTotalQuantities = () => {
        return Object.values(quantities).reduce((acc, quantity) => acc + quantity, 0);
    }


    // Group menu items by category
    const itemsByCategory = menuItems.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    return (
        <div className={styles["menu-container"]}>
            <h2 className={styles.title}>Menu</h2>
            <div className={styles["cart-icon"]}>
                <Link 
                    to="/cart/view"
                    state={quantities}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>{getTotalQuantities()}</span>
                </Link>
            </div>
            {Object.entries(itemsByCategory).map(([category, items]) => (
                <div key={category}>
                    <h3 className={styles.category}>{category}</h3>
                    <div className={styles["menu-wrapper"]}>
                        {items.map(item => (
                            <div key={item._id} className={styles["menu-item"]}>
                                <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} alt={item.name} className="menu-image"/>
                                <div className={styles["menu-details"]}>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <div className={styles["quantity"]}>
                                    <button onClick={() => handleDecrement(item._id)}>-</button>
                                    <span>{quantities[item._id] || 0}</span>
                                    <button onClick={() => handleIncrement(item._id)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddToCart;
