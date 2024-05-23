// write a component to show the list of categories and allow the user to create a new category
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Category.module.css';

export interface Category {
    _id: number;
    name: string;
}

const fetchCategories = async (): Promise<Category[]> => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/categories`;
    const response = await axios.get<Category[]>(apiUrl);
    return response.data;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() =>{
        fetchCategories().then((data) => {
            setCategories(data);
        });
    }, [])

    return (
        <div className={styles["category-container"]}>
            <h2 className={styles.title}>Categories</h2>
            <div className={styles['buttons-container']}>
                <Link to="/category/create" className={styles["create-category-button"]}>Create Category</Link>
            </div>
            <div className={styles["category-wrapper"]}>
                {categories.map(category => (
                            <div key={category._id} className={styles["category-item"]}>
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category;