// write a component to show menu items with images and prices and organize them with a collapsible accordion
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './Menu.module.css';

export interface MenuItem {
    _id: number;
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

const Menu: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const deleteMenuItem = (id: number) => async (): Promise<void> => {
        // prompt the user to confirm before deleting
        if (!window.confirm('Are you sure you want to delete this menu item?')) {
            return;
        }
        const apiUrl = `${process.env.REACT_APP_API_URL}/menus/${id}`;
        await axios.delete(apiUrl);
        alert('Menu item deleted successfully');
        // delete menu item from the list
        setMenuItems(menuItems.filter(item => item._id !== id));
    }

    useEffect(() =>{
        fetchMenuItems().then((data) => {
            setMenuItems(data);
        });
    }, [])

    // Group menu items by category
    const itemsByCategory = menuItems.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    return (
        <div className={styles["menu-container"]}>
        <h2 className={styles.title}>Menu</h2>
        <div className={styles["buttons-container"]}>
            <Link to="/menus/create" className={styles["create-menu-button"]}>Create Item</Link>
            <Link to="/category/create" className={styles["create-category-button"]}>Create Category</Link>
        </div>
        {Object.entries(itemsByCategory).map(([category, items]) => (
            <div key={category}>
            <h3 className={styles.category}>{category}</h3>
            <div className={styles["menu-wrapper"]}>
                {items.map(item => (
                <div key={item._id} className={styles["menu-item"]}>
                    <Link 
                        to={`/menus/edit/${item._id}`}
                        state={item}
                    >
                        <img src="/edit.png" alt="Edit" className={styles['edit-icon']}/>
                    </Link>
                    <button onClick={deleteMenuItem(item._id)}>
                        <img src="/delete.png" alt="Delete" className={styles['delete-icon']}/>
                    </button>
                    <img src={`${process.env.REACT_APP_API_URL}/${item.image}`} alt={item.name} className={styles["menu-image"]}/>
                    <div className={styles["menu-details"]}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
    );
}

export default Menu;