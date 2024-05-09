// write a component to add new menu items. The user can select a category from a dropdown list
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AddMenu.css';
import { Category } from '../categories/Category';
import { MenuItem } from './Menu';

const fetchCategories = async (): Promise<Category[]> => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/categories`;
    const response = await axios.get<Category[]>(apiUrl);
    return response.data;
}

const AddMenu: React.FC = () => {
    const location = useLocation();
    const editingMenuItem = location.state as MenuItem;

    const [name, setName] = useState<string>(editingMenuItem?.name || '');
    const [price, setPrice] = useState<number>(editingMenuItem?.price || 0);
    const [description, setDescription] = useState<string>(editingMenuItem?.description || '');
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(editingMenuItem?.category || '');

    useEffect(() => {
        fetchCategories().then((data) => {
            setCategories(data);
        });
    }, [])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPrice(Number(event.target.value));
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(event.target.files && event.target.files.length > 0){
            const file = event.target.files[0];
            setImage(file);
        }
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedCategory(event.target.value);
    }

    const addMenuItem = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/menus`;
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('description', description);
        if (image) {
          formData.append('image', image);
        }
        formData.append('category', selectedCategory);
      
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        if (response.status === 201) {
          alert('Menu item added successfully');
          // redirect to menu page
          window.location.href = '/menus';
        } else {
          // handle error
          console.error(response.data);
        }
    };

    const updateMenuItem = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/menus/${editingMenuItem._id}`;
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('description', description);
        if (image) {
          formData.append('image', image);
        }
        formData.append('category', selectedCategory);
      
        const response = await axios.put(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      
        if (response.status === 200) {
          alert('Menu item updated successfully');
          // redirect to menu page
          window.location.href = '/menus';
        } else {
          // handle error
          console.error(response.data);
        }
    }

    return (
        <div className="add-menu-container">
            <h2 className='title'>Add Menu Item</h2>
            <div className='buttons-container'>
                <Link to="/menus" className="back-link">Back to Menu</Link>
                <Link to="/categories" className="back-link">Back to Categories</Link>
            </div>
            <div className='form-container'>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={price} onChange={handlePriceChange} />
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={handleImageChange} />
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.name} selected={category.name === selectedCategory}>{category.name}</option>
                    ))}
                </select>
                {editingMenuItem ? (
                    <button onClick={updateMenuItem} className="add-menu-button">Update Menu Item</button>
                ) : (
                    <button onClick={addMenuItem} className="add-menu-button">Add Menu Item</button>
                )}
                {/* <button onClick={addMenuItem} className="add-menu-button">Add Menu Item</button> */}
            </div>
        </div>
    )
}

export default AddMenu;
