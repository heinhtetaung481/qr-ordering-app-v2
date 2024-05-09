// write a component to let user add a new category
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddCategory.css';

const AddCategory: React.FC = () => {
    const [categoryName, setCategoryName] = useState<string>('');

    const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCategoryName(event.target.value);
    }

    const addCategory = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/categories`;
        await axios.post(apiUrl, { name: categoryName });
        alert('Category added successfully');
        // redirect to categories page
        window.location.href = '/categories';
    }

    return (
        <div className="add-category-container">
            <h2 className='title'>Add Category</h2>
            <div className='buttons-container'>
                <Link to="/categories" className="back-link">Back to Categories</Link>
                <Link to="/menus" className="back-link">Back to Menus Items</Link>
            </div>
            <div className='form-container'>
                <label htmlFor="categoryName">Category Name:</label>
                <input type="text" id="categoryName" name="categoryName" value={categoryName} onChange={handleCategoryNameChange} />
                <button onClick={addCategory} className="add-category-button">Add Category</button>
            </div>
        </div>
    )
}

export default AddCategory;
