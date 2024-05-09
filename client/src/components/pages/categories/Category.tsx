// write a component to show the list of categories and allow the user to create a new category
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Category.css';

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
        <div className="category-container">
            <h2 className='title'>Categories</h2>
            <div className='buttons-container'>
                <Link to="/category/create" className="create-category-button">Create Category</Link>
            </div>
            <div className="category-wrapper">
                {categories.map(category => (
                    <div key={category._id} className="category-item">
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category;